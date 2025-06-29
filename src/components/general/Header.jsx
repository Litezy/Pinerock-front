import React, { useState } from "react";
import { PiX } from "react-icons/pi";
import { SlMenu } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import { motion } from 'framer-motion'
import logo from '@/assets/logo.png'



const HeadNavs = [
  { title: "home", url: "/" },
  { title: "about us", url: "/about-us" },
  { title: "services", url: "/services" },
  { title: "contact us", url: "/contact-us" },
];
export default function Header() {
  const [views, setViews] = useState(false)
  const location = useLocation()
  const pathname = location.pathname

  const headerVars = {
    hidden: {
      opacity: 0,
      y: -250
    },
    visible: {
      opacity: 1,
      y: 0,
    }
  }

  const BarIcon = views ? PiX : SlMenu
  return (
    <div className={` fixed top-0 w-full z-40 '}`}>

      <motion.div
        variants={headerVars}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5, duration: 1 }}
        className="flex items-center bg-sec lg:bg-white  justify-between   px-10 lg:px-20 py-3 md:py-4  nunito">
        <div className="">
          <Link to="/" className="text-xl md:text-3xl font-bold">
            <img src={logo} className="max-w-16  h-10 " alt="pinerock logo" />
          </Link>
        </div>
        <div className="hidden lg:flex items-center  justify-end">
          {HeadNavs.map((item, index) => {
            const isActive = item.url === pathname
            return (
              <Link
                key={index}
                to={`${item.url}`}
                className={`${isActive ? 'border-b-sec font-bold border-b' : 'font-light'} text-sec hover:text-sec/60 px-3 capitalize text-base   transition-all`}
              >
                {item.title}
              </Link>
            )
          }
          )}
        </div>
        <div className="hidden lg:flex flex-row items-center gap-5">
          <Link
            to="/login"
            className="px-10  py-2 truncate bg-white  text-col border rounded-md broder-col items-center flex justify-center font-semibold transition-all "
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5  rounded-md py-2 truncate   bg-orange-500  text-white items-center flex justify-center font-semibold transition-all capitalize "
          >
            create account
          </Link>

        </div>
        <div onClick={() => setViews(prev => !prev)} className="lg:hidden text-2xl cursor-pointer">
          {" "}
          <BarIcon className="text-white font-bold text-2xl" />{" "}
        </div>
      </motion.div>
      <div className={`${views ? 'h-[20rem]' : 'h-0'} bg-sec text-white transition-all overflow-hidden`}>
        <div className="flex lg:hidden flex-col items-center justify-end">
          {HeadNavs.map((item, index) => (
            <Link
              key={index}
              onClick={() => setViews(prev => !prev)}
              to={`${item.url}`}
              className="px-3 hover:text-gray-300 py-3 capitalize transition-all"
            >
              {item.title}
            </Link>
          ))}

          <Link
            to={`/login`}
            className=" transition-all w-full">
            <div className="w-1/2 mx-auto py-3 mb-3 text-center bg-white text-col capitalize rounded-md">
              Login
            </div>

          </Link>


          <Link
            to={`/signup`}
            className=" capitalize  transition-all w-full" >
            <div className="w-1/2 mx-auto py-3 text-center bg-col text-white capitalize rounded-md">Sign up</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
