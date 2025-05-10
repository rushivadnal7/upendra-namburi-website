import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Presentations = ({ presentationItems, presentationRef }: any) => {
    const [showAll, setShowAll] = useState(false);

    const visibleItems = showAll ? presentationItems : presentationItems.slice(0, 3);
    return (
        <>
            {/* Media Section - More Interactive */}
            <div className='w-full bg-white'>
                <section ref={presentationRef} className="py-24 max-w-7xl mx-auto">
                    <div className="container mx-auto px-6">
                        <h2 className="media-heading section-heading text-4xl md:text-5xl font-bold mb-16 inline-block bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat bg-bottom pb-2">
                            Presentations
                        </h2>

                        <div className="mt-16 grid md:grid-cols-3 gap-6 media-container">
                            {visibleItems.map((item: any, index: number) => (
                                <div
                                    key={item.id}
                                    className="media-item group relative overflow-hidden rounded-lg shadow-lg cursor-pointer 
                transition duration-500 ease-out 
                animate-fade-slide"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="group relative aspect-video overflow-hidden">
                                        <img
                                            src={item.thumbnail || "/placeholder.svg"}
                                            alt={item.title}
                                            className="object-cover z-0 transition-transform duration-500 w-full group-hover:scale-105"
                                        />
                                        {/* <video className="object-cover z-0 transition-transform duration-500 w-full group-hover:scale-105" src="https://www.youtube.com/watch?v=JNEGiUn05HI&pp=ygUPdXBlbmRyYSBuYW1idXJp" />
 */}


                                        <div className="absolute inset-0 bg-gradient-to-t group-hover:bg-gradient-to-t from-black/60 group-hover:from-black/100 to-transparent"></div>

                                        <div className="media-overlay z-50 absolute inset-0 bg-black/0 transition-opacity duration-300"></div>

                                        <div className="media-content z-50 absolute inset-0 flex flex-col justify-end p-6 
        opacity-0 translate-y-20 transition-all duration-300 
        group-hover:opacity-100 group-hover:translate-y-0">
                                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                            <p className="text-white/80 text-sm">{item.description}</p>
                                            <div className="mt-4">
                                                <Link
                                                    to={item.url}
                                                    target="_blank"
                                                    className="inline-flex items-center gap-1 bg-white text-black px-4 py-2 rounded-full text-sm"
                                                >
                                                    Watch Now <ExternalLink size={14} />
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                                            Video
                                        </div>

                                        <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                                            <div className="w-16 h-16 rounded-full bg-black/70 flex items-center justify-center">
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
                                                    className="text-white ml-1"
                                                >
                                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
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