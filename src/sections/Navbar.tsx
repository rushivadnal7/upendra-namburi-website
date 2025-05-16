import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import React, { useRef, useState } from 'react'

const Navbar = ({aboutRef , booksRef , upcomingBookRef , miniSeriesRef , mediaRef, blogRef , presentationRef , articlesRef , awardRef}:any) => {
    const [navbarVisible, setNavbarVisible] = useState(true)
    const [smootherInstance, setSmootherInstance] = useState<any>(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const navbarRef = useRef<HTMLElement>(null)
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


    return (
        <>
            {/* Floating Capsule Navbar */}
            <header
                ref={navbarRef}
                className={`fixed top-3 left-1/2 transform -translate-x-1/2 w-6xl max- z-50 px-6 py-3 flex justify-between items-center bg-white/80 backdrop-blur-md rounded-full border border-gray-200 shadow-lg transition-all duration-500 ${navbarVisible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}`}
            >
                <div className="text-xl font-bold tracking-tighter">UN</div>

                <button
                    onClick={toggleMenu}
                    className="lg:hidden text-black z-50 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                <nav
                    className={`fixed lg:relative top-0 right-0 h-screen lg:h-auto w-full lg:w-auto bg-white/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none transform ${menuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
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
                        onClick={() => scrollToSection(upcomingBookRef)}
                        className="nav-link hover:text-gray-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black hover:after:w-full after:transition-all"
                    >
                        Upcoming Books
                    </button>
                    <button
                        onClick={() => scrollToSection(miniSeriesRef)}
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
                        onClick={() => scrollToSection(articlesRef)}
                        className="nav-link hover:text-gray-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black hover:after:w-full after:transition-all"
                    >
                        Articles
                    </button>
                    <button
                        onClick={() => scrollToSection(presentationRef)}
                        className="nav-link hover:text-gray-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black hover:after:w-full after:transition-all"
                    >
                        Presentations
                    </button>
                    <button
                        onClick={() => scrollToSection(blogRef)}
                        className="nav-link hover:text-gray-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black hover:after:w-full after:transition-all"
                    >
                        Blog
                    </button>
                    <button
                        onClick={() => scrollToSection(awardRef)}
                        className="nav-link hover:text-gray-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black hover:after:w-full after:transition-all"
                    >
                        Awards
                    </button>
                    <Button className="bg-black  hover:bg-gray-800 text-white rounded-full px-6">Contact</Button>
                </nav>
            </header>
        </>
    )
}

export default Navbar