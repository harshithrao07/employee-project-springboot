import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const SignIn = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
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

    useEffect(() => {
        if(localStorage.getItem("token"))
        {
            navigate("/home")
        }
    }, [])

    const handleClick = async (event) => {
        event.preventDefault();

        if(user.firstname!== "" && user.lastname!== "" && user.email!== "" && user.password!== "") {
            const res = await axios.post("http://localhost:8080/api/v1/auth/register", user)

            if(res.data) {
                if(res.data.message) {
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
            <h1>Sign Up</h1>
            <form className='signin-form'>
                <input required name='firstname' onChange={handleChange} value={user.firstname} type='text' placeholder='Enter your First Name' />
                <input required name='lastname' onChange={handleChange} value={user.lastname} type='text' placeholder='Enter your Last Name' />
                <input required name='email' onChange={handleChange} value={user.email} type='email' placeholder='Enter your Email' />
                <input required name='password' onChange={handleChange} value={user.password} type='password' placeholder='Enter your Password' />
                <Button onClick={handleClick}>Submit</Button>
            </form>
            <p>Already have an account, try to <Link to="/login">login</Link></p>
            <Footer />
        </div>
    )
}

export default SignIn