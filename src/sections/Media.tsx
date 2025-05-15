import { Button } from '@/components/ui/button'
import SectionTitle from '@/custom/SectionTitle'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Media = ({ mediaItems, mediaRef }: any) => {
    const [showAll, setShowAll] = useState(false);

    const visibleItems = showAll ? mediaItems : mediaItems.slice(0, 6);
    return (
        <>
            {/* Media Section - More Interactive */}
            <div className='w-full bg-white'>
                <section ref={mediaRef} className="py-24 max-w-7xl mx-auto">
                    <div className="container mx-auto relative px-6">
                        {/* <h2 className="media-heading relative section-heading text-4xl md:text-5xl font-bold mb-16 inline-block bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat bg-bottom pb-2">
                            Media & Interviews
                             <motion.span
                                className="absolute bottom-0 left-0 w-full h-[3px] bg-black"
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                            />
                        </h2> */}
                        <SectionTitle text='Media & Interviews' />


                        <div className=" flex flex-wrap justify-around gap-6 media-container">
                            {visibleItems.map((item: any, index: number) => (
                                <div
                                    key={item.id}
                                    className="media-item h-[]  group relative overflow-hidden rounded-lg shadow-lg cursor-pointer 
                transition duration-500 ease-out 
                animate-fade-slide"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="group h-[70%] relative aspect-video overflow-hidden">
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

                                    <div className='h-max'>
                                        <span className='p-4'>{item.title}</span>
                                        <div className="mt-4 px-4 flex justify-between">

                                            <Link
                                                to={item.ytLink}
                                                target="_blank"
                                                className="inline-flex items-center gap-1 bg-white text-black px-4 py-2 rounded-full text-sm"
                                            >
                                                Watch Now <ExternalLink size={14} />
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <Button
                                variant="outline"
                                className="border-black text-black hover:bg-black hover:text-white rounded-full px-8"
                                onClick={() => {
                                    setShowAll(prev => !prev);
                                    if (showAll && mediaRef?.current) {
                                        mediaRef.current.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            >
                                {showAll ? 'Show Less' : 'View All Media'}
                            </Button>
                        </div>

                    </div>
                </section>
            </div>
        </>
    )
}

export default Media