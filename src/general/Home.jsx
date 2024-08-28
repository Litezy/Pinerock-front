
import ContactForm from "components/general/ContactForm";
import FAQ from "components/general/FAQ";
import HeroSection from "components/general/HeroSection";
import Testimonials from "components/general/Testimonials";
import React from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { HomeAnalyses, HomeServices } from "utils/Pageutils";
import { TbStarFilled } from "react-icons/tb";
import Slides from "../components/general/Slides";
import SendMoney from "components/general/SendMoney";

export default function Home() {

  const OPTIONS = { loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())



  return (
    <>
      <div className="lg:mt-32 mt-20 h-fit py-3 mb-10 w-11/12 mx-auto bg-white">
        <HeroSection />
      </div>
      <Slides />
      <div className="bans h-[80dvh]">
        <div className="bg-gradient-to-b from-primary to-black/30 w-full h-full">
          <div className="flex justify-center w-11/12 mx-auto h-full flex-col items-center text-white backdrop-blur-sm">
            <div className="font-bold text-4xl lg:text-6xl mb-3 text-sec">
              <TypeAnimation
                sequence={[
                  "Seamless Experience",
                  1000,
                  "Instant Payments",
                  1000,
                  "Low Transaction Fees",
                  1000,
                  "No ChargeBacks",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
            <div className="font-bold text-3xl lg:text-4xl mt-3">
              with SageStone Credit Union
            </div>
            <div className="mt-5 text-center text-lg max-w-3xl mx-auto">
              Our advanced technology and secure systems provide a safe and
              reliable way to transfer funds, allowing you to benefit from
              reduced processing times and improved efficiency.
            </div>
            <div className="mt-10">
              <Link
                className="bg-primary py-5 px-10 rounded-lg text-white shadow-2xl"
                to="/signup"
              >
                Open an account
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-5 -mt-10 relative w-11/12 mx-auto lg:w-10/12 mb-20">
        {HomeServices.map((item, index) => (
          <div className="bg-white rounded-lg transition-all hover:-translate-y-3 cursor-pointer duration-300 p-5 h-[15rem] shadow-2xl" key={index}>
            <div className="text-4xl lg:text-5xl w-fit mx-auto bg-primary -mt-10 p-3 rounded-lg text-white"> <item.Icon /> </div>
            <div className="font-bold text-center text-2xl mb-10 mt-5 text-primary">{item.title}</div>
            <div className="text-center">{item.content}</div>
          </div>
        ))}
      </div>
      <div className="bg-zinc-100 py-20 mb-10">
        <div className="w-11/12 mx-auto lg:w-10/12">
          <div className="w-fit mx-auto mb-10 font-bold text-4xl lg:text-5xl">
            <div className="bg-primary h-1 w-3/5 mt-3 ml-auto"></div>
            <div className="text-primary">Top Down Analysis</div>
            <div className="bg-primary h-1 w-3/5 mt-3"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {HomeAnalyses.map((item, index) => (
              <div className="flex flex-col items-center justify-center" key={index}>
                <div className="font-bold text-5xl lg:text-6xl">{item.total}{item.type}</div>
                <div className="capitalize font-light">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto my-10">
        <SendMoney />
      </div>
      <Slides />
      <div className="py-10 mb-10">
        <div className="w-11/12 mx-auto lg:w-10/12">
          <div className="w-fit mx-auto mb-10 font-bold text-4xl lg:text-5xl">
            <div className="bg-primary h-1 w-3/5 mt-3"></div>
            <div className="text-primary">Testimonials</div>
            <div className="bg-primary h-1 w-3/5 mt-3 ml-auto"></div>
          </div>
          <Testimonials slides={SLIDES} options={OPTIONS} />
        </div>
      </div>

      <div className="w-11/12 mx-auto lg:w-10/12 mb-20">
        <div className="w-fit mx-auto mb-10 font-bold text-3xl lg:text-4xl">
          <div className="bg-primary h-1 w-3/5 mt-3 ml-auto"></div>
          <div className="">
            <div className="text-center text-primary">Why Choose Us?</div>
          </div>
          <div className="bg-primary h-1 w-3/5 mt-3"></div>
        </div>
        <div className="">
          <FAQ styles={`bg-primary`} iconcol={false} />
        </div>
      </div>


      <div className="w-11/12 mx-auto lg:w-10/12 mb-20">
        <div className="w-fit mx-auto mb-10 font-bold text-4xl lg:text-5xl">
          <div className="bg-primary h-1 w-3/5 mt-3 ml-auto"></div>
          <div className="text-primary">Contact Us</div>
          <div className="bg-primary h-1 w-3/5 mt-3"></div>
        </div>
        <div className="contacts rounded-xl py-10 px-5 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="">
          </div>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
