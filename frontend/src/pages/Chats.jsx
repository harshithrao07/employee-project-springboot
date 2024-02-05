import { IconButton } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import SockJS from 'sockjs-client'
import { over } from 'stompjs'

var stompClient = null
const Chats = () => {
    const username = sessionStorage.getItem("username")
    const token = sessionStorage.getItem("token")

    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: username,
        receivername: "",
        connected: false,
        message: ""
    })

    useEffect(() => {
        connect()
    }, [])

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws')
 
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setUserData({ ...userData, "connected": true })
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
        userJoin();
    }

    const userJoin = () => {
        var chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }

    const onPrivateMessage = (payload) => {
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);
    }

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "message": value });
    }

    const sendValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
        }
    }

    const sendPrivateValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE"
            };

            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
        }
    }


    return (
        <div>
            <div className='flex'>
                <div>
                    <ul>
                        <li>ORGANIZATION CHATROOM</li>
                        {
                            [...privateChats.keys()].map((name, index) => (
                                <li key={index} onClick={() => { setTab(name) }}>{name}</li>
                            ))
                        }
                    </ul>
                </div>
                {
                    tab === "CHATROOM" &&
                    <div>
                        <ul>
                            {
                                publicChats.map((chat, index) => (
                                    <li key={index}>
                                        {chat.senderName !== username && <div>{chat.senderName}</div>}
                                        <div>{chat.message}</div>
                                        {chat.senderName === username && <div>{chat.senderName}</div>}
                                    </li>
                                ))
                            }
                        </ul>

                        <div>
                            <input type='text' placeholder='Enter the message' value={userData.message} onChange={handleMessage} />
                            <IconButton onClick={sendValue}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                </svg>
                            </IconButton>
                        </div>
                    </div>
                }

                {
                    tab !== "CHATROOM" &&
                    <div>
                        <ul>
                            {
                                [...privateChats.get(tab)].map((chat, index) => (
                                    <li key={index}>
                                        {chat.senderName !== username && <div>{chat.senderName}</div>}
                                        <div>{chat.message}</div>
                                        {chat.senderName === username && <div>{chat.senderName}</div>}
                                    </li>
                                ))
                            }
                        </ul>

                        <div>
                            <input type='text' placeholder='Enter the message' value={userData.message} onChange={handleMessage} />
                            <IconButton onClick={sendPrivateValue}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                </svg>
                            </IconButton>
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default Chats