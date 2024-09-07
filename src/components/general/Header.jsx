import React, { useState } from "react";
import { PiX } from "react-icons/pi";
import { SlMenu } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import { motion } from 'framer-motion'
import logo from 'assets/icon.png'



const HeadNavs = [
  { title: "home", url: "/" },
  { title: "services", url: "/services" },
  { title: "contact us", url: "/contact-us" },
  { title: "about us", url: "/about-us" },
];
export default function Header({show}) {
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
      transition: {
        delay: 0.5,
        duration: 0.5
      }

    }
  }

  const BarIcon = views ? PiX : SlMenu
  return (
    <div className={` fixed top-0 w-full z-40 '}`}>

      <motion.div
        variants={headerVars}
        initial="hidden"
        animate="visible"
        className="flex items-center bg-sec justify-around px-2 py-5 md:py-6  nunito">
        <div className="">
          <Link to="/" className="text-xl md:text-3xl font-bold text-white">
           Pinerock
          </Link>
        </div>
        <div className="hidden lg:flex items-center justify-end">
          {HeadNavs.map((item, index) => {
            const isActive = item.url === pathname
            return (
              <Link
                key={index}
                to={`${item.url}`}
                className={`${isActive ? 'border-b-white font-bold border-b' : 'font-light'} text-white hover:text-orange-500 px-3 capitalize text-base   transition-all`}
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
            className="px-2  rounded-md py-2 truncate bg-white  text-sec items-center flex justify-center font-semibold transition-all "
          >
            Login account
          </Link>
          <Link
            to="/signup"
            className="px-5  rounded-md py-2 truncate   bg-orange-500  text-white items-center flex justify-center font-semibold transition-all "
          >
            Open an account
          </Link>

        </div>
        <div onClick={() => setViews(prev => !prev)} className="lg:hidden text-2xl cursor-pointer">
          {" "}
          <BarIcon className="text-white"/>{" "}
        </div>
      </motion.div>
      <div className={`${views ? 'h-[20rem]' : 'h-0'} bg-white transition-all overflow-hidden`}>
        <div className="flex lg:hidden flex-col items-center justify-end">
          {HeadNavs.map((item, index) => (
            <Link
              key={index}
              onClick={()=> setViews(prev => !prev)}
              to={`${item.url}`}
              className="px-3 hover:text-orange-500 py-3 capitalize font-bold transition-all"
            >
              {item.title}
            </Link>
          ))}
          <Link
            to={`/login`}
            className="px-3 py-3 capitalize hover:text-orange-500  transition-all"
          >
            Login
          </Link>
          <Link
            to={`/signup`}
            className="px-3 py-3 capitalize hover:text-orange-500  transition-all"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
