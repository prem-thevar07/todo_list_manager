import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className='flex bg-emerald-500 py-2 justify-between text-white' >
            <div className="logo ">
                <span className='text-xl font-bold mx-8'>itask</span>
            </div>
            <ul className="flex gap-8 mx-9">
                <li className='cursor-pointer hover:font-bold transition-all'  >home</li>
                <li className='cursor-pointer hover:font-bold transition-all'>task</li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
