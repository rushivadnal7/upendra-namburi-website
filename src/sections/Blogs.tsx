import type React from "react"
import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import SectionTitle from "@/custom/SectionTitle"

interface BlogPost {
    category: string
    title: string
    image: string
    link: string
}

const Blogs: React.FC = ({ blogRef }: any) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current
        if (!scrollContainer) return

        // This helps with touch scrolling on some devices
        const handleTouchStart = (e: TouchEvent) => {
            // Prevent default only if needed
            if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
                e.stopPropagation()
            }
        }

        scrollContainer.addEventListener("touchstart", handleTouchStart, { passive: true })

        return () => {
            scrollContainer.removeEventListener("touchstart", handleTouchStart)
        }
    }, [])

    const blogPosts: BlogPost[] = [
        {
            category: "TECHNOLOGY",
            title: "Sperm Stem Cells Were Used for the First Time in an Attempt to Restore Fertility",
            image: "/Blogs/dummy-blog.png",
            link: "#",
        },
        {
            category: "TECHNOLOGY",
            title: "The Internet Is Turning Into a Data Black Box. An 'Inspectability API' Could Crack It Open",
            image: "/Blogs/dummy-blog.png",
            link: "#",
        },
        {
            category: "TECHNOLOGY",
            title: "Lenovo unveils solar-powered laptop that charges itself",
            image: "/Blogs/dummy-blog.png",
            link: "#",
        },
        {
            category: "TECHNOLOGY",
            title: "Scandinavian design dressed in technology",
            image: "/Blogs/dummy-blog.png",
            link: "#",
        },
        {
            category: "TECHNOLOGY",
            title: "AI-powered solutions for sustainable energy",
            image: "/Blogs/dummy-blog.png",
            link: "#",
        },
        {
            category: "TECHNOLOGY",
            title: "AI-powered solutions for sustainable energy",
            image: "/Blogs/dummy-blog.png",
            link: "#",
        },
        {
            category: "TECHNOLOGY",
            title: "AI-powered solutions for sustainable energy",
            image: "/Blogs/dummy-blog.png",
            link: "#",
        },
    ]

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef
            const scrollAmount = direction === "left" ? -current.offsetWidth * 0.8 : current.offsetWidth * 0.8

            current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            })
        }
    }

    return (
        <section ref={blogRef} className="w-full relative max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-16  h-screen ">
            <div className="flex justify-between items-start  relative ">
                <SectionTitle text="Blogs" />
                <div className="flex gap-2 h-fit">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scroll("left")}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all hover:bg-gray-100"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scroll("right")}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all hover:bg-gray-100"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex gap-6  overflow-x-scroll pb-8 scrollbar-hide snap-x snap-mandatory touch-pan-x"
                style={{
                    scrollbarWidth: "none",
                    // msOverflowStyle: "none",
                    // WebkitOverflowScrolling: "touch",
                }}
            >

                {blogPosts.map((post, index) => (
                    <motion.div
                        key={index}
                        className="min-w-[250px] mx-4 max-w-[250px] snap-start flex-shrink-0" // Added flex-shrink-0
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                    >
                        <div className="flex flex-col h-full">
                            <span className="text-sm font-medium text-gray-500 mb-3">{post.category}</span>
                            <div className="relative  rounded-md mb-4 group">
                                <motion.div whileHover={{ scale: 1.0 }} transition={{ duration: 0.3 }} className="aspect-[4/3]">
                                    <img
                                        src={post.image || "/placeholder.svg"}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-all duration-300"
                                    />
                                </motion.div>
                            </div>
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-semibold pr-4 group-hover:text-gray-700 transition-colors">{post.title}</h3>
                                <motion.a href={post.link} whileHover={{ x: 5 }} className="mt-1 flex-shrink-0">
                                    <ArrowRight className="w-5 h-5" />
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Blogs
