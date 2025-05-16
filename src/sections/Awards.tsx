"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SectionTitle from "@/custom/SectionTitle"
import { awards } from "@/utills/section-data"

const Awards = ({ awardRef }: any) => {
    const [selectedImage, setSelectedImage] = useState(null)

    // Animation variants for sliding in from left
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    }

    return (
        <div className="w-full bg-white">
            <section ref={awardRef} className="py-24 max-w-7xl mx-auto">
                <div className="container mx-auto relative px-6">
                    <SectionTitle text="Milestones and Moments" />

                    <motion.div
                        className="flex flex-wrap justify-between gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {awards.slice(0, 5).map((item, index) => {
                            // Determine size classes based on index
                            // let sizeClass = ""

                            // if (index === 0) {
                            //     // First image is larger
                            //     sizeClass = "w-full md:w-[calc(50%-8px)] h-80"
                            // } else if (index === 4) {
                            //     // Last image is wider (rectangular)
                            //     sizeClass = "w-full md:w-[calc(50%-8px)] h-64"
                            // } else {
                            //     // Other images are medium sized
                            //     sizeClass = "w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] h-64"
                            // }

                            return (
                                <motion.div
                                    key={index}
                                    className="w-full sm:w-[49%] h-64 overflow-hidden rounded-lg cursor-pointer"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                                    onClick={() => setSelectedImage(item)}
                                >
                                    <div className="relative h-full w-full overflow-hidden group">
                                        <img
                                            src={item.url || "/placeholder.svg"}
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                                            <div className="p-4 w-full">
                                                <h3 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                    {item.title}
                                                </h3>
                                                {item.description && (
                                                    <p className="text-white/80 text-sm mt-1 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>

                    {/* Image Modal */}
                    <AnimatePresence>
                        {selectedImage && (
                            <motion.div
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedImage(null)}
                            >
                                <motion.div
                                    className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={selectedImage.url || "/placeholder.svg"}
                                        alt={selectedImage.title}
                                        className="w-full h-full object-contain"
                                    />
                                    <motion.div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                        <h2 className="text-white font-bold text-2xl">{selectedImage.title}</h2>
                                        {selectedImage.description && <p className="text-white/90 mt-2">{selectedImage.description}</p>}
                                    </motion.div>
                                    <button
                                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center"
                                        onClick={() => setSelectedImage(null)}
                                    >
                                        ✕
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    )
}

export default Awards
