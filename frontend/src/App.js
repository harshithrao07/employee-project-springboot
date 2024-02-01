import React from 'react'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Root from './pages/Root'
import SignIn from './components/SignIn'
import Login from './components/Login'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<SignIn />} />
          <Route path='/login' element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App