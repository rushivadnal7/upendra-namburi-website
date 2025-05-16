"use client"

import React, { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"

const MasonryLayout = ({ children, columnCount = 3, gap = 16 }:any) => {
  const containerRef = useRef(null)
  const itemsRef = useRef([])
  const controls = useAnimation()

  useEffect(() => {
    if (!containerRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      organizeItems()
    })

    resizeObserver.observe(containerRef.current)

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    organizeItems()
    controls.start("visible")
  }, [children])

  const organizeItems = () => {
    if (!containerRef.current || itemsRef.current.length === 0) return

    const containerWidth = containerRef.current.offsetWidth
    const columnWidth = (containerWidth - gap * (columnCount - 1)) / columnCount

    const columns = Array(columnCount).fill(0)
    let allItemsHaveHeight = true

    // First check if all items have loaded and have a height
    itemsRef.current.forEach((item) => {
      if (!item || item.offsetHeight === 0) {
        allItemsHaveHeight = false
      }
    })

    // If not all items have height, wait for images to load
    if (!allItemsHaveHeight) {
      // Set a minimum height for the container while loading
      containerRef.current.style.height = `${500}px`

      // Wait a bit and try again
      setTimeout(organizeItems, 100)
      return
    }

    // Now position all items
    itemsRef.current.forEach((item, index) => {
      if (!item) return

      // Find the column with the smallest height
      const minColumnIndex = columns.indexOf(Math.min(...columns))

      // Position the item
      const x = minColumnIndex * (columnWidth + gap)
      const y = columns[minColumnIndex]

      item.style.transform = `translate(${x}px, ${y}px)`
      item.style.width = `${columnWidth}px`

      // Update the column height
      columns[minColumnIndex] += item.offsetHeight + gap
    })

    // Set the container height to the height of the tallest column
    containerRef.current.style.height = `${Math.max(...columns) - gap}px`
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05 },
        },
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          ref={(el) => (itemsRef.current[index] = el)}
          className="absolute top-0 left-0"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 },
            },
          }}
          style={{ width: "100%" }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default MasonryLayout
