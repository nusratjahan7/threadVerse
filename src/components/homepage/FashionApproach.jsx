'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const DEFAULT_DATA = {
  title: 'OUR APPROACH TO FASHION DESIGN',
  description:
    'at elegant vogue , we blend creativity with craftsmanship to create fashion that transcends trends and stands the test of time each design is meticulously crafted, ensuring the highest quality exquisite finish',
  images: [
    '/assets/im1.png',
    '/assets/im2.png',
    '/assets/im3.png',
    '/assets/banner2.png',
  ],
};

export default function FashionApproach() {
  const [data, setData] = useState(DEFAULT_DATA);

  //   useEffect(() => {
  //     async function fetchApproach() {
  //       try {
  //         const res = await fetch('/api/fashion-approach');
  //         if (res.ok) {
  //           const result = await res.json();
  //           if (result && result.title) {
  //             setData(result);
  //           }
  //         }
  //       } catch (err) {
  //         console.error('Error fetching approach section:', err);
  //       }
  //     }
  //     fetchApproach();
  //   }, []);

  return (
    <section className="w-full  text-zinc-100 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Title and Description Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-zinc-100 leading-tight">
            {data.title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light lowercase leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Staggered Responsive Image Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-center pt-8">

          {/* Image 1 */}
          <div className="relative aspect-[3/4] bg-zinc-900 border border-zinc-800 overflow-hidden shadow-lg">
            <Image
              src={data.images[0] || '/assets/approach1.png'}
              alt="Fashion Showcase 1"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Image 2 - Staggered offset down */}
          <div className="relative aspect-[3/4] bg-zinc-900 border border-zinc-800 overflow-hidden shadow-lg lg:translate-y-8">
            <Image
              src={data.images[1] || '/assets/approach2.png'}
              alt="Fashion Showcase 2"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Image 3 - Framed background */}
          <div className="relative aspect-[3/4] bg-zinc-900 border border-zinc-800 overflow-hidden shadow-lg p-2 bg-zinc-900">
            <div className="relative w-full h-full">
              <Image
                src={data.images[2] || '/assets/approach3.png'}
                alt="Fashion Showcase 3"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Image 4 - Staggered offset down */}
          <div className="relative aspect-[3/4] bg-zinc-900 border border-zinc-800 overflow-hidden shadow-lg lg:translate-y-12">
            <Image
              src={data.images[3] || '/assets/approach4.png'}
              alt="Fashion Showcase 4"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center hover:scale-105 transition-transform duration-500"
            />
          </div>

        </div>

      </div>
    </section>
  );
}