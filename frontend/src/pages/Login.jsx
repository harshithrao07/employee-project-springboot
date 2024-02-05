import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { Button } from '@material-tailwind/react'

const Login = () => {
    const navigate = useNavigate()
    const [searchParamas, setSearchParams] = useSearchParams()
    const [message, setMessage] = useState()

    useEffect(() => {
        if(searchParamas.get("message"))
        {
            setMessage(searchParamas.get("message"))
        }
    }, [])

    useEffect(() => {
        if(sessionStorage.getItem("token"))
        {
            navigate("/dashboard")
        }
    }, [])

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleClick = async (event) => {
        event.preventDefault();

        if (user.email !== "" && user.password !== "") {
            const res = await axios.post("http://localhost:8080/api/v1/auth/authenticate", user)
            
            if (res.data) {
                if (res.data.message) {
                    alert(res.data.message)
                    return
                }
                const token = res.data.token;
                sessionStorage.setItem("token", token);
                const username = res.data.username;
                sessionStorage.setItem("username", username)
                navigate("/dashboard");
            } else {
                alert('There seems to be a problem try again later.')
            }
        } else {
            alert("Enter all the details!!")
        }

    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            <form className='flex flex-col w-1/3 p-5 rounded-lg bar'>
                <h1 className={`text-2xl font-semibold mb-1`}>Login</h1>
                {!message && <p className={`mb-5`}>Hey👋, Welcome back!!</p>}
                {message && <p className='font-semibold mb-5'>{message}</p>}
                <label htmlFor='email'>Enter your email:</label>
                <input required name='email' id='email' onChange={handleChange} value={user.email} type='email' />
                <label htmlFor='password'>Enter your password:</label>
                <input required name='password' id='password' onChange={handleChange} value={user.password} type='password' />
                <Button className='btn' onClick={handleClick}>Submit</Button>
            </form>
            <p className='mt-5 text-md'>Don't have an account yet, <Link to="/signup" className='font-semibold underline'>create</Link> one already</p>
        </div>
    )
}

export default Login