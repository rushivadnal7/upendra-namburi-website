import { Button } from '@/components/ui/button'
import SectionTitle from '@/custom/SectionTitle'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Presentations = ({ presentationItems, presentationRef }: any) => {
    const [showAll, setShowAll] = useState(false);
    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            filter: "blur(10px)",
        },
        show: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const visibleItems = showAll ? presentationItems : presentationItems.slice(0, 3);
    return (
        <>
            {/* Media Section - More Interactive */}
            <div className='w-full bg-white min-h-screen flex justify-center items-center'>
                <section ref={presentationRef} className="py-24 max-w-7xl mx-auto">
                    <div className="container mx-auto relative px-6">
                        <SectionTitle text='Presentations' />


                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.2 }}
                            className="flex flex-col md:flex-row flex-wrap justify-around gap-10 media-container"
                        >
                            {visibleItems.map((item: any, index: number) => (
                                <motion.div
                                    variants={itemVariants}
                                    key={item.id}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: false, amount: 0.2 }}
                                    className="media-item h-[300px] md:h-[350px] w-[350px]  group relative overflow-hidden rounded-lg shadow-lg cursor-pointer 
                                        transition duration-500 ease-out 
                                        animate-fade-slide"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="group h-[60%] w-full relative aspect-video overflow-hidden">
                                        <iframe
                                            className="object-cover h-full z-0 transition-transform duration-500 w-full "
                                            src={item.url}
                                            title="YouTube video"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />

                                        <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                                            Video
                                        </div>
                                    </div>

                                    <div className='h-[40%] flex p-2 py-3 flex-col justify-between'>
                                        <span className='text-lg  font-semibold line-clamp-2'>{item.title}</span>
                                        <div className="mt-4   flex justify-between items-center">
                                            <span className='w-max '>{item.date}</span>
                                            <Link
                                                to={item.ytLink}
                                                target="_blank"
                                                className="inline-flex bg-black items-center gap-1 hover:border-black hover:zoom-out-95 transition-all hover:bg-white hover:text-black   text-white px-4 py-2 rounded-full text-sm"
                                            >
                                                Watch Now <ExternalLink size={14} />
                                            </Link>
                                        </div>
                                    </div>

                                </motion.div>
                            ))}
                        </motion.div>

                        {
                            visibleItems > 3 && (
                                <div className="mt-12 text-center">
                                    <Button
                                        variant="outline"
                                        className="border-black text-black hover:bg-black hover:text-white rounded-full px-8"
                                        onClick={() => {
                                            setShowAll(prev => !prev);
                                            if (showAll && presentationRef?.current) {
                                                presentationRef.current.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }}
                                    >
                                        {showAll ? 'Show Less' : 'View All Media'}
                                    </Button>
                                </div>
                            )
                        }

                    </div>
                </section>
            </div>
        </>
    )
}

export default Presentations