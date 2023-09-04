"use client"
import React, { useState, useEffect, useMemo, memo, useRef, useCallback } from 'react';
import { isMobileDevice, animatedScrollTo } from "../utils/is-mobile";

interface FullpageProps {
    initialSlide: number;
    slidesCount: number;
    duration: number;
    children: any
}

const Fullpage = (props: FullpageProps) => {
    console.log("re-rendering")
    const {initialSlide, slidesCount, duration, children} = props;
    const [isScrollPending, setIsScrollPending] = useState<boolean>(false);
    const [isScrolledAlready, setIsScrolledAlready] = useState<boolean>(false);
    const [slides, setSlides] = useState<number[]>([]);
    const [touchSensitivity] = useState<number>(5);
    const [touchStart, setTouchStart] = useState<number>(0);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const  activeSlide = useRef<number>(initialSlide)

    const onScroll = useCallback((evt: any) => {
        evt.preventDefault();
        if (isScrollPending) return;
        const scrollDown = (evt.wheelDelta || -evt.deltaY || -evt.detail) < 0;
 
        if (scrollDown) {
            activeSlide.current++
        } else {
            activeSlide.current--;
        }
        console.log("scrollDown", scrollDown, "activeSlide", activeSlide.current, "slides", slides)

        scrollToSlide(activeSlide.current);
    },[activeSlide, isScrollPending]) 
 

    const scrollToSlide = useCallback((slide: number) => {
        if (!isScrollPending && slide >= 0 && slide < slidesCount ) {
            setIsScrollPending(true);
            animatedScrollTo(slides[slide], duration, () => {
                setIsScrollPending(false);
                setIsScrolledAlready(true);
            })
        }

    },[duration, isScrollPending, slides, slidesCount]) 

    const onTouchMove = (evt: any) => {
        debugger
        if ( isScrollPending ) return;
        evt.preventDefault();
        const touchEnd = evt.changedTouches[0].clientY;
        if (!isScrollPending && !isScrolledAlready) {
            if (touchStart > touchEnd + touchSensitivity) {
                scrollToSlide(activeSlide.current + 1)
      

            } else if (touchStart < touchEnd - touchSensitivity ) {
                scrollToSlide(activeSlide.current - 1)
            }
        } 

        const scrollDown = evt.wheelDelta || -evt.deltaY || -evt.de
    }

    const onTouchStart = (evt: any) => {
        setTouchStart(evt.touches[0].clientY)
        setIsScrolledAlready(false);
    }

    const updateSlides = () => {
        setSlides([])
    
        for (let i = 0; i < slidesCount; i++) {
          slides.push(window.innerHeight * i);
        }
      }

    const onResize = () => {
        updateSlides();
    }
 
    useEffect(() => {
        setIsMobile(isMobileDevice());
        updateSlides()
        if ( isMobile ) {
            document.addEventListener("touchmove", onTouchMove, { passive: false})
            document.addEventListener("touchstart", onTouchStart);
        } else {
            document.addEventListener("scroll", onScroll, { passive: false })
        }

        window.addEventListener("resize", onResize);

        return () => {
            if (isMobile) {
                document.removeEventListener("touchmove", onTouchMove);
                document.removeEventListener("touchstart", onTouchStart);
            } else {
                document.removeEventListener("wheel", onScroll);
            }
            window.removeEventListener("resize", onResize);
        }
    }, [])
  return (
    <div style={{ height: window.innerHeight }}>
        {children}
    </div>
  )
}

export default memo(Fullpage);