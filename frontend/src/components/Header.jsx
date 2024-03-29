import { Button } from '@material-tailwind/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

    const token = sessionStorage.getItem("token")

    function handleClick() {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("username")
        navigate("/")
    }

    return (
        <div className='flex justify-between p-5 bar navbar'>
            <Link to="/">
                <h1 className='text-2xl font-bold uppercase'>Employee Management App</h1>
            </Link>

            {token &&
                <div className='flex justify-center items-center'>
                    <Link to="/chats">
                        <Button size='sm' className='flex justify-center items-center'>
                            <p>Messages</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>
                        </Button>
                    </Link>


                    <Button className='border ml-5' size='sm' ripple={true} onClick={handleClick}>
                        Logout
                    </Button>
                </div>}
        </div>
    )
}

export default Header