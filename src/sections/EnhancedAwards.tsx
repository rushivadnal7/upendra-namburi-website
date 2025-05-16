"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SectionTitle from "@/custom/SectionTitle"
import { awards } from "@/utills/section-data"
import MasonryLayout from "./MasonryLayout"

const EnhancedAwards = ({ awardRef }:any) => {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className="w-full bg-white">
      <section ref={awardRef} className="py-24 max-w-7xl mx-auto">
        <div className="container mx-auto relative px-6">
          <SectionTitle text="Milestones and Moments" />

          <MasonryLayout columnCount={3} gap={16} key="masonry-layout">
            {awards.map((item, index) => (
              <motion.div
                key={index}
                className="mb-4 overflow-hidden rounded-lg cursor-pointer"
                whileHover={{ scale: 1.02 }}
                layoutId={`award-${index}`}
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative group">
                  <img
                    src={item.url || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                  <motion.div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-white font-bold text-lg">{item.title}</h3>
                      {item.description && <p className="text-white/80 text-sm mt-1">{item.description}</p>}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </MasonryLayout>

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
                  layoutId={`award-${awards.indexOf(selectedImage)}`}
                  className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg"
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

export default EnhancedAwards
