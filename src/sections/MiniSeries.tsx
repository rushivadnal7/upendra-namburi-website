import { Button } from '@/components/ui/button'
import SectionTitle from '@/custom/SectionTitle'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'


const MiniSeries = ({ seriesRef }: any) => {
    return (
        <>
            {/* Mini Series Section - Enhanced as Major Achievement */}
            <section ref={seriesRef} className="py-24  text-black max-w-7xl mx-auto">
                <div className="container mx-auto relative px-6">
                    <SectionTitle text='Mini Series'/>

                    {/* <h2 className="media-heading relative section-heading text-4xl md:text-5xl font-bold mb-16 inline-block bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat bg-bottom pb-2">
                        Mini Series
                        <motion.span
                            className="absolute bottom-0 left-0 w-full h-[3px] bg-black"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                    </h2> */}
                    <div className="flex justify-between mx-auto gap-12 items-center">
                        <div className="series-content w-[50%] space-y-6 order-2 md:order-1">
                            <div className="series-badge flex items-center mx-auto  gap-2 w-max bg-white text-black text-sm font-bold px-4 py-2 rounded-full mb-4">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="text-black text-sm uppercase font-medium">Now Streaming</span>
                            </div>
                            <h2 className="series-title text-4xl md:text-6xl font-bold">11th Hour</h2>
                            <p className="series-description text-lg text-gray-800 text-justify">
                                <strong className=' font-semibold'>"11th Hour"</strong> is a high-stakes corporate thriller that unfolds over one electrifying night. Starring
                                Tamannaah Bhatia in a fierce and commanding role, the Telugu web series—streaming on aha—dives into
                                the cutthroat world of power, money, and betrayal.
                            </p>
                            <p className="series-description text-lg text-gray-800 text-justify">
                                Aratrika Reddy, the fearless CEO of Aditya Group, is in the fight of her life. With her company
                                teetering on the edge of financial ruin, she has until sunrise to secure a staggering ₹9,000 crore
                                and silence the wolves circling for her downfall.
                            </p>
                            <p className="series-description text-lg text-gray-800 text-justify">
                                Based on Upendra Namburi's novel "8 Hours," this tense, adrenaline-fueled series keeps you on edge
                                as the clock mercilessly ticks down.
                            </p>
                            <div className="flex gap-4 mt-6">
                                <Link
                                    to="https://www.aha.video/webseries/11th-hour"
                                    target="_blank"
                                    className="flex items-center gap-2 bg-white border  text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    Watch on AHA <ExternalLink size={16} />
                                </Link>
                                <Link
                                    to="https://www.youtube.com/watch?v=NJ1kguc8JV0"
                                    target="_blank"
                                    className="flex items-center gap-2 border border-gray-500 text-black px-6 py-3 rounded-full hover:bg-white/50 transition-colors"
                                >
                                    View Trailer <ExternalLink size={16} />
                                </Link>
                            </div>
                        </div>

                        <div className="series-image-container w-max relative h-[500px] rounded-lg overflow-hidden order-1 md:order-2">
                            <img
                                src="/miniseries/11thhour-series.png"
                                alt="11th Hour"
                                className="object-cover w-[400px] series-image"
                            // sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {/* <div className="series-overlay absolute inset-0 bg-black/50"></div> */}
                            {/* <div className="absolute inset-0 flex items-center justify-center">
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
                            </div> */}
                            {/* <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="text-white text-sm font-medium">Now Streaming</span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MiniSeries