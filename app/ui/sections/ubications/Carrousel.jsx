'use client'

import React, { useCallback, useState  } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import MockImage from '@/public/img/unknown.jpg';


export default function EmblaCarousel({data}) {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop : true}, [Autoplay()])

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <div className="embla">
            <div className='embla__viewport mx-auto mt-12 h-96 w-80 mb-3' ref={emblaRef}>
                <div className="embla__container h-full">
                {data.map((item, index) => (
                        <div
                            key={index}
                            className={`embla__slide flex flex-col items-center justify-center bg-primary-600 relative transition-transform duration-300 ${hoveredIndex === index ? 'scale-105' : 'scale-100'}`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-30' : 'opacity-90'}`}>
                                <Image src={item.imageURL || MockImage} alt={item.place} layout="fill" objectFit="cover" />
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-between p-4 text-white">
                                <h2 className={`font-bold underline underline-offset-4 decoration-2 transition-all duration-300 ${hoveredIndex === index ? 'mt-14' : 'my-auto'}`}>{item.place}</h2>
                                {hoveredIndex === index && (
                                    <>
                                        <p className="text-center my-auto mb-4">{item.place_description}</p>
                                        <Link href={`/home/ubications/${item.id}`}
                                            className="mt-auto border-2 rounded-md text-white py-2 px-16">Ver contenido
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <button className="embla__prev border rounded-full px-3 py-1 mr-2" onClick={scrollPrev}>
                &lt;
            </button>
            <button className="embla__next border rounded-full px-3 py-1 ml-2" onClick={scrollNext}>
                &gt;
            </button>
        </div>
    )
}