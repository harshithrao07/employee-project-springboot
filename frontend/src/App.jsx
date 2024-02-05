import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Chats from './pages/Chats'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<Layout />}>
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='chats' element={<Chats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App