import React, { useState } from "react";
import { PiX } from "react-icons/pi";
import { SlMenu } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import logo from 'assets/logo.png'


const HeadNavs = [
  { title: "home", url: "/" },
  { title: "services", url: "/services" },
  { title: "contact us", url: "/contact-us" },
  { title: "about us", url: "/about-us" },
];
export default function Header() {
    const [views, setViews] = useState(false)
    const location = useLocation()
    const pathname = location.pathname

    const BarIcon = views ? PiX : SlMenu
  return (
    <div className="bg-white fixed top-0 w-full z-50">

      <div className="flex items-center justify-around px-3 py-5 md:py-6 md:px-4 nunito">
        <div className="">
          <Link to="/" className="text-xl md:text-3xl font-bold text-primary">
           SageStone Credit
          </Link>
        </div>
        <div className="hidden lg:flex items-center justify-end">
          {HeadNavs.map((item, index) =>{
            const isActive = item.url === pathname
            return (
                <Link
                  key={index}
                  to={`${item.url}`}
                  className={`${isActive ? 'border-b-primary border-b' :''} hover:text-orange-300 px-3 capitalize text-base  font-light transition-all`}
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
            className="px-5 border rounded-md py-2 truncate bg-primary  text-white items-center flex justify-center font-semibold transition-all "
          >
            Login account
          </Link>
          <Link
            to="/signup"
            className="px-5 border rounded-md py-2 truncate   bg-primary  text-white items-center flex justify-center font-semibold transition-all "
          >
            Open an account
          </Link>
         
        </div>
        <div onClick={() => setViews(prev => !prev)} className="lg:hidden text-2xl cursor-pointer">
          {" "}
          <BarIcon />{" "}
        </div>
      </div>
      <div className={`${views ? 'h-[20rem]' : 'h-0'} transition-all overflow-hidden`}>
        <div className="flex lg:hidden flex-col justify-end">
          {HeadNavs.map((item, index) => (
            <Link
              key={index}
              to={`${item.url}`}
              className="px-3 hover:border-b-sec py-3 capitalize font-bold transition-all"
            >
              {item.title}
            </Link>
          ))}
          <Link
            to={`/login`}
            className="px-3 py-3 capitalize  transition-all"
          >
            Login
          </Link>
          <Link
            to={`/signup`}
            className="px-3 py-3 capitalize  transition-all"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
