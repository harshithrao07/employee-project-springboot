import React from 'react'
import SignIn from '../components/SignIn'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Root = () => {
  return (
    <div>
      <Header />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "80vh", justifyContent: "center" }}>
        <h1 style={{ textAlign: "center", border: "1px solid black", paddingInline: "15px", marginBottom: "15px" }}>Welcome to Employee Management App</h1>
        <p>If you haven't created an account yet, do it now</p>
        <Link to="/signup"><Button style={{ marginBottom: "20px" }}>
          Sign Up
        </Button></Link>
        <p>or else you can just login</p>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default Root