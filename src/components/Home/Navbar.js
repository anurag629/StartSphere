import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { Dropdown } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../feature/authSlice';
import { resetAllArticle } from '../../feature/articleSlice';
import { resetAllEvent } from '../../feature/eventSlice';
import { resetAllPost } from '../../feature/postSlice';
import { resetProfile } from '../../feature/profileSlice';
import { resetChat } from '../../feature/socketSlice';
import { resetAllStartup } from '../../feature/startupSlice';

const Navbar = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('Guest')
  const [email, setEmail] = useState('guest@gmail.com')
  const [profileImage, setProfileImage] = useState(null)
  
  const profileData = useSelector((state) => state.profile.profile) || {};
  const dispatch = useDispatch();
  
  // delete the store when user logs out
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    dispatch(logout());
    dispatch(resetAllArticle());
    dispatch(resetAllEvent());
    dispatch(resetAllPost());
    dispatch(resetProfile());
    dispatch(resetChat());
    dispatch(resetAllStartup());
  };
  const handleProfileClick = () => {
    navigate('/profile');
  };
  const handleProfileUpdateClick = () => {
    navigate('/profile/update');
  }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.Name && user.Email) {
      setUsername(user.Name)
      setEmail(user.Email)
    }
  }, [])

  useEffect(() => {
    if (!profileImage && profileData && profileData.Image) {
      setProfileImage(profileData.Image)
    }
  }, [profileData])

  return (
    <nav className="bg-gray-800 border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src='/images/logo2.png' className='w-20 h-20 rounded-full' />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">StartSphere</span>
        </Link>
        <div className="relative w-full max-w-md focus-within:text-gray-600">
          <span className="absolute inset-y-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" clipRule="evenodd" d="M14.293 15.707a1 1 0 001.414-1.414l-2.5-2.5a1 1 0 00-1.414 0 1 1 0 000 1.414l2.5 2.5zM9 16a7 7 0 110-14 7 7 0 010 14z" />
            </svg>
          </span>
          <input type="text" className="block w-full py-2 pl-10 pr-3 text-base text-white placeholder-gray-400 bg-gray-700 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Search" />
        </div>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Dropdown
            label={
              <button
                type="button"
                className="flex text-sm bg-gray-700 rounded-full md:me-0 focus:ring-4 focus:ring-gray-400 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
              >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src={profileImage} alt="user profile" />
              </button>
            }
            arrowIcon={false}
            inline={true}
          >
            <Dropdown.Header>
              <span className="block text-sm text-grey-400">{username}</span>
              <span className="block text-sm text-gray-400">{email}</span>
            </Dropdown.Header>
            <Dropdown.Item className="text-grey-400 hover:bg-gray-600" onClick={handleProfileClick}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item className="text-grey-400 hover:bg-gray-600" onClick={handleProfileUpdateClick}>
              Update Profile
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="text-grey-400 hover:bg-gray-600" onClick={handleLogout}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-800">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-blue-500" : "block py-2 px-3 text-gray-400 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
                }
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/startups"
                className={({ isActive }) =>
                  isActive ? "text-blue-500" : "block py-2 px-3 text-gray-400 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
                }
              >
                StartUps
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-networks"
                className={({ isActive }) =>
                  isActive ? "text-blue-500" : "block py-2 px-3 text-gray-400 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
                }
              >
                My Network
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events"
                className={({ isActive }) =>
                  isActive ? "text-blue-500" : "block py-2 px-3 text-gray-400 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
                }
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  isActive ? "text-blue-500" : "block py-2 px-3 text-gray-400 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
                }
              >
                Resources
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
