"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { SplitText } from "gsap/SplitText"
// import Image from "next/image"
// import Link from "next/link"

import { ChevronDown, ExternalLink, Menu, X } from "lucide-react"
// import BookShowcase from "@/components/book-showcase"
// import ImageGallery from "@/components/image-gallery"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import CustomCursor from "@/custom/CustomCursor"
import BookShowcase from "@/custom/BookShowcase"
import ImageGallery from "@/custom/ImageGallery"
// import CustomCursor from "@/components/custom-cursor"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother, SplitText)
}

export default function V0Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const smootherRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const navbarRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const booksRef = useRef<HTMLDivElement>(null)
  const booksSectionRef = useRef<HTMLDivElement>(null)
  const upcomingRef = useRef<HTMLDivElement>(null)
  const seriesRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const articlesRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [navbarVisible, setNavbarVisible] = useState(true)
  const [smootherInstance, setSmootherInstance] = useState<any>(null)

  useEffect(() => {
    // Handle navbar visibility on scroll with throttling
    const handleScroll = () => {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down
          setNavbarVisible(false)
        } else {
          // Scrolling up
          setNavbarVisible(true)
        }

        setLastScrollY(currentScrollY)
      })
    }

    // Throttle scroll events for better performance
    let scrollTimeout: number
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = window.setTimeout(() => {
          scrollTimeout = 0
          handleScroll()
        }, 100) // Throttle to 10 times per second
      }
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", throttledScroll)
      window.clearTimeout(scrollTimeout)
    }
  }, [lastScrollY])

  useEffect(() => {
    // Initialize smooth scrolling with optimized settings
    let smoother: any

    if (smootherRef.current && contentRef.current) {
      // Create smoother with optimized settings
      smoother = ScrollSmoother.create({
        smooth: 1, // Reduced smoothness for better performance
        effects: true,
        wrapper: smootherRef.current,
        content: contentRef.current,
        normalizeScroll: true,
        ignoreMobileResize: true,
        renderGlare: false, // Disable glare effect for better performance
        preventDefault: true,
      })

      setSmootherInstance(smoother)
    }

    // Initialize animations with performance optimizations
    const ctx = gsap.context(() => {
      // Hero animations with text splitting - optimized
      if (document.querySelector(".hero-title")) {
        const heroTitle = new SplitText(".hero-title", { type: "chars, words" })
        const heroSubtitle = new SplitText(".hero-subtitle", { type: "lines" })
        const heroName = new SplitText(".hero-name", { type: "chars" })

        const heroTl = gsap.timeline({
          onComplete: () => {
            // Clean up split text instances after animation completes
            if (heroTitle.revert) heroTitle.revert()
            if (heroSubtitle.revert) heroSubtitle.revert()
            if (heroName.revert) heroName.revert()
          },
        })

        heroTl
          .from(heroName.chars, {
            opacity: 0,
            y: 50,
            rotationX: -90,
            stagger: 0.02, // Reduced stagger time
            duration: 0.8,
            ease: "power4.out",
          })
          .from(
            heroTitle.chars,
            {
              opacity: 0,
              y: 30,
              rotationX: -90,
              stagger: 0.01, // Reduced stagger time
              duration: 0.6,
              ease: "power4.out",
            },
            "-=0.4", // Reduced overlap
          )
          .from(
            heroSubtitle.lines,
            {
              opacity: 0,
              y: 20,
              stagger: 0.08,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.2", // Reduced overlap
          )
          .from(
            ".hero-cta",
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.2", // Reduced overlap
          )
      }

      // About section pin and reveal - optimized
      if (aboutRef.current) {
        ScrollTrigger.create({
          trigger: aboutRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1, // Improve pin performance
          fastScrollEnd: true, // Improve performance on fast scrolling
        })

        const aboutTl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 0.5,
          },
        })

        aboutTl
          .from(".about-image", {
            y: 50, // Reduced movement
            opacity: 0,
            duration: 0.8,
          })
          .from(
            ".about-content p",
            {
              y: 30, // Reduced movement
              opacity: 0,
              stagger: 0.1, // Reduced stagger
              duration: 0.8,
            },
            "-=0.4", // Reduced overlap
          )
      }

      // Horizontal scrolling for books section - optimized
      if (horizontalRef.current && booksSectionRef.current) {
        const sections = gsap.utils.toArray(".book-item")

        // Use markers only in development
        const isDevEnvironment = process.env.NODE_ENV === "development"

        const horizontalScroll = gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + horizontalRef.current.offsetWidth,
            invalidateOnRefresh: true, // Improve refresh performance
            fastScrollEnd: true, // Improve performance on fast scrolling
            markers: isDevEnvironment,
          },
        })
      }

      // Book reviews animation - optimized
      gsap.utils.toArray(".book-review").forEach((review: any) => {
        gsap.from(review, {
          y: 30, // Reduced movement
          opacity: 0,
          duration: 0.6,
          stagger: 0.1, // Reduced stagger
          scrollTrigger: {
            trigger: review,
            start: "top 85%",
            toggleActions: "play none none none",
            fastScrollEnd: true, // Improve performance on fast scrolling
          },
        })
      })

      // 11th Hour section special animation - optimized
      if (seriesRef.current) {
        const seriesTl = gsap.timeline({
          scrollTrigger: {
            trigger: seriesRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            fastScrollEnd: true, // Improve performance on fast scrolling
          },
        })

        seriesTl
          .fromTo(
            ".series-image",
            {
              y: -30, // Reduced movement
              scale: 0.95,
            },
            {
              y: 30, // Reduced movement
              scale: 1,
              ease: "none",
            },
          )
          .fromTo(
            ".series-overlay",
            {
              opacity: 0.3,
            },
            {
              opacity: 0.7,
              ease: "none",
            },
            0,
          )
      }

      // Series content animation - optimized
      const seriesContentTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".series-content",
          start: "top 80%",
          toggleActions: "play none none none",
          fastScrollEnd: true, // Improve performance on fast scrolling
        },
      })

      seriesContentTl
        .from(".series-badge", {
          scale: 0,
          opacity: 0,
          duration: 0.5, // Reduced duration
          ease: "back.out(1.5)", // Reduced intensity
        })
        .from(
          ".series-title",
          {
            y: 20, // Reduced movement
            opacity: 0,
            duration: 0.5, // Reduced duration
          },
          "-=0.2", // Reduced overlap
        )
        .from(
          ".series-description",
          {
            y: 20, // Reduced movement
            opacity: 0,
            stagger: 0.1, // Reduced stagger
            duration: 0.5, // Reduced duration
          },
          "-=0.2", // Reduced overlap
        )

      // Media section interactive grid - optimized
      if (mediaRef.current) {
        const mediaTl = gsap.timeline({
          scrollTrigger: {
            trigger: mediaRef.current,
            start: "top 80%",
            fastScrollEnd: true, // Improve performance on fast scrolling
          },
        })

        mediaTl
          .from(".media-heading", {
            y: 30, // Reduced movement
            opacity: 0,
            duration: 0.6, // Reduced duration
          })
          .from(
            ".media-item",
            {
              y: 50, // Reduced movement
              opacity: 0,
              duration: 0.6, // Reduced duration
              stagger: 0.08, // Reduced stagger
              ease: "power3.out",
            },
            "-=0.3", // Reduced overlap
          )
      }

      // Gallery section animation - optimized
      if (galleryRef.current) {
        const galleryTl = gsap.timeline({
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            fastScrollEnd: true, // Improve performance on fast scrolling
          },
        })

        galleryTl.from(".gallery-item", {
          y: 30, // Reduced movement
          opacity: 0,
          duration: 0.5, // Reduced duration
          stagger: 0.03, // Reduced stagger
          ease: "power2.out",
        })
      }

      // Media hover effects - optimized with delegation
      const mediaContainer = document.querySelector(".media-container")
      if (mediaContainer) {
        mediaContainer.addEventListener(
          "mouseenter",
          (e) => {
            const target = e.target as HTMLElement
            const mediaItem = target.closest(".media-item")
            if (mediaItem) {
              const overlay = mediaItem.querySelector(".media-overlay")
              const content = mediaItem.querySelector(".media-content")

              if (overlay) {
                gsap.to(overlay, {
                  opacity: 0.8,
                  duration: 0.3,
                })
              }

              if (content) {
                gsap.to(content, {
                  y: 0,
                  opacity: 1,
                  duration: 0.3,
                })
              }
            }
          },
          { capture: true },
        )

        mediaContainer.addEventListener(
          "mouseleave",
          (e) => {
            const target = e.target as HTMLElement
            const mediaItem = target.closest(".media-item")
            if (mediaItem) {
              const overlay = mediaItem.querySelector(".media-overlay")
              const content = mediaItem.querySelector(".media-content")

              if (overlay) {
                gsap.to(overlay, {
                  opacity: 0,
                  duration: 0.3,
                })
              }

              if (content) {
                gsap.to(content, {
                  y: 20,
                  opacity: 0,
                  duration: 0.3,
                })
              }
            }
          },
          { capture: true },
        )
      }

      // Articles section 3D rotation - optimized
      const articleItems = gsap.utils.toArray(".article-item")
      articleItems.forEach((item: any, index: number) => {
        // Alternate direction for better visual effect and performance
        const rotationDirection = index % 2 === 0 ? 1 : -1

        const articleTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            fastScrollEnd: true, // Improve performance on fast scrolling
          },
        })

        articleTl.fromTo(
          item,
          {
            rotationY: 5 * rotationDirection, // Reduced rotation
            transformPerspective: 1000,
          },
          {
            rotationY: -5 * rotationDirection, // Reduced rotation
            ease: "none",
          },
        )
      })

      // Contact form animation - optimized
      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
          fastScrollEnd: true, // Improve performance on fast scrolling
        },
      })

      contactTl
        .from(".contact-form", {
          y: 50, // Reduced movement
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".form-field",
          {
            y: 20, // Reduced movement
            opacity: 0,
            stagger: 0.08, // Reduced stagger
            duration: 0.5, // Reduced duration
            ease: "power3.out",
          },
          "-=0.4", // Reduced overlap
        )

      // Section headings reveal animation - optimized
      gsap.utils.toArray(".section-heading").forEach((heading: any) => {
        const headingTl = gsap.timeline({
          scrollTrigger: {
            trigger: heading,
            start: "top 80%",
            end: "top 20%",
            scrub: 0.5,
            fastScrollEnd: true, // Improve performance on fast scrolling
          },
        })

        headingTl
          .from(heading, {
            y: 30, // Reduced movement
            opacity: 0,
            duration: 0.8,
          })
          .to(
            heading,
            {
              backgroundSize: "100% 2px",
              duration: 0.8,
            },
            "-=0.4", // Reduced overlap
          )
      })
    })

    return () => {
      // Clean up all animations and ScrollTrigger instances
      ctx.revert()
      if (smoother) smoother.kill()

      // Clean up all ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach((st) => st.kill())

      // Clean up any remaining SplitText instances
      const splitTextElements = document.querySelectorAll(".gsap-split-text")
      splitTextElements.forEach((el) => {
        el.classList.remove("gsap-split-text")
      })
    }
  }, [])

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    setMenuOpen(false)
    if (ref.current && smootherInstance) {
      // Use ScrollSmoother for smooth scrolling
      smootherInstance.scrollTo(ref.current, true, "center center")
    } else if (ref.current) {
      // Fallback to native scrolling
      window.scrollTo({
        top: ref.current.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  const books = [
    {
      id: 1,
      title: "31",
      subtitle: "A Ruthless Corporate Thriller",
      cover: "/images/book-31.png",
      summary:
        "For Ravi Shastry, March is make-or-break. As a sharp, no-nonsense executive at Imperial Bank, he's spent years clawing his way to the top. Now, with just 31 days left in the financial year, a promotion is within reach.",
      reviews: [
        {
          text: "A relentless corporate thriller that drags you into a world where power is fleeting, betrayal is currency, and survival is never guaranteed.",
          author: "Business Standard",
        },
        { text: "Tick-tock, Ravi. Your time is running out.", author: "The Hindu" },
      ],
    },
    {
      id: 2,
      title: "60 Minutes",
      subtitle: "A Relentless Corporate Thriller",
      cover: "/images/book-60.png",
      summary:
        "Three people. One hour. Everything to lose. Agastya, a ruthless Chief Marketing Officer at one of the biggest FMCG companies, is about to launch the most important product of his career.",
      reviews: [
        {
          text: "60 Minutes is a high-stakes, pulse-pounding thriller where every second counts—and not everyone will make it to the finish line.",
          author: "Times of India",
        },
        { text: "One hour. Three battles. No second chances.", author: "Economic Times" },
      ],
    },
    {
      id: 3,
      title: "8 Hours",
      subtitle: "A Ruthless Corporate Thriller",
      cover: "/images/book-8.png",
      summary:
        "One night. One empire. One woman against them all. Aratrika Reddy, the bold and brilliant CEO of ARYA Holdings Ltd., has just 8 hours to stop her company from crumbling into bankruptcy and betrayal.",
      reviews: [
        {
          text: "8 Hours is a high-stakes, high-tension thriller where money, power, and revenge collide in a battle for survival.",
          author: "Mint",
        },
        { text: "Tick-tock, Aratrika. The night won't wait.", author: "Financial Express" },
      ],
    },
  ]

  const upcomingBooks = [
    {
      id: 1,
      title: "Upcoming Book 1",
      cover: "/images/upcoming-1.png",
      summary:
        "A groundbreaking new thriller exploring the intersection of technology, power, and human ambition in the digital age.",
    },
    {
      id: 2,
      title: "Upcoming Book 2",
      cover: "/images/upcoming-2.png",
      summary:
        "A deep dive into the world of corporate espionage and international finance, where loyalties shift as quickly as market prices.",
    },
  ]

  const mediaItems = [
    {
      id: 1,
      type: "video",
      title: "Leadership in Crisis",
      url: "https://www.youtube.com/embed/nt9Qcifib-k",
      thumbnail: "/images/video-1.png",
      description: "Discussing leadership strategies during uncertain times and market volatility.",
    },
    {
      id: 2,
      type: "video",
      title: "The Future of Business",
      url: "https://www.youtube.com/embed/d6tOsCTWIic",
      thumbnail: "/images/video-2.png",
      description: "Exploring emerging trends and technologies reshaping the business landscape.",
    },
    {
      id: 3,
      type: "video",
      title: "Corporate Strategy Panel",
      url: "https://www.youtube.com/embed/-2FlYiY7DkQ",
      thumbnail: "/images/video-3.png",
      description: "Panel discussion on effective corporate strategies in the digital era.",
    },
    {
      id: 4,
      type: "video",
      title: "Author Interview",
      url: "https://www.youtube.com/embed/SQkEFDuRVV8",
      thumbnail: "/images/video-4.png",
      description: "In-depth interview about the writing process and inspiration behind the books.",
    },
    {
      id: 5,
      type: "video",
      title: "Banking Frontiers Conference",
      url: "https://www.youtube.com/embed/EIO6-ecFtgk",
      thumbnail: "/images/video-5.png",
      description: "Keynote speech on innovation and disruption in the banking sector.",
    },
    {
      id: 6,
      type: "video",
      title: "Marketing Innovation Talk",
      url: "https://www.youtube.com/embed/ZxWCe2Iav8o",
      thumbnail: "/images/video-6.png",
      description: "Discussing breakthrough marketing strategies for the digital age.",
    },
  ]

  const galleryImages = [
    { id: 1, src: "/images/gallery-1.jpg", alt: "Book signing event in Mumbai" },
    { id: 2, src: "/images/gallery-2.jpg", alt: "Panel discussion at literary festival" },
    { id: 3, src: "/images/gallery-3.jpg", alt: "Corporate leadership workshop" },
    { id: 4, src: "/images/gallery-4.jpg", alt: "Interview with Business Today" },
    { id: 5, src: "/images/gallery-5.jpg", alt: "Book launch event" },
    { id: 6, src: "/images/gallery-6.jpg", alt: "Speaking at TEDx event" },
    { id: 7, src: "/images/gallery-7.jpg", alt: "Meeting with readers" },
    { id: 8, src: "/images/gallery-8.jpg", alt: "Corporate strategy seminar" },
    { id: 9, src: "/images/gallery-9.jpg", alt: "International book fair" },
    { id: 10, src: "/images/gallery-10.jpg", alt: "Television interview" },
    { id: 11, src: "/images/gallery-11.jpg", alt: "Mentoring session with entrepreneurs" },
    { id: 12, src: "/images/gallery-12.jpg", alt: "Book signing in Delhi" },
    { id: 13, src: "/images/gallery-13.jpg", alt: "Leadership conference keynote" },
    { id: 14, src: "/images/gallery-14.jpg", alt: "Author meet and greet" },
    { id: 15, src: "/images/gallery-15.jpg", alt: "Corporate workshop" },
  ]

  return (
    <div ref={mainRef} className="relative bg-white text-black">
      <CustomCursor />

      {/* Smooth scrolling wrapper */}
      <div ref={smootherRef} className="smooth-wrapper">
        <div ref={contentRef} className="smooth-content">
          {/* Floating Capsule Navbar */}
          <header
            ref={navbarRef}
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-5xl z-50 px-6 py-3 flex justify-between items-center bg-white/80 backdrop-blur-md rounded-full border border-gray-200 shadow-lg transition-all duration-500 ${navbarVisible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}`}
          >
            <div className="text-xl font-bold tracking-tighter">UN</div>

            <button
              onClick={toggleMenu}
              className="lg:hidden text-black z-50 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <nav
              className={`fixed lg:relative top-0 right-0 h-screen lg:h-auto w-full lg:w-auto bg-white/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none transform ${
                menuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
              } transition-transform duration-500 ease-in-out lg:transition-none flex flex-col lg:flex-row items-center justify-center lg:justify-end gap-8 lg:gap-6 text-lg z-40`}
            >
              <button
                onClick={() => scrollToSection(aboutRef)}
                className="nav-link hover:text-gray-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black hover:after:w-full after:transition-all"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection(booksRef)}
                className="nav-link hover:text-gray-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black hover:after:w-full after:transition-all"
              >
                Books
              </button>
              <button
                onClick={() => scrollToSection(seriesRef)}
                className="nav-link hover:text-gray-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black hover:after:w-full after:transition-all"
              >
                Mini Series
              </button>
              <button
                onClick={() => scrollToSection(mediaRef)}
                className="nav-link hover:text-gray-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black hover:after:w-full after:transition-all"
              >
                Media
              </button>
              <button
                onClick={() => scrollToSection(galleryRef)}
                className="nav-link hover:text-gray-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black hover:after:w-full after:transition-all"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection(articlesRef)}
                className="nav-link hover:text-gray-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black hover:after:w-full after:transition-all"
              >
                Articles
              </button>
              <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-6">Contact</Button>
            </nav>
          </header>

          {/* Hero Section with Emphasized Name */}
          <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white z-10"></div>
              <img
                src="/pageImages/hero-bg-img.png"
                alt="Upendra Namburi"
                className="object-cover"
                sizes="100vw"
                loading="eager"
              />
            </div>

            <div className="container mx-auto px-6 relative z-10">
              <h1 className="hero-name text-7xl md:text-9xl font-bold mb-4 leading-none tracking-tighter">
                Upendra Namburi
              </h1>
              <h2 className="hero-title text-3xl md:text-5xl font-bold mb-6 leading-tight text-black">
                Disruptor. Builder. Strategist.
              </h2>
              <p className="hero-subtitle text-xl md:text-2xl max-w-2xl mb-8 text-gray-700">
                Upendra Namburi doesn't pen corporate thrillers—he detonates them. His books are a headrush of ambition,
                power, and high-stakes mayhem.
              </p>
              <div className="hero-cta flex flex-wrap gap-4">
                <Button className="bg-black hover:bg-gray-800 text-white text-lg py-6 px-8 rounded-full">
                  Explore Books
                </Button>
                <Button
                  variant="outline"
                  className="border-black hover:bg-black/10 text-black text-lg py-6 px-8 rounded-full"
                >
                  Watch Interviews
                </Button>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown size={32} className="text-black" />
            </div>
          </section>

          {/* About Section - Pinned */}
          <section ref={aboutRef} className="py-24 min-h-screen flex items-center">
            <div className="container mx-auto px-6">
              <h2 className="section-heading text-4xl md:text-5xl font-bold mb-16 inline-block bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat bg-bottom pb-2">
                About Upendra
              </h2>

              <div className="grid md:grid-cols-2 gap-12 mt-16">
                <div className="about-content space-y-6">
                  <p className="text-lg text-gray-700">
                    A relentless innovator, Upendra Namburi thrives on breaking barriers and challenging the status quo.
                    Whether it's launching bold new ventures, scaling businesses, or engaging in thought-provoking
                    conversations, he believes in pushing boundaries and thinking beyond the obvious.
                  </p>
                  <p className="text-lg text-gray-700">
                    With 23 years of corporate leadership and five years as a technology entrepreneur, he has built and
                    led high-impact teams, driven P&L growth, and launched over 30 new products while setting up five
                    businesses from scratch—across both startup and corporate landscapes.
                  </p>
                  <p className="text-lg text-gray-700">
                    As the founder of Ideaearth Labs, Upendra is deeply involved in advising, investing in, and scaling
                    global startups. He works closely with founders and business leaders on their 0 to 1 and 10X
                    journeys, helping them navigate disruption and unlock exponential growth.
                  </p>
                  <p className="text-lg text-gray-700">
                    His true expertise? Merging technology with business strategy to create game-changing results—across
                    industries, markets, and the future of innovation.
                  </p>
                </div>

                <div className="about-image relative h-[500px] overflow-hidden rounded-lg shadow-xl">
                  <img
                    src="/images/upendra-portrait.png"
                    alt="Upendra Namburi"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold mb-2 text-white">Upendra Namburi</h3>
                    <p className="text-gray-200">Author & Business Strategist</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Books Section - Enhanced with Emphasis */}
          <section ref={booksRef} className="py-24 bg-gray-100">
            <div className="container mx-auto px-6 mb-12">
              <h2 className="section-heading text-4xl md:text-6xl font-bold mb-16 inline-block bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat bg-bottom pb-2">
                Published Books
              </h2>

              <div className="mb-12 max-w-3xl">
                <p className="text-xl text-gray-700 italic">
                  "Upendra Namburi's corporate thrillers are masterclasses in tension, ambition, and the cutthroat world
                  of high-stakes business."
                </p>
                <p className="text-right text-gray-500 mt-2">— Financial Times</p>
              </div>
            </div>

            <div ref={booksSectionRef} className="relative">
              <div ref={horizontalRef} className="overflow-hidden">
                <div className="flex books-container" style={{ width: `${books.length * 100}vw` }}>
                  {books.map((book) => (
                    <div key={book.id} className="book-item w-screen px-6 md:px-12 lg:px-24">
                      <BookShowcase book={book} lightTheme={true} enhanced={true} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                {books.map((book, index) => (
                  <div
                    key={`dot-${book.id}`}
                    className={`w-3 h-3 rounded-full ${index === 0 ? "bg-black" : "bg-gray-300"}`}
                  ></div>
                ))}
              </div>
            </div>
          </section>

          {/* Upcoming Books Section */}
          <section ref={upcomingRef} className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <h2 className="section-heading text-4xl md:text-5xl font-bold mb-16 inline-block bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat bg-bottom pb-2">
                Upcoming Books
              </h2>

              <div className="mt-16 grid md:grid-cols-2 gap-12">
                {upcomingBooks.map((book, index) => (
                  <div
                    key={book.id}
                    className="bg-gray-50 rounded-lg overflow-hidden group hover:scale-[1.02] transition-transform duration-300 shadow-xl"
                    data-speed={index % 2 === 0 ? "0.8" : "1.2"}
                  >
                    <div className="relative h-[300px]">
                      <img
                        src={book.cover || "/placeholder.svg"}
                        alt={book.title}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4 bg-black text-white text-sm px-3 py-1 rounded-full">
                        Coming Soon
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3">{book.title}</h3>
                      <p className="text-gray-700">{book.summary}</p>
                      <div className="mt-6">
                        <Button
                          variant="outline"
                          className="border-black text-black hover:bg-black hover:text-white rounded-full"
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mini Series Section - Enhanced as Major Achievement */}
          <section ref={seriesRef} className="py-24 bg-black text-white">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="series-content space-y-6 order-2 md:order-1">
                  <div className="series-badge inline-block bg-white text-black text-sm font-bold px-4 py-2 rounded-full mb-4">
                    NOW STREAMING
                  </div>
                  <h2 className="series-title text-4xl md:text-6xl font-bold">11th Hour</h2>
                  <p className="series-description text-lg text-gray-300">
                    "11th Hour" is a high-stakes corporate thriller that unfolds over one electrifying night. Starring
                    Tamannaah Bhatia in a fierce and commanding role, the Telugu web series—streaming on aha—dives into
                    the cutthroat world of power, money, and betrayal.
                  </p>
                  <p className="series-description text-lg text-gray-300">
                    Aratrika Reddy, the fearless CEO of Aditya Group, is in the fight of her life. With her company
                    teetering on the edge of financial ruin, she has until sunrise to secure a staggering ₹9,000 crore
                    and silence the wolves circling for her downfall.
                  </p>
                  <p className="series-description text-lg text-gray-300">
                    Based on Upendra Namburi's novel "8 Hours," this tense, adrenaline-fueled series keeps you on edge
                    as the clock mercilessly ticks down.
                  </p>
                  <div className="flex gap-4 mt-6">
                    <Link
                      to="https://www.aha.video/webseries/11th-hour"
                      target="_blank"
                      className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      Watch on AHA <ExternalLink size={16} />
                    </Link>
                    <Link
                      to="https://www.youtube.com/watch?v=NJ1kguc8JV0"
                      target="_blank"
                      className="flex items-center gap-2 border border-white text-white px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
                    >
                      View Trailer <ExternalLink size={16} />
                    </Link>
                  </div>
                </div>

                <div className="series-image-container relative h-[500px] rounded-lg overflow-hidden order-1 md:order-2">
                  <img
                    src="/images/11th-hour.png"
                    alt="11th Hour"
                    fill
                    className="object-cover series-image"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="series-overlay absolute inset-0 bg-black/50"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button className="bg-white hover:bg-gray-200 text-black rounded-full w-16 h-16 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </Button>
                  </div>
                  <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">Now Streaming</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Media Section - More Interactive */}
          <section ref={mediaRef} className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <h2 className="media-heading section-heading text-4xl md:text-5xl font-bold mb-16 inline-block bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat bg-bottom pb-2">
                Media & Interviews
              </h2>

              <div className="mt-16 grid md:grid-cols-3 gap-6 media-container">
                {mediaItems.map((item) => (
                  <div
                    key={item.id}
                    className="media-item group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="media-overlay absolute inset-0 bg-black/0 transition-opacity duration-300"></div>
                      <div className="media-content absolute inset-0 flex flex-col justify-end p-6 opacity-0 transform translate-y-20 transition-all duration-300">
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-white/80 text-sm">{item.description}</p>
                        <div className="mt-4">
                          <Link
                            to={item.url}
                            target="_blank"
                            className="inline-flex items-center gap-1 bg-white text-black px-4 py-2 rounded-full text-sm"
                          >
                            Watch Now <ExternalLink size={14} />
                          </Link>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                        Video
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                        <div className="w-16 h-16 rounded-full bg-black/70 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white ml-1"
                          >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white rounded-full px-8"
                >
                  View All Media
                </Button>
              </div>
            </div>
          </section>

          {/* Image Gallery Section */}
          <section ref={galleryRef} className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
              <h2 className="section-heading text-4xl md:text-5xl font-bold mb-16 inline-block bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat bg-bottom pb-2">
                Image Gallery
              </h2>

              <div className="mt-16">
                <ImageGallery images={galleryImages} />
              </div>
            </div>
          </section>

          {/* Articles Section - 3D Rotation */}
          <section ref={articlesRef} className="py-24 bg-gray-100">
            <div className="container mx-auto px-6">
              <h2 className="section-heading text-4xl md:text-5xl font-bold mb-16 inline-block bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat bg-bottom pb-2">
                Published Articles
              </h2>

              <div className="mt-16 grid md:grid-cols-2 gap-8">
                <div className="article-item bg-white p-6 rounded-lg hover:shadow-xl transition-shadow shadow-md">
                  <span className="text-gray-500 text-sm">Mint</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">The Future of Corporate Leadership</h3>
                  <p className="text-gray-700 mb-4">
                    An exploration of how leadership paradigms are shifting in the post-pandemic corporate landscape.
                  </p>
                  <Link to="#" className="text-black hover:text-gray-600 flex items-center gap-1">
                    Read Article <ExternalLink size={16} />
                  </Link>
                </div>

                <div className="article-item bg-white p-6 rounded-lg hover:shadow-xl transition-shadow shadow-md">
                  <span className="text-gray-500 text-sm">Economic Times</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">Disruption as a Business Strategy</h3>
                  <p className="text-gray-700 mb-4">
                    How companies can embrace disruption to create new market opportunities and drive growth.
                  </p>
                  <Link to="#" className="text-black hover:text-gray-600 flex items-center gap-1">
                    Read Article <ExternalLink size={16} />
                  </Link>
                </div>

                <div className="article-item bg-white p-6 rounded-lg hover:shadow-xl transition-shadow shadow-md">
                  <span className="text-gray-500 text-sm">Forbes India</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">The Art of Corporate Storytelling</h3>
                  <p className="text-gray-700 mb-4">
                    Why narrative is becoming the most powerful tool in a business leader's arsenal.
                  </p>
                  <Link to="#" className="text-black hover:text-gray-600 flex items-center gap-1">
                    Read Article <ExternalLink size={16} />
                  </Link>
                </div>

                <div className="article-item bg-white p-6 rounded-lg hover:shadow-xl transition-shadow shadow-md">
                  <span className="text-gray-500 text-sm">Business Standard</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">Technology and the Human Element</h3>
                  <p className="text-gray-700 mb-4">
                    Finding the balance between technological advancement and human-centered business practices.
                  </p>
                  <Link to="#" className="text-black hover:text-gray-600 flex items-center gap-1">
                    Read Article <ExternalLink size={16} />
                  </Link>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Button
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white rounded-full px-8"
                >
                  View All Articles
                </Button>
              </div>
            </div>
          </section>

          {/* Contact Section - Unique Design */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <h2 className="section-heading text-4xl md:text-5xl font-bold mb-16 inline-block bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat bg-bottom pb-2">
                Connect
              </h2>

              <div className="mt-16 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-black/5 -rotate-3 rounded-3xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-black/5 rotate-1 rounded-3xl"></div>

                <div className="contact-form relative bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-200">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold">For Publishers, Agents, Media & Producers</h3>
                      <p className="text-lg text-gray-700">
                        Interested in working with Upendra Namburi? Whether you're a publisher looking for your next
                        bestseller, a producer seeking adaptation rights, or media planning an interview, get in touch.
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-white"
                            >
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                          </div>
                          <span>+91 9876543210</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-white"
                            >
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                              <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                          </div>
                          <span>contact@upendranamburi.com</span>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-8">
                        <Link
                          to="#"
                          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                        </Link>
                        <Link
                          to="#"
                          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                          </svg>
                        </Link>
                        <Link
                          to="#"
                          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="2" y="2" width="20" height="20" rx="5" strokeLinejoin="round"></rect>
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </Link>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="form-field relative">
                        <input
                          type="text"
                          id="name"
                          className="peer w-full px-4 pt-8 pb-2 bg-transparent border-b-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                          placeholder=" "
                        />
                        <label
                          htmlFor="name"
                          className="absolute top-4 left-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs"
                        >
                          Name
                        </label>
                      </div>
                      <div className="form-field relative">
                        <input
                          type="email"
                          id="email"
                          className="peer w-full px-4 pt-8 pb-2 bg-transparent border-b-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                          placeholder=" "
                        />
                        <label
                          htmlFor="email"
                          className="absolute top-4 left-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs"
                        >
                          Email
                        </label>
                      </div>
                      <div className="form-field relative">
                        <input
                          type="text"
                          id="subject"
                          className="peer w-full px-4 pt-8 pb-2 bg-transparent border-b-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                          placeholder=" "
                        />
                        <label
                          htmlFor="subject"
                          className="absolute top-4 left-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs"
                        >
                          Subject
                        </label>
                      </div>
                      <div className="form-field relative">
                        <textarea
                          id="message"
                          rows={4}
                          className="peer w-full px-4 pt-8 pb-2 bg-transparent border-b-2 border-gray-300 focus:border-black focus:outline-none transition-colors resize-none"
                          placeholder=" "
                        ></textarea>
                        <label
                          htmlFor="message"
                          className="absolute top-4 left-4 text-gray-500 transition-all peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs"
                        >
                          Message
                        </label>
                      </div>
                      <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-full py-6">
                        Send Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 bg-gray-100 border-t border-gray-200">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-2xl font-bold tracking-tighter mb-6 md:mb-0">Upendra Namburi</div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                  <Link to="#" className="hover:text-gray-600 transition-colors">
                    About
                  </Link>
                  <Link to="#" className="hover:text-gray-600 transition-colors">
                    Books
                  </Link>
                  <Link to="#" className="hover:text-gray-600 transition-colors">
                    Media
                  </Link>
                  <Link to="#" className="hover:text-gray-600 transition-colors">
                    Articles
                  </Link>
                  <Link to="#" className="hover:text-gray-600 transition-colors">
                    Contact
                  </Link>
                </div>
              </div>
              <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Upendra Namburi. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
