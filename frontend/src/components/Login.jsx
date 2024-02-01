import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'

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
        if(localStorage.getItem("token"))
        {
            navigate("/home")
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
            console.log(res)
            if (res.data) {
                if (res.data.message) {
                    alert(res.data.message)
                    return
                }
                const token = res.data.token;
                localStorage.setItem("token", token);
                navigate("/home");
            } else {
                alert('There seems to be a problem try again later.')
            }
        } else {
            alert("Enter all the details!!")
        }

    }

    return (
        <div className='signup-page'>
            <Header />
            <h1>Login</h1>
            {message && <p style={{color: "red"}}>{message}</p>}
            <form className='signin-form'>
                <input required name='email' onChange={handleChange} value={user.email} type='email' placeholder='Enter your Email' />
                <input required name='password' onChange={handleChange} value={user.password} type='password' placeholder='Enter your Password' />
                <Button onClick={handleClick}>Submit</Button>
            </form>
            <p>Don't have an account yet, <Link to="/signup">Create one</Link></p>
            <Footer />
        </div>
    )
}

export default Login