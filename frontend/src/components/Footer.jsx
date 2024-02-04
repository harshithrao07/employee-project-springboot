import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex justify-center w-full py-5 bar footer'>
        <p className='font-semibold text-lg'>Made with ❤️ by <Link className='hover:underline' to="https://harshithrao.vercel.app/">Harshith Rao</Link></p>
    </div>
  )
}

export default Footer