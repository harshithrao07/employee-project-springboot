import React from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    function handleClick() {
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <div style={{width: "100%"}}>
            <div className="header">
                <h1>Employee Management App</h1>
                
                {token && <Button onClick={handleClick}>
                    Logout
                </Button>}
            </div>
        </div>
    )
}

export default Header