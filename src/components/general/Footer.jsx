import React, { useState } from "react";
import footerbg from "@/assets/general/footerbg.png";
import { SlClock, SlEarphonesAlt, SlEnvolope } from "react-icons/sl";
import { Link } from "react-router-dom";
import { Apis, ClientPostApi } from "@/services/Api";
import { errorMessage, SiteContact, SiteEmail, SiteName, successMessage } from "@/utils/functions";
import logo from '@/assets/logo.png'
import FAQ from "./FAQ";
import ContactUs from "./ContactUs";

const QuickLinks = [
  { title: "home", url: "/" },
  { title: "services", url: "/services" },
  { title: "contact us", url: "/contact-us" },
  { title: "about us", url: "/about-us" },
];

const QuickLinks2 = [
  { title: "terms of services", url: "/terms" },
  { title: "privacy policies", url: "/privacy-policy" },
];

// const SocialMediaLinks = [
//   { title: "facebook", url: "https://web.facebook.com/?_rdc=1&_rdr", Icon: BsFacebook },
//   { title: "x", url: "https://x.com/", Icon: BsTwitterX },
//   { title: "instagram", url: "https://www.instagram.com/", Icon: BsInstagram },
//   { title: "whatsapp", url: "https://www.whatsapp.com/", Icon: BsWhatsapp },
// ];



export default function Footer({show}) {

  const [email, setEmail] = useState({
    email: '',
  })

  const subscribe = async () => {
    if (!email.email) return errorMessage('Email is missing')
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (!isValidEmail(email.email)) return errorMessage('Invalid email')
    const formdata = {
      email: email.email
    }
    try {
      const res = await ClientPostApi(Apis.non_auth.email_sub, formdata)
      if (res.status === 200) {
        successMessage('subcribed successfully')
        setEmail({
          email: ''
        })
      } else {
        errorMessage(res.msg)
      }
    } catch (error) {
      console.log(error)
      errorMessage('sorry, something went wrong. try again')
    }
  }


  return (
    <div className="w-full  ">
     {show && <ContactUs />}
      <div className="bg-white text-sec h-fit w-full pt-20 pb-10 overflow-hidden">
        <div className="w-11/12 mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="w-full">
              <div className="flex items-center gap-3">
                <img src={logo} className="w-32 h-20 mb-5" alt="pinerock logo" />

              </div>
              <div className="text-base font-semibold">Pinerockcreditunion is a multinational regional financial services provider that is committed to delivering complete solutions to customers through differentiated segment offerings and an ecosystem that supports simple, fast and seamless customer experiences, underpinned by a cohesive and inspired workforce, and relationships built with stakeholders.</div>
              <div className="text-sec my-3  pt-2 flex flex-col gap-3 font-semibold">
                <div className="flex items-center gap-2"> <SlClock className="" /> Working hours: 24/7</div>
                <div className="flex items-center gap-2"> <SlEnvolope /> {SiteEmail}</div>
              </div>
            </div>
            <div className="w-full flex items-start gap-5">
              <div className="lg:w-1/2 w-full">
                <div className="text-xl font-bold mb-5 text-sec  ">
                  Quick Links
                </div>
                <div className="flex flex-col gap-5">
                  {QuickLinks.map((item, index) => (
                    <Link
                      className="hover:translate-x-2 font-bold transition-all delay-150 hover:text-orange-400 capitalize "
                      to={`${item.url}`}
                      key={index}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="text-xl font-bold mb-5 text-sec  ">
                  Resources
                </div>
                <div className="flex flex-col gap-5">
                  {QuickLinks2.map((item, index) => (
                    <Link
                      className=" font-bold hover:translate-x-2 transition-all delay-150 hover:text-orange-400 capitalize "
                      to={`${item.url}`}
                      key={index}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
            <div className="w-full">
              <div className="text-[1.5rem] font-bold mb-5 text-sec  pb-1 ">
                Subscribe to our NewsLetters
              </div>
              <div className="w-full flex">
                <input
                  className="w-full px-5 py-2.5 border-t border-b border-l rounded-lg text-black bg-white focus:outline-none"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={email.email}
                  onChange={(e) => setEmail({ ...email, [e.target.name]: e.target.value })}
                />
                <button onClick={subscribe} className="w-fit px-5 py-2.5 -ml-5 rounded-lg text-white bg-orange-500">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3 w-full border-t flex flex-col items-start gap-1">
            <div className="flex my-5 gap-5">
              {QuickLinks2.map((item, index) => (
                <Link
                  className="  hover:translate-x-1 transition-all delay-150 duration-200 hover:text-orange-400 capitalize "
                  to={`${item.url}`}
                  key={index}
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <footer className="text-center w-full">
              <p className="">&copy; 2024 Pinerock Credit Union. All rights reserved.</p>
            </footer>

          </div>
        </div>

      </div>
    </div>
  );
}
