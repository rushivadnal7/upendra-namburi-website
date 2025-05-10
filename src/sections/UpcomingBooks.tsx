import { Button } from '@/components/ui/button'
import React from 'react'

const UpcomingBooks = ({ upcomingRef, upcomingBooks }: any) => {
    return (
        <>
            {/* Upcoming Books Section */}
            <div className='bg-white w-full'>
                <section className="py-24 max-w-7xl mx-auto text-black">
                    <div className="container mx-auto px-6">
                        <h2 className="section-heading text-4xl md:text-5xl font-bold mb-16 inline-block bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat bg-bottom pb-2">
                            Upcoming Books
                        </h2>

                        <div className="mt-16 mb-10 flex justify-between items-center gap-12">
                            {upcomingBooks.map((book: any, index: any) => (
                                <div
                                    key={book.id}
                                    className="bg-gray-50 w-[50%] rounded-lg overflow-hidden group hover:scale-[1.02] transition-transform duration-300 shadow-xl"
                                // data-speed={index % 2 === 0 ? "0.8" : "1.2"}
                                >
                                    <div className="relative h-[300px]">
                                        <img
                                            src={book.cover || "/placeholder.svg"}
                                            alt={book.title}
                                            className="object-cover w-full absolute h-full z-0"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="absolute top-4 left-4 z-40  bg-black text-white text-sm px-3 py-1 rounded-full">
                                            Coming Soon
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold mb-3">{book.title}</h3>
                                        <p className="text-gray-700">{book.summary}</p>
                                        <div className="mt-6">
                                            <Button
                                                variant="outline"
                                                className="border-black text-black hover:bg-black hover:text-white rounded-full"
                                            >
                                                Learn More
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default UpcomingBooks