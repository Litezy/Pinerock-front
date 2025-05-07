import Footer from '@/components/general/Footer'
import Header from '@/components/general/Header'
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function GeneralLayout({ children }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setShow(true)
      // const hideTimeout = setTimeout(() => {
      //   setShow(false)
      // }, 5000)
      // return () => clearTimeout(hideTimeout);
    }, 10000)

    // return () => clearTimeout(showTimeout);
  }, [])  // The empty dependency array ensures it runs only once

  const handleClose = () => {
    setShow(false)
  }
  const ref = useRef(null)

  useEffect(()=>{
   if(ref){
    window.addEventListener('click', (e)=>{
      if(ref.current !== null && !ref.current.contains(e.target)) return setShow(false)
    },true)
   }
  },[])


  return (
    <div className="overflow-hidden w-full">
      
      <Header  />
      {children}
      <Footer />
    </div>
  )
}
