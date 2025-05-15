"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useScroll, useTransform, stagger, useAnimate } from "framer-motion"
import SectionTitle from "@/custom/SectionTitle"

export default function AboutSection({ aboutRef }: any) {
    const contentRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(aboutRef, { once: false, amount: 0.2 })
    const [scope, animate] = useAnimate()
    const [isExpanded, setIsExpanded] = useState(false)


    const { scrollYProgress } = useScroll({
        target: aboutRef,
        offset: ["start end", "end start"],
    })


    const toggleReadMore = () => setIsExpanded(!isExpanded)

    const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])
    const contentOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

    useEffect(() => {
        if (isInView) {
            animate("p", { opacity: 1, y: 0 }, { duration: 0.8, delay: stagger(0.15), ease: [0.25, 0.1, 0.25, 1] })
        }
    }, [isInView, animate])

    useEffect(() => {
        if (isInView && isExpanded) {
            setIsExpanded(false);
        }
    }, [isInView]);


    return (
        <div className="bg-white w-full">
            <section ref={aboutRef} className="py-32  min-h-screen max-w-7xl mx-auto flex items-center relative overflow-hidden">
                {/* Background decorative elements */}
                <motion.div
                    className="absolute -right-20 top-40 w-96 h-96 rounded-full bg-gray-100 opacity-60 blur-3xl"
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    <SectionTitle text={'About Upendra'} />

                    <div className="flex justify-between w-full mx-auto items-center gap-16 ">
                        <motion.div ref={scope} className="about-content space-y-8 w-[50%]" style={{ opacity: contentOpacity }}>
                            {[
                                " <strong>Upendra Namburi</strong> doesn’t pen corporate thrillers—he detonates them. His books are a headrush of ambition, power, and high-stakes mayhem that draw the reader into the cutthroat world of business where deals are made in whispered tones, betrayals happen in real-time, and fortunes are lost in the blink of an eye. If you think business is planning and strategy, think again. In Upendra’s world, it’s a warzone—where only the sharpest, fastest, and most ruthless emerge alive.",

                                "His blockbuster novels—31, 60 Minutes, and 8 Hours—are not just fiction. They're simulations of war. Every page sizzles with tension, every decision is a gamble, and every hero teeters on the brink of collapse. 31 set in 31 days of senior banker, dragging you into the corporate jungle where reputations are currency and one wrong move will bury you. 60 Minutes turns up the craziness, counting down the minutes in a corporate coup that's ruthless as well as relentless. And 8 Hours? It's all about the thrill—one grueling night of ambitions colliding with greed in multi billion dollar stakes.",

                                "Upendra does not write from the sidelines—he’s been in the trenches. He’s an insider who’s been a strategist and business leader and has seen the games that are played at the highest levels and brings authenticity to each twist and turn. His stories are frighteningly real because they are real—bared down, blown up, and served up with a splash of sheer intensity.",


                                "But he's not just a writer. As a columnist and speaker, Upendra cuts through the doublespeak of the corporation to expose the unvarnished, brutal reality about business, leadership, and strategy. His insights don’t just instruct—they provoke, challenge, and reorient the way you think. In fiction or in real-world analysis, he does not do ‘safe’—he does incisive, unflinching, and addictively so.",


                                "If you're looking for smooth landings and easy wins, Upendra Namburi's not the man for you. If you're starved for breakneck stories, ruthless drives, and the thrill that lasts long after the last page, join the ride.",

                            ].map((para, index) => {
                                if (!isExpanded && index >= 2) return null
                                return (
                                    <motion.p
                                        key={index}
                                        className="text-lg text-justify   text-gray-700 leading-relaxed"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        dangerouslySetInnerHTML={{ __html: para }}
                                    >
                                    </motion.p>

                                )
                            })}

                            {isExpanded && (
                                <motion.p
                                    className="text-xl text-gray-700 leading-relaxed opacity-0 -translate-y-4"
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 1.5 }}
                                >
                                    Follow Upendra for fresh books, incisive observations, and the kind of writing that won't let go.
                                    Go to <span className="text-black font-semibold hover:underline cursor-pointer">upendranamburi.com</span> or
                                    search for him on social media—if you're capable of keeping up.
                                </motion.p>
                            )}

                            <button
                                onClick={toggleReadMore}
                                className="text-black font-medium hover:underline mt-4"
                            >
                                {isExpanded ? "Show Less" : "Read More"}
                            </button>
                        </motion.div>


                        <motion.div
                            ref={imageRef}
                            className="about-image-container w-[35%] self-start  relative h-[600px] perspective-1000"
                            style={{ y: imageY }}
                        >

                            <motion.div
                                className="relative w-[100%] h-[550px] rounded-lg shadow-2xl overflow-hidden z-30"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                            >
                                <img src="/pageImages/upendra.png" alt="Upendra Namburi" className="object- w-full h-full" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <motion.div
                                    className="absolute bottom-0 left-0 p-6"
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 1 }}
                                >
                                    <h3 className="text-2xl font-bold mb-2 text-white">Upendra Namburi</h3>
                                    <p className="text-gray-200">Author & Business Strategist</p>
                                </motion.div>
                            </motion.div>


                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
