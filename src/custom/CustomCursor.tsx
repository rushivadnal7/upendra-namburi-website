"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const updateCursorStyle = () => {
      const target = document.elementFromPoint(position.x, position.y)

      if (target) {
        const computedStyle = window.getComputedStyle(target)
        setIsPointer(
          computedStyle.cursor === "pointer" ||
            target.tagName === "BUTTON" ||
            target.tagName === "A" ||
            target.closest("a") !== null ||
            target.closest("button") !== null,
        )
      }
    }

    const hideCursor = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", updateCursorPosition)
    window.addEventListener("mouseenter", updateCursorPosition)
    window.addEventListener("mouseleave", hideCursor)

    const interval = setInterval(updateCursorStyle, 100)

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition)
      window.removeEventListener("mouseenter", updateCursorPosition)
      window.removeEventListener("mouseleave", hideCursor)
      clearInterval(interval)
    }
  }, [position])

  useEffect(() => {
    if (isVisible) {
      gsap.to(".cursor", {
        x: position.x,
        y: position.y,
        duration: 0.15,
        ease: "power2.out",
      })

      gsap.to(".cursor-follower", {
        x: position.x,
        y: position.y,
        duration: 0.5,
        ease: "power2.out",
      })
    }
  }, [position, isVisible])

  useEffect(() => {
    if (isPointer) {
      gsap.to(".cursor", {
        scale: 1.5,
        opacity: 0.5,
        duration: 0.2,
      })

      gsap.to(".cursor-follower", {
        scale: 0,
        opacity: 0,
        duration: 0.2,
      })
    } else {
      gsap.to(".cursor", {
        scale: 1,
        opacity: 1,
        duration: 0.2,
      })

      gsap.to(".cursor-follower", {
        scale: 1,
        opacity: 0.25,
        duration: 0.2,
      })
    }
  }, [isPointer])

  if (typeof window === "undefined") return null

  return (
    <>
      <div
        className="cursor fixed w-5 h-5 rounded-full bg-black pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: "-10px",
          top: "-10px",
          opacity: isVisible ? 1 : 0,
        }}
      />
      <div
        className="cursor-follower fixed w-10 h-10 rounded-full border border-black pointer-events-none z-[9998]"
        style={{
          left: "-20px",
          top: "-20px",
          opacity: isVisible ? 0.25 : 0,
        }}
      />
    </>
  )
}
