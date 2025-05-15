"use client"

import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function HeroSection({ booksRef, mediaRef }: any) {
    const targetRef = React.useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, 300])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <div className="bg-[var(--bg-color)] w-full">
            <section
                ref={targetRef}
                className="mt-[rem] max-w-7xl h-screen mx-auto flex justify-center items-center relative overflow-hidden"
            >
                {/* Background decorative elements */}
                <motion.div
                    className="absolute -left-20 top-40 w-96 h-96 rounded-full bg-gray-100 opacity-40 blur-3xl"
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                />

                {/* LEFT CONTAINER */}
                <motion.div
                    className="w-1/2 mx-auto px-6 relative z-10"
                    style={{ opacity }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h1
                        className="hero-name text-7xl md:text-8xl font-bold mb-4 leading-none tracking-tighter bg-clip-text text-transparent dark:text-transparent animate-bg-shine bg-[length:250%_100%] duration-[2200ms]
          dark:bg-[linear-gradient(110deg,#D4D4D8,45%,#27272A,55%,#D4D4D8)] 
          bg-[linear-gradient(110deg,#09090B,45%,#fff,55%,#09090B)]"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        Upendra Namburi
                    </motion.h1>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ duration: 1.2, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
                        className="h-[3px] bg-black mb-6"
                    />

                    <motion.h2
                        className="hero-title text-3xl md:text-3xl font-bold mb-6 leading-tight text-black"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Disruptor. Builder. Strategist.
                    </motion.h2>

                    <motion.p
                        className="hero-subtitle text-xl md:text-lg max-w-2xl mb-8 text-gray-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Upendra Namburi doesn't pen corporate thrillers—he detonates them. His books are a headrush of ambition,
                        power, and high-stakes mayhem.
                    </motion.p>

                    <motion.div
                        className="hero-cta flex flex-wrap gap-4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                    >
                        <Button onClick={() => {
                            booksRef?.current?.scrollIntoView({ behavior: "smooth" })
                        }} className="bg-black hover:bg-gray-800 text-white text-lg py-6 px-8 rounded-full">
                            Explore Books
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                mediaRef?.current?.scrollIntoView({ behavior: "smooth" })
                            }}
                            className="border-black hover:bg-black/10 text-black text-lg py-6 px-8 rounded-full"
                        >
                            Watch Interviews
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Right Container with stacked books effect */}
                <motion.div
                    className="h-full w-1/2 container flex justify-center items-center relative perspective-1000"
                    style={{ y }}
                >
                    {/* Stacked book cards */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[400px] rounded-md shadow-xl bg-gray-800 rotate-[-8deg] z-10"
                        initial={{ opacity: 0, rotate: -12, x: "-40%" }}
                        animate={{ opacity: 0.6, rotate: -8, x: "-40%" }}
                        transition={{ duration: 1, delay: 0.2 }}
                        whileHover={{ rotate: -6, transition: { duration: 0.3 } }}
                    >

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                            {/* <h4 className="text-lg font-bold">31</h4>
                        <p className="text-sm">The Corporate Thriller</p> */}
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[400px] rounded-md shadow-xl bg-gray-700 rotate-[-4deg] z-20"
                        initial={{ opacity: 0, rotate: -8, x: "-30%" }}
                        animate={{ opacity: 0.7, rotate: -4, x: "-30%" }}
                        transition={{ duration: 1, delay: 0.4 }}
                        whileHover={{ rotate: -2, transition: { duration: 0.3 } }}
                    >

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                            {/* <h4 className="text-lg font-bold">60 Minutes</h4>
                        <p className="text-sm">Every Second Counts</p> */}
                        </div>
                    </motion.div>

                    {/* Main hero image */}
                    <motion.div
                        className="relative w-[350px] h-[500px] rounded-lg shadow-2xl overflow-hidden z-40"
                        initial={{ opacity: 0, y: 20, x: "5%" }}
                        animate={{ opacity: 1, y: 0, x: "5%" }}
                        transition={{ duration: 1, delay: 0.8 }}
                        whileHover={{
                            scale: 1.03,
                            transition: { duration: 0.3 },
                        }}
                    >
                        <img src="/pageImages/hero-bg-img.png" alt="Upendra Namburi" className="h-full w-full  " />
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                        />
                    </motion.div>

                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[400px] rounded-md shadow-xl bg-gray-600 rotate-[4deg] z-20"
                        initial={{ opacity: 0, rotate: 8, x: "30%" }}
                        animate={{ opacity: 0.7, rotate: 4, x: "30%" }}
                        transition={{ duration: 1, delay: 0.4 }}
                        whileHover={{ rotate: 2, transition: { duration: 0.3 } }}
                    >

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                            {/* <h4 className="text-lg font-bold">Coming Soon</h4>
                        <p className="text-sm">The Next Thriller</p> */}
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[400px] rounded-md shadow-xl bg-gray-600 rotate-[8deg] z-10"
                        initial={{ opacity: 0, rotate: 12, x: "40%" }}
                        animate={{ opacity: 0.6, rotate: 8, x: "40%" }}
                        transition={{ duration: 1, delay: 0.6 }}
                        whileHover={{ rotate: 6, transition: { duration: 0.3 } }}
                    >

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    )
}
