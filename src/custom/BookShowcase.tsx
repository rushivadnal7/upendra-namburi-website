"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


interface Review {
  text: string
  author: string
}

interface Book {
  id: number
  title: string
  subtitle: string
  cover: string
  summary: string
  reviews?: Review[]
}

interface BookShowcaseProps {
  book: Book
  reversed?: boolean
  lightTheme?: boolean
  enhanced?: boolean
}

export default function BookShowcase({
  book,
  reversed = false,
  lightTheme = false,
  enhanced = false,
}: BookShowcaseProps) {
  const bookRef = useRef<HTMLDivElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])



  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D hover effect for book cover
      if (coverRef.current) {
        const cover = coverRef.current

        const handleMouseMove = (e: MouseEvent) => {
          const rect = cover.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top

          const xPercent = (x / rect.width - 0.5) * 20
          const yPercent = (y / rect.height - 0.5) * 20

          gsap.to(cover, {
            rotationY: xPercent,
            rotationX: -yPercent,
            transformPerspective: 500,
            duration: 0.5,
            ease: "power2.out",
          })
        }

        const handleMouseLeave = () => {
          gsap.to(cover, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: "power2.out",
          })
        }

        cover.addEventListener("mousemove", handleMouseMove)
        cover.addEventListener("mouseleave", handleMouseLeave)

        return () => {
          cover.removeEventListener("mousemove", handleMouseMove)
          cover.removeEventListener("mouseleave", handleMouseLeave)
        }
      }

      // Content animation
      if (contentRef.current) {
        const splitText = new (gsap as any).SplitText(contentRef.current.querySelector("h3"), { type: "chars" })

        gsap.from(splitText.chars, {
          opacity: 0,
          y: 20,
          stagger: 0.02,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            markers: false,
          },
          onComplete: () => {
            // Clean up split text instances after animation completes
            if (splitText.revert) splitText.revert()
          },
        })
      }

      // Enhanced animations for reviews
      if (enhanced && book.reviews) {
        gsap.utils.toArray(".book-review").forEach((review: any, index) => {
          gsap.from(review, {
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: review,
              start: "top 90%",
              toggleActions: "play none none none",
              markers: false,
            },
          })
        })
      }
    }, bookRef)

    return () => ctx.revert()
  }, [book.reviews, enhanced])

  return (
    <div ref={bookRef} className="flex w-7xl px-8   h-screen items-center justify-start gap-8 md:gap-12">
      {reversed ? (
        <>
          <div ref={contentRef} className="space-y-6 w-1/2">
            <h3 className="text-3xl md:text-5xl font-bold">{book.title}</h3>
            <h4 className="text-xl text-gray-500">{book.subtitle}</h4>
            <p className="text-lg text-gray-700">{book.summary}</p>

            {book.reviews && (
              <div className="space-y-4 mt-8">
                <h5 className="text-lg font-semibold">Reviews</h5>
                {book.reviews.map((review, index) => (
                  <div
                    key={index}
                    className={`book-review ${enhanced ? "transform transition-all duration-300 hover:scale-105" : ""} ${lightTheme ? "bg-gray-100" : "bg-zinc-900"} p-6 rounded-lg ${enhanced ? "shadow-lg" : ""}`}
                  >
                    <p className={`italic ${lightTheme ? "text-gray-700" : "text-gray-300"} mb-2 text-sm`}>
                      "{review.text}"
                    </p>
                    <p className="text-sm text-gray-500 font-medium">— {review.author}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4">
              <Button
                className={`${lightTheme ? "bg-black hover:bg-gray-800 text-white" : "bg-amber-500 hover:bg-amber-600 text-black"} ${enhanced ? "rounded-full px-8 py-6 text-lg" : ""}`}
              >
                Read More
              </Button>
            </div>
          </div>

          <div
            ref={coverRef}
            className={`relative h-[600px]  w-1/2 max-w-[400px] mx-auto ${enhanced ? "shadow-2xl shadow-black/20" : "shadow-xl"} transform-style-3d`}
          >
            {enhanced && (
              <div className="absolute -top-4 -left-4 bg-black text-white text-sm px-3 py-1 rounded-full z-10">
                Bestseller
              </div>
            )}
            <div
              className={`absolute inset-0 ${lightTheme ? "bg-gradient-to-br from-gray-200/20 to-gray-500/20" : "bg-gradient-to-br from-amber-500/20 to-purple-500/20"} rounded-lg`}
            ></div>
            <img
              src={book.cover || "/placeholder.svg"}
              alt={book.title}

              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </>
      ) : (
        <>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <div
              ref={coverRef}
              className={`relative h-[500px] w-[400px] max-w-[400px] mx-auto ${enhanced ? "shadow-2xl shadow-black/20" : "shadow-xl"} transform-style-3d`}
            >
              {enhanced && (
                <div className="absolute -top-4 -right-4 bg-black text-white text-sm px-3 py-1 rounded-full z-10">
                  Bestseller
                </div>
              )}
              <div
                className={`absolute inset-0 ${lightTheme ? "bg-gradient-to-br from-gray-200/20 to-gray-500/20" : "bg-gradient-to-br from-amber-500/20 to-purple-500/20"} rounded-lg`}
              ></div>
              <img
                src={book.cover || "/placeholder.svg"}
                alt={book.title}

                className="object-cover h-full w-full rounded-lg"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>

            <div ref={contentRef} className="space-y-4 w-1/2 h-[500px]">
              <h3 className="text-3xl md:text-4xl font-bold">{book.title}</h3>
              <h4 className="text-2xl font-bold text-neutral-600">{book.subtitle}</h4>
              <div dangerouslySetInnerHTML={{ __html: book.summary }} className="text-lg text-left  text-gray-700 line-clamp-[12] " />
              <div className="p">

                <DialogTrigger>
                  <Button
                    className={`${lightTheme ? "bg-black hover:bg-gray-800 text-white" : "bg-amber-500 hover:bg-amber-600 text-black"} ${enhanced ? "rounded-full px-8 py-6 text-lg" : ""}`}
                  >
                    Read More
                  </Button>
                </DialogTrigger>


              </div>
            </div>
            <DialogContent className="bg-white w-max   ">
              <DialogHeader>
                <DialogDescription
                  className="text-lg w-[800px] static"
                  dangerouslySetInnerHTML={{ __html: book.summary }}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  )
}
