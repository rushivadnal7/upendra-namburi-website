import { motion } from 'framer-motion'
import React from 'react'

interface TextData {
    text : string
}

const SectionTitle = ({text} :TextData) => {
    return (
        <motion.h2
            className="section-heading text-5xl md:text-6xl font-bold mb-24 inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <span className="relative">
                {text}
                <motion.span
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-black"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                />
            </span>
        </motion.h2>)
}

export default SectionTitle