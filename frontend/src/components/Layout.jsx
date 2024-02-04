import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
    return (
        <div className='flex flex-col'>
            <Header />
            <div className='min-h-screen'>
                <Outlet />
            </div>
            <div className='mt-auto'>
                <Footer />
            </div>
        </div>
    )
}

export default Layout