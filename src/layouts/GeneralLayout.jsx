import Footer from '@/components/general/Footer'
import Header from '@/components/general/Header'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function GeneralLayout({ children }) {
  const [show, setShow] = useState(true)
  const [showHome, setShowHome] = useState(false)
  const location = useLocation()
  const pathName = location.pathname

  useEffect(() => {
    if (pathName === '/contact-us' || pathName === '/') {
      setShow(false)
    } else {
      setShow(true)
    }
  }, [location])


  return (
    <div className="overflow-hidden w-full">
      <Header />
      {children}
      <Footer show={show} home={showHome} />
    </div>
  )
}
