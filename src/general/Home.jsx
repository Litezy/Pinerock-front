
import ContactForm from "components/general/ContactForm";
import FAQ from "components/general/FAQ";
import HeroSection from "components/general/HeroSection";
import Testimonials from "components/general/Testimonials";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import Counter from "utils/Counter";
import { HomeAnalyses, HomeServices } from "utils/Pageutils";
import { motion,useScroll,useTransform } from 'framer-motion'

export default function Home() {

  const OPTIONS = { loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
  const ref = useRef(null); 
  const { scrollYProgress } = useScroll({
    target: ref, 
    offset: ["start end", "end start"] // Adjusting the scroll trigger points
  });

  // Scaling the component and setting opacity based on scroll position
  const scale = useTransform(scrollYProgress, [0, 1], [.9, 1.01]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [-100, 0])
  const x = useTransform(scrollYProgress, [0, 1], [-50, 0])


  return (
    <>
      <motion.div className="w-full"
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:0.5 , duration:0.5}}
      >
        <div className="mt-32 h-fit py-3  w-11/12 mx-auto ">
          <HeroSection />
        </div>
      </motion.div>

      <motion.div className="bans h-[80dvh]"
       ref={ref}
       style={{scale, opacity,}}
      >
        <div className="bg-gradient-to-b from-primary to-black/30 w-full h-full">
          <div className="flex justify-center w-11/12 mx-auto h-full flex-col items-center text-white backdrop-blur-sm">
            <div className="font-bold text-4xl lg:text-6xl mb-3 text-orange-500">
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
              with open banking
            </div>
            <div className="mt-5 text-center text-lg max-w-3xl mx-auto">
              Our advanced technology and secure systems provide a safe and
              reliable way to transfer funds, allowing you to benefit from
              reduced processing times and improved efficiency.
            </div>
            <div className="mt-10">
              <Link
                className="bg-orange-500 py-5 px-10 rounded-lg text-white shadow-2xl"
                to="/signup"
              >
                Open an account
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-5 relative w-11/12 mx-auto lg:w-10/12 mb-20"
      ref={ref}
      style={{scale,opacity}}
      >
        {HomeServices.map((item, index) => (
          <div
            className="relative bg-white  rounded-lg overflow-hidden group cursor-pointer p-5 h-[15rem] shadow-2xl" key={index}>
            <div className="absolute inset-0 bg-sec transition-transform transform scale-y-0 origin-bottom group-hover:scale-y-100 duration-500"></div>
            <div className="relative z-10 text-4xl lg:text-5xl w-fit mx-auto bg-gradient-to-tr from-primary to-sec p-3 rounded-lg text-white group-hover:text-white group-hover:bg-white">
              <item.Icon />
            </div>
            <div className="relative group-hover:text-white z-10 font-bold text-center text-2xl mb-5 mt-3 ">
              {item.title}
            </div>
            <div className="relative z-10 text-center group-hover:text-white">{item.content}</div>
          </div>

        ))}
      </motion.div>
      <motion.div className="bg-zinc-100 py-20 mb-10"
      ref={ref}
      style={{
        scale, 
        opacity, 
      }}
      >
        <div className="w-11/12 mx-auto lg:w-10/12">
          <div className="w-fit mx-auto mb-10 font-bold text-4xl lg:text-5xl">
            <div className="bg-zinc-500 h-1 w-3/5 mt-3 ml-auto"></div>
            <div className="">Top Down Analysis</div>
            <div className="bg-zinc-500 h-1 w-3/5 mt-3"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {HomeAnalyses.map((item, index) => (
              <div
                
                className="flex flex-col items-center justify-center" key={index}>
                <div className="font-bold text-5xl flex items-center lg:text-6xl"><Counter duration={2000} end={item.total} />   {item.type}</div>
                <div className="capitalize font-light">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div 
      ref={ref}
      style={{
        scale, 
        opacity, 
      }}
      className="py-10 mb-10">
        <div className="w-11/12 mx-auto lg:w-10/12">
          <div className="w-fit mx-auto mb-10 font-bold text-4xl lg:text-5xl">
            <div className="bg-zinc-500 h-1 w-3/5 mt-3"></div>
            <div className="">Testimonials</div>
            <div className="bg-zinc-500 h-1 w-3/5 mt-3 ml-auto"></div>
          </div>
          <Testimonials slides={SLIDES} options={OPTIONS} />
        </div>
      </motion.div>

      <motion.div 
      ref={ref}
      style={{
        scale, 
        opacity, 
      }}
      className="w-11/12 mx-auto lg:w-10/12 mb-20">
        <div className="w-fit mx-auto mb-10 font-bold text-3xl lg:text-4xl">
          <div className="bg-primary h-1 w-3/5 mt-3 ml-auto"></div>
          <div className="">
            <div className="text-center text-primary">Why Choose Us?</div>
          </div>
          <div className="bg-primary h-1 w-3/5 mt-3"></div>
        </div>

      </motion.div>
      <motion.div className="w-full bg-gradient-to-tr from-primary via-sec to-orange-500"
      ref={ref}
      style={{
        scale, 
        opacity, 
      }}
      >
        <FAQ iconcol={false} ans={`text-white`} />
      </motion.div>


      <motion.div 
      ref={ref}
      style={{
        scale, 
        opacity, 
      }}
      className="w-11/12 mx-auto lg:w-10/12 mb-20">
        <div className="w-fit mx-auto mb-10 font-bold text-4xl lg:text-5xl">
          <div className="bg-zinc-500 h-1 w-3/5 mt-3 ml-auto"></div>
          <div className="">Contact Us</div>
          <div className="bg-zinc-500 h-1 w-3/5 mt-3"></div>
        </div>
        <div className="contacts rounded-xl py-10 px-5 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="">
          </div>
          <ContactForm />
        </div>

      </motion.div>
    </>
  );
}
