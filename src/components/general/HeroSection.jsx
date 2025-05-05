import React, { useRef } from 'react'
import HeroSlideShow from './HeroSlides';


const HeroSection = () => {
   

    const OPTIONS = { speed:100, loop: true}
    const SLIDE_COUNT = 3
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
    return (
      
            <div className="w-11/12 mx-auto">
              <HeroSlideShow  slides={SLIDES} options={OPTIONS}   />

            </div>
    
    )
}

export default HeroSection