"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface GalleryImage {
  id: number
  src: string
  alt: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const navigateImage = (direction: "next" | "prev") => {
    if (!selectedImage) return

    const currentIndex = images.findIndex((img) => img.id === selectedImage.id)
    let newIndex

    if (direction === "next") {
      newIndex = (currentIndex + 1) % images.length
    } else {
      newIndex = (currentIndex - 1 + images.length) % images.length
    }

    setSelectedImage(images[newIndex])
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowRight") navigateImage("next")
    if (e.key === "ArrowLeft") navigateImage("prev")
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`gallery-item cursor-pointer overflow-hidden rounded-lg ${
              index === 0 ? "col-span-2 row-span-2" : ""
            }`}
            onClick={() => openLightbox(image)}
          >
            <div className="relative aspect-square group">
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                  <span className="sr-only">View image</span>
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
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              navigateImage("prev")
            }}
          >
            <ChevronLeft size={48} />
          </button>

          <div className="relative w-[80vw] h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.alt}
              className="object-contain"
              sizes="80vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
              <p>{selectedImage.alt}</p>
            </div>
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              navigateImage("next")
            }}
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </>
  )
}
