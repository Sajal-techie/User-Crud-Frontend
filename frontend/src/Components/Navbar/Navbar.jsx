import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {  logout } from '../../Featues/UserSlice';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  const handleNav = () => {
    setNav(!nav);
  };

  const navItems = []
  if (user){
    navItems.push({ id: 1, text: 'Home' ,link:'/' })
    navItems.push({ id: 2, text: 'Profile' , link: '/profile' })
    navItems.push({ id: 3, text: 'logout', logout:true })
  }
  else{
    navItems.push({ id: 2, text: 'Login' ,link:'/login'})
    navItems.push({ id: 3, text: 'Signup',link:'/signup'})
  }

  const userLogout = ()=>{
    localStorage.removeItem('jwtTokenUser')
    dispatch(logout())
    navigate('/login')
  }
  return (
    <div className='bg-black flex justify-between items-center h-24  mx-auto px-4 text-white'>
      {/* Logo */}
      <h1 className='w-full text-3xl font-bold text-[#00df9a] capitalize'>{user ? user : 'user'  }</h1> 

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
          >
            {
              item.logout ? <div onClick={userLogout} >{item.text}</div> :<Link to={item.link} >
                {item.text}
            </Link> 
            }
            
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4 capitalize'>{user}</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
          >
            {
              item.logout ? <div onClick={userLogout} >{item.text}</div> :<Link to={item.link} >
                {item.text}
            </Link> 
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;