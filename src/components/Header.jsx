import React, { useRef, useState } from 'react';
import Logo from '../img/logo.png';
import { motion } from 'framer-motion';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { app } from '../firebase.config';
import { SlBasket } from 'react-icons/sl';
import Avatar from '../img/avatar.png';
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { MdAdd, MdLogout } from 'react-icons/md';

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const handleLogin = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem('user', JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const handleLogout = () => {
    setIsMenu(false);
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const handleMenu = () => {
    setIsMenu(false);
  };
  const handleCartShow = () => {
    setTimeout(() => {
      dispatch({
        type: actionType.SET_CART_SHOW,
        cartShow: !cartShow,
      });
    }, 1000);
  };
  return (
    <header className="w-screen z-50 fixed  md:p-6 md:px-16 p-3 px-4 bg-primary ">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={'/'} className="flex items-center gap-2">
          <img
            className="md:w-16 w-10  object-cover cursor-pointer"
            src={Logo}
            alt="logo"
          />
          <p className="text-headingColor text:xl md:text-3xl font-bold cursor-pointer  ">
            City
          </p>
        </Link>
        <div className="flex items-center  gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            exit={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-8 "
          >
            <li className=" text-base text-textColor hover:bg-darkgray duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:bg-darkgray duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:bg-darkgray duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-base text-textColor hover:bg-darkgray duration-100 transition-all ease-in-out cursor-pointer">
              Service
            </li>
          </motion.ul>

          <div
            className="relative flex items-center justify-center "
            onClick={handleCartShow}
          >
            <SlBasket className="text-textColor text-2xl  cursor-pointer " />
            {cartItems && cartItems.length > 0 && (
              <div className=" absolute w-5 h-5 -top-1 -right-1  rounded-full bg-cartNumBg flex justify-center items-center">
                <p className=" absolute text-xs font-semibold text-white">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.7 }}
              src={user ? user.photoURL : Avatar}
              alt="avata"
              className="w-10 min-w-[40] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              onClick={handleLogin}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 0.8 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-primary shadow-xl rounded-lg flex flex-col absolute top-12 -right-5  "
              >
                {user &&
                  user.email === 'phuockha2852001@gmail.com' && (
                    <Link to={'/createItem'}>
                      <p
                        onClick={handleMenu}
                        className=" rounded-md px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-darkgray translate-all duration-100 ease-in-out text-textColor text-xl"
                      >
                        New Item
                        <MdAdd />
                      </p>
                    </Link>
                  )}
                <p
                  className=" rounded-md px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-darkgray translate-all duration-100 ease-in-out text-textColor text-xl"
                  onClick={handleLogout}
                >
                  Logout
                  <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div className="relative flex items-center justify-center">
          <SlBasket className="text-textColor text-2xl  cursor-pointer " />
          {cartItems && cartItems.length > 0 && (
            <div className=" absolute w-5 h-5 -top-1 -right-1  rounded-full bg-cartNumBg flex justify-center items-center">
              <p className=" absolute text-xs font-semibold text-white">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>
        <Link to={'/'} className="flex items-center gap-2">
          <img
            className="w-10 object-cover cursor-pointer"
            src={Logo}
            alt="logo"
          />
          <p className="text-headingColor text-xl font-bold cursor-pointer">
            City
          </p>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.7 }}
            src={user ? user.photoURL : Avatar}
            alt="avata"
            className="w-10 min-w-[40] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            onClick={handleLogin}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 0.8 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-primary shadow-xl rounded-lg flex flex-col absolute top-5 -right-5  "
            >
              {user && user.email === 'phuockha2852001@gmail.com' && (
                <Link to={'/createItem'}>
                  <p
                    onClick={handleMenu}
                    className=" rounded-md  px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-darkgray translate-all duration-100 ease-in-out text-textColor text-xl"
                  >
                    New Item
                    <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col  ">
                <li
                  onClick={handleMenu}
                  className=" rounded-md  px-4 py-2 gap-3 text-xl text-textColor hover:bg-darkgray  duration-100 transition-all ease-in-out cursor-pointer"
                >
                  Home
                </li>
                <li
                  onClick={handleMenu}
                  className="  rounded-md  px-4 py-2 gap-3 text-xl text-textColor hover:bg-darkgray duration-100 transition-all ease-in-out cursor-pointer"
                >
                  Menu
                </li>
                <li
                  onClick={handleMenu}
                  className=" rounded-md  px-4 py-2 gap-3 text-xl text-textColor hover:bg-darkgray duration-100 transition-all ease-in-out cursor-pointer"
                >
                  About Us
                </li>
                <li
                  onClick={handleMenu}
                  className=" rounded-md px-4 py-2 gap-3 text-xl text-textColor hover:bg-darkgray duration-100 transition-all ease-in-out cursor-pointer"
                >
                  Service
                </li>
              </ul>
              <p
                className=" m-2 p-2 rounded-md shadow-md px-4 py-2 flex items-center justify-center gap-3 cursor-pointer hover:bg-darkgray bg-darkgray  translate-all duration-100 ease-in-out text-textColor text-xl"
                onClick={handleLogout}
              >
                Logout
                <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
