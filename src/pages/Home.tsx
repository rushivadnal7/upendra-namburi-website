import { useRef, useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ChevronDown, ExternalLink, Menu, X } from "lucide-react"
import { motion } from 'framer-motion'
import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import BookShowcase from '@/custom/BookShowcase'
import CustomCursor from '@/custom/CustomCursor'
import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import MiniSeries from '@/sections/MiniSeries'
import Footer from '@/sections/Footer'
import UpcomingBooks from '@/sections/UpcomingBooks'
import Media from '@/sections/Media'
import Articles from '@/sections/Articles'
import { articleData, books, mediaItems, presentationItems, upcomingBooks } from '@/utills/section-data'
import Presentations from '@/sections/Presentations'
import Blogs from '@/sections/Blogs'
import Navbar from '@/sections/Navbar'
import SectionTitle from '@/custom/SectionTitle'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)




const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const smootherRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const mainRef = useRef<HTMLDivElement>(null)
    const navbarRef = useRef<HTMLElement>(null)
    const heroRef = useRef<HTMLDivElement>(null)
    const aboutRef = useRef<HTMLDivElement>(null)
    const mediaRef = useRef<HTMLDivElement>(null)
    const booksRef = useRef<HTMLDivElement>(null)
    const booksSectionRef = useRef<HTMLDivElement>(null)
    const upcomingRef = useRef<HTMLDivElement>(null)
    const seriesRef = useRef<HTMLDivElement>(null)
    const presentationRef = useRef<HTMLDivElement>(null)
    const blogRef = useRef<HTMLDivElement>(null)
    const galleryRef = useRef<HTMLDivElement>(null)
    const articlesRef = useRef<HTMLDivElement>(null)
    const horizontalRef = useRef<HTMLDivElement>(null)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [navbarVisible, setNavbarVisible] = useState(true)
    const [smootherInstance, setSmootherInstance] = useState<any>(null)


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
            //   if (document.querySelector(".hero-title")) {
            //     const heroTitle = new SplitText(".hero-title", { type: "chars, words" })
            //     const heroSubtitle = new SplitText(".hero-subtitle", { type: "lines" })
            //     const heroName = new SplitText(".hero-name", { type: "chars" })

            //     const heroTl = gsap.timeline({
            //       onComplete: () => {
            //         // Clean up split text instances after animation completes
            //         if (heroTitle.revert) heroTitle.revert()
            //         if (heroSubtitle.revert) heroSubtitle.revert()
            //         if (heroName.revert) heroName.revert()
            //       },
            //     })

            //     heroTl
            //       .from(heroName.chars, {
            //         opacity: 0,
            //         y: 50,
            //         rotationX: -90,
            //         stagger: 0.02, // Reduced stagger time
            //         duration: 0.8,
            //         ease: "power4.out",
            //       })
            //       .from(
            //         heroTitle.chars,
            //         {
            //           opacity: 0,
            //           y: 30,
            //           rotationX: -90,
            //           stagger: 0.01, // Reduced stagger time
            //           duration: 0.6,
            //           ease: "power4.out",
            //         },
            //         "-=0.4", // Reduced overlap
            //       )
            //       .from(
            //         heroSubtitle.lines,
            //         {
            //           opacity: 0,
            //           y: 20,
            //           stagger: 0.08,
            //           duration: 0.6,
            //           ease: "power3.out",
            //         },
            //         "-=0.2", // Reduced overlap
            //       )
            //       .from(
            //         ".hero-cta",
            //         {
            //           opacity: 0,
            //           y: 20,
            //           duration: 0.6,
            //           ease: "power3.out",
            //         },
            //         "-=0.2", // Reduced overlap
            //       )
            //   }

            //   // About section pin and reveal - optimized
            //   if (aboutRef.current) {
            //     ScrollTrigger.create({
            //       trigger: aboutRef.current,
            //       start: "top top",
            //       end: "+=100%",
            //       pin: true,
            //       pinSpacing: true,
            //       anticipatePin: 1, // Improve pin performance
            //       fastScrollEnd: true, // Improve performance on fast scrolling
            //     })

            //     const aboutTl = gsap.timeline({
            //       scrollTrigger: {
            //         trigger: aboutRef.current,
            //         start: "top center",
            //         end: "bottom center",
            //         scrub: 0.5,
            //       },
            //     })

            //     aboutTl
            //       .from(".about-image", {
            //         y: 50, // Reduced movement
            //         opacity: 0,
            //         duration: 0.8,
            //       })
            //       .from(
            //         ".about-content p",
            //         {
            //           y: 30, // Reduced movement
            //           opacity: 0,
            //           stagger: 0.1, // Reduced stagger
            //           duration: 0.8,
            //         },
            //         "-=0.4", // Reduced overlap
            //       )
            //   }

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
                        // markers: isDevEnvironment,
                        markers: false,
                    },
                })
            }

            // Book reviews animation - optimized
            //   gsap.utils.toArray(".book-review").forEach((review: any) => {
            //     gsap.from(review, {
            //       y: 30, // Reduced movement
            //       opacity: 0,
            //       duration: 0.6,
            //       stagger: 0.1, // Reduced stagger
            //       scrollTrigger: {
            //         trigger: review,
            //         start: "top 85%",
            //         toggleActions: "play none none none",
            //         fastScrollEnd: true, // Improve performance on fast scrolling
            //       },
            //     })
            //   })

            //   // 11th Hour section special animation - optimized
            //   if (seriesRef.current) {
            //     const seriesTl = gsap.timeline({
            //       scrollTrigger: {
            //         trigger: seriesRef.current,
            //         start: "top bottom",
            //         end: "bottom top",
            //         scrub: true,
            //         fastScrollEnd: true, // Improve performance on fast scrolling
            //       },
            //     })

            //     seriesTl
            //       .fromTo(
            //         ".series-image",
            //         {
            //           y: -30, // Reduced movement
            //           scale: 0.95,
            //         },
            //         {
            //           y: 30, // Reduced movement
            //           scale: 1,
            //           ease: "none",
            //         },
            //       )
            //       .fromTo(
            //         ".series-overlay",
            //         {
            //           opacity: 0.3,
            //         },
            //         {
            //           opacity: 0.7,
            //           ease: "none",
            //         },
            //         0,
            //       )
            //   }

            //   // Series content animation - optimized
            //   const seriesContentTl = gsap.timeline({
            //     scrollTrigger: {
            //       trigger: ".series-content",
            //       start: "top 80%",
            //       toggleActions: "play none none none",
            //       fastScrollEnd: true, // Improve performance on fast scrolling
            //     },
            //   })

            //   seriesContentTl
            //     .from(".series-badge", {
            //       scale: 0,
            //       opacity: 0,
            //       duration: 0.5, // Reduced duration
            //       ease: "back.out(1.5)", // Reduced intensity
            //     })
            //     .from(
            //       ".series-title",
            //       {
            //         y: 20, // Reduced movement
            //         opacity: 0,
            //         duration: 0.5, // Reduced duration
            //       },
            //       "-=0.2", // Reduced overlap
            //     )
            //     .from(
            //       ".series-description",
            //       {
            //         y: 20, // Reduced movement
            //         opacity: 0,
            //         stagger: 0.1, // Reduced stagger
            //         duration: 0.5, // Reduced duration
            //       },
            //       "-=0.2", // Reduced overlap
            //     )

            //   // Media section interactive grid - optimized
            //   if (mediaRef.current) {
            //     const mediaTl = gsap.timeline({
            //       scrollTrigger: {
            //         trigger: mediaRef.current,
            //         start: "top 80%",
            //         fastScrollEnd: true, // Improve performance on fast scrolling
            //       },
            //     })

            //     mediaTl
            //       .from(".media-heading", {
            //         y: 30, // Reduced movement
            //         opacity: 0,
            //         duration: 0.6, // Reduced duration
            //       })
            //       .from(
            //         ".media-item",
            //         {
            //           y: 50, // Reduced movement
            //           opacity: 0,
            //           duration: 0.6, // Reduced duration
            //           stagger: 0.08, // Reduced stagger
            //           ease: "power3.out",
            //         },
            //         "-=0.3", // Reduced overlap
            //       )
            //   }

            //   // Gallery section animation - optimized
            //   if (galleryRef.current) {
            //     const galleryTl = gsap.timeline({
            //       scrollTrigger: {
            //         trigger: galleryRef.current,
            //         start: "top 80%",
            //         fastScrollEnd: true, // Improve performance on fast scrolling
            //       },
            //     })

            //     galleryTl.from(".gallery-item", {
            //       y: 30, // Reduced movement
            //       opacity: 0,
            //       duration: 0.5, // Reduced duration
            //       stagger: 0.03, // Reduced stagger
            //       ease: "power2.out",
            //     })
            //   }

            //   // Media hover effects - optimized with delegation
            //   const mediaContainer = document.querySelector(".media-container")
            //   if (mediaContainer) {
            //     mediaContainer.addEventListener(
            //       "mouseenter",
            //       (e) => {
            //         const target = e.target as HTMLElement
            //         const mediaItem = target.closest(".media-item")
            //         if (mediaItem) {
            //           const overlay = mediaItem.querySelector(".media-overlay")
            //           const content = mediaItem.querySelector(".media-content")

            //           if (overlay) {
            //             gsap.to(overlay, {
            //               opacity: 0.8,
            //               duration: 0.3,
            //             })
            //           }

            //           if (content) {
            //             gsap.to(content, {
            //               y: 0,
            //               opacity: 1,
            //               duration: 0.3,
            //             })
            //           }
            //         }
            //       },
            //       { capture: true },
            //     )

            //     mediaContainer.addEventListener(
            //       "mouseleave",
            //       (e) => {
            //         const target = e.target as HTMLElement
            //         const mediaItem = target.closest(".media-item")
            //         if (mediaItem) {
            //           const overlay = mediaItem.querySelector(".media-overlay")
            //           const content = mediaItem.querySelector(".media-content")

            //           if (overlay) {
            //             gsap.to(overlay, {
            //               opacity: 0,
            //               duration: 0.3,
            //             })
            //           }

            //           if (content) {
            //             gsap.to(content, {
            //               y: 20,
            //               opacity: 0,
            //               duration: 0.3,
            //             })
            //           }
            //         }
            //       },
            //       { capture: true },
            //     )
            //   }

            //   // Articles section 3D rotation - optimized
            //   const articleItems = gsap.utils.toArray(".article-item")
            //   articleItems.forEach((item: any, index: number) => {
            //     // Alternate direction for better visual effect and performance
            //     const rotationDirection = index % 2 === 0 ? 1 : -1

            //     const articleTl = gsap.timeline({
            //       scrollTrigger: {
            //         trigger: item,
            //         start: "top bottom",
            //         end: "bottom top",
            //         scrub: 1,
            //         fastScrollEnd: true, // Improve performance on fast scrolling
            //       },
            //     })

            //     articleTl.fromTo(
            //       item,
            //       {
            //         rotationY: 5 * rotationDirection, // Reduced rotation
            //         transformPerspective: 1000,
            //       },
            //       {
            //         rotationY: -5 * rotationDirection, // Reduced rotation
            //         ease: "none",
            //       },
            //     )
            //   })

            //   // Contact form animation - optimized
            //   const contactTl = gsap.timeline({
            //     scrollTrigger: {
            //       trigger: ".contact-form",
            //       start: "top 80%",
            //       fastScrollEnd: true, // Improve performance on fast scrolling
            //     },
            //   })

            //   contactTl
            //     .from(".contact-form", {
            //       y: 50, // Reduced movement
            //       opacity: 0,
            //       duration: 0.8,
            //       ease: "power3.out",
            //     })
            //     .from(
            //       ".form-field",
            //       {
            //         y: 20, // Reduced movement
            //         opacity: 0,
            //         stagger: 0.08, // Reduced stagger
            //         duration: 0.5, // Reduced duration
            //         ease: "power3.out",
            //       },
            //       "-=0.4", // Reduced overlap
            //     )

            //   // Section headings reveal animation - optimized
            //   gsap.utils.toArray(".section-heading").forEach((heading: any) => {
            //     const headingTl = gsap.timeline({
            //       scrollTrigger: {
            //         trigger: heading,
            //         start: "top 80%",
            //         end: "top 20%",
            //         scrub: 0.5,
            //         fastScrollEnd: true, // Improve performance on fast scrolling
            //       },
            //     })

            //     headingTl
            //       .from(heading, {
            //         y: 30, // Reduced movement
            //         opacity: 0,
            //         duration: 0.8,
            //       })
            //       .to(
            //         heading,
            //         {
            //           backgroundSize: "100% 2px",
            //           duration: 0.8,
            //         },
            //         "-=0.4", // Reduced overlap
            //       )
            //   })
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



    return (
        <>
            <div ref={mainRef} className="relative text-black  w- ">
                <CustomCursor />
                {/* Smooth scrolling wrapper */}
                {/* <div ref={smootherRef} className="smooth-wrapper">
                    <div ref={contentRef} className="smooth-content"> */}


                <Navbar mediaRef={mediaRef} articlesRef={articlesRef} aboutRef={aboutRef} booksRef={booksRef} miniSeriesRef={seriesRef} presentationRef={presentationRef} blogRef={blogRef} upcomingBookRef={upcomingRef} />

                {/* HERO SECTION */}
                <HeroSection booksRef={booksRef} mediaRef={mediaRef} />

                {/* About Section - Pinned */}
                <AboutSection aboutRef={aboutRef} />

                {/* Books Section - Enhanced with Emphasis */}
                <section ref={booksRef} id='books' className="py-32 max-w-7xl mx-auto ">
                    <div className="container relative  mx-auto px-6 mb-0">
                        <SectionTitle text={'Published Books'} />

                        <div className="mb-12 max-w-3xl mx-auto">
                            <p className="text-xl text-gray-700 italic">
                                "Upendra Namburi's corporate thrillers are masterclasses in tension, ambition, and the cutthroat world
                                of high-stakes business."
                            </p>
                            <p className="text-right text-gray-500 mt-2">— Financial Times</p>
                        </div>
                    </div>

                    <div ref={booksSectionRef} className="relative  ">
                        <div ref={horizontalRef} className="overflow-hidden flex items-center h-full">
                            <div className="flex items-center  books-container" style={{ width: `${books.length * 100}vw` }}>
                                {books.map((book) => (
                                    <div key={book.id} className="book-item  w-screen h-screen px-6 md:px-12 lg:px-0 flex items-center">
                                        <BookShowcase book={book} lightTheme={true} enhanced={true} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <UpcomingBooks upcomingRef={upcomingRef} upcomingBooks={upcomingBooks} />

                <MiniSeries seriesRef={seriesRef} />

                <Media mediaItems={mediaItems} mediaRef={mediaRef} />

                <Articles articlesRef={articlesRef} articleData={articleData} />

                <Presentations presentationItems={presentationItems} presentationRef={presentationRef} />


                <Blogs blogRef={blogRef} />
                <Footer />
            </div>
            {/* </div>
            </div> */}
        </>
    )
}

export default Home