import { Button } from '@material-tailwind/react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
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
            navigate("/dashboard")
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
                navigate("/dashboard");
            } else {
                alert('There seems to be a problem try again later.')
            }
        } else {
            alert("Enter all the details!!")
        }

    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center my-10'>
            <form className='flex flex-col w-1/3 p-5 rounded-lg bar'>
                <h1 className='text-2xl font-semibold mb-1'>Sign Up</h1>
                <p className='text-sm mb-5'>Nice to meet you! Enter your details to register.</p>
                <label htmlFor='firstname'>Enter your firstname:</label>
                <input required name='firstname' id='firstname' onChange={handleChange} value={user.firstname} type='text' />
                <label htmlFor='lastname'>Enter your lastname:</label>
                <input required name='lastname' id='lastname' onChange={handleChange} value={user.lastname} type='text' />
                <label htmlFor='email'>Enter your email:</label>
                <input required name='email' id='email' onChange={handleChange} value={user.email} type='email' />
                <label htmlFor='password'>Enter the password:</label>
                <input required name='password' id='password' onChange={handleChange} value={user.password} type='password' />
                <Button className='btn' onClick={handleClick}>Submit</Button>
            </form>
            <p className='mt-5 text-md'>Already have an account, try to <Link to="/login" className='font-semibold underline'>login</Link></p>
        </div>
    )
}

export default Signup 