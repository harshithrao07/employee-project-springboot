import { Button } from '@material-tailwind/react'
import React from 'react'

import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen main'>
            <div className='heading-texts p-5 bar'>
                <h1 className='text-4xl font-bold'>Welcome to Employee Management App</h1>
            </div>
            <div className='flex flex-col items-center mt-8 gap-y-3 font-medium text-lg'>
                <p>If you haven't created an account yet, do it now</p>
                <Link to="/signup">
                    <Button className='rounded-full' ripple={true}>
                        Sign Up
                    </Button>
                </Link>
                <p>or else you can just login</p>
                <Link to="/login">
                    <Button className='rounded-full' ripple={true}>
                        Login
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Home