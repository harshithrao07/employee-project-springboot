import { Button } from '@material-tailwind/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    function handleClick() {
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <div className='flex justify-between p-5 bar navbar'>
            <Link to="/">
                <h1 className='text-2xl font-bold uppercase'>Employee Management App</h1>
            </Link>

            { token && <Button size='sm' ripple={true} onClick={handleClick}>
                Logout
            </Button>}
        </div>
    )
}

export default Header