
import HeroSection from "@/components/general/HeroSection";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from 'framer-motion'
import CounterNumbers from "@/components/general/CounterNumbers";
import PaymentAndHowItWorks from "@/components/general/PaymentAndHowItWorks";
import footerbg from "@/assets/general/footerbg.png";
import FAQ from "@/components/general/FAQ";
import ContactUs from "@/components/general/ContactUs";

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="lg:mt-10  h-fit py-3  mx-auto ">
          <HeroSection />
        </div>
      </motion.div>
      <motion.div className="w-full relative lg:mb-52 mb-60 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="w-full absolute lg:-top-16 z-20 bg-white h-fit pt-10 lg:pt-20 ">
          <CounterNumbers />
        </div>
      </motion.div>
      <motion.div className="w-full relative  bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="w-full  ">
          <PaymentAndHowItWorks />
        </div>
      </motion.div>
      <div
        className="w-full lg:h-[1506px] pb-10 lg:pb-0  bg-no-repeat  relative bg-cover bg-center"
        style={{ backgroundImage: `url(${footerbg})`, zIndex: 0 }}
      >
        <div className="w-full flex items-start flex-col gap-10 lg:gap-32">
          <FAQ />
          <ContactUs bg_active={false}/>
        </div>

      </div>
    </>
  );
}
