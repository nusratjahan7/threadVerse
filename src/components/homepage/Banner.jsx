'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banner, setBanner] = useState({
    titleLine1: 'NEW',
    titleLine2: 'COLLECTION',
    season: 'Summer',
    year: '2026',
    buttonText: 'Go To Shop',
    buttonLink: '/collections',
    images: [
      {
        src: '/assets/banner1.png',
        name: 'Cotton T Shirt',
        detail: 'Full Sleeve Zipper',
        price: '$ 199',
      },
      {
        src: '/assets/banner2.png',
        name: 'Cotton T Shirt',
        detail: 'Full Sleeve Zipper',
        price: '$ 199',
      },
      {
        src: '/assets/im2.png',
        name: 'Cotton T Shirt',
        detail: 'Full Sleeve Zipper',
        price: '$ 199',
      },
    ],
  });

  //   useEffect(() => {
  //     async function loadBanner() {
  //       try {
  //         const res = await fetch('/api/banner');
  //         if (res.ok) {
  //           const data = await res.json();
  //           if (data && data.images && data.images.length >= 2) {
  //             setBanner(data);
  //           }
  //         }
  //       } catch (err) {
  //         console.error('Error loading banner:', err);
  //       }
  //     }
  //     loadBanner();
  //   }, []);

  const totalImages = banner.images.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const firstImageIndex = currentIndex;
  const secondImageIndex = (currentIndex + 1) % totalImages;

  const firstImage = banner.images[firstImageIndex];
  const secondImage = banner.images[secondImageIndex];

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto">

        {/* ====== DESKTOP / TABLET LAYOUT ====== */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center">

          {/* Left Column: Text & Dynamic Slide Controls */}
          <div className="col-span-5 flex flex-col justify-between h-full space-y-8 pr-6">
            <div>
              <h1 className="text-5xl sm:text-6xl font-black text-zinc-100 tracking-tight leading-[0.9] uppercase">
                {banner.titleLine1} <br />
                {banner.titleLine2}
              </h1>
              <p className="mt-4 text-xs font-medium tracking-widest text-zinc-500 uppercase">
                {banner.season} <br />
                {banner.year}
              </p>
            </div>

            <div className="flex items-center space-x-3 pt-6">
              <Link
                href={banner.buttonLink}
                className="flex items-center justify-between px-6 py-3.5 bg-zinc-800 text-zinc-100 font-medium text-xs tracking-wider uppercase hover:bg-zinc-700 transition-colors w-48"
              >
                <span>{banner.buttonText}</span>
                <FiArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <button
                onClick={handlePrev}
                type="button"
                className="w-11 h-11 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 flex items-center justify-center transition-colors"
                aria-label="Previous Slide"
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                type="button"
                className="w-11 h-11 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 flex items-center justify-center transition-colors"
                aria-label="Next Slide"
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Middle Active Image Slot */}
          <div className="col-span-3 aspect-[4/5] relative bg-zinc-900 overflow-hidden shadow-sm group">
            <Image
              key={firstImage.src}
              src={firstImage.src}
              alt="Collection Showcase 1"
              fill
              sizes="(max-width: 1024px) 100vw, 25vw"
              className="object-cover object-center transition-all duration-500 ease-in-out"
              priority
            />
          </div>

          {/* Right Active Image Slot */}
          <div className="col-span-4 aspect-[4/5] relative bg-zinc-900 overflow-hidden shadow-sm group">
            <Image
              key={secondImage.src}
              src={secondImage.src}
              alt="Collection Showcase 2"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-center transition-all duration-500 ease-in-out"
              priority
            />
          </div>

        </div>

        {/* ===================== MOBILE LAYOUT ===================== */}
        <div className="flex flex-col gap-8 lg:hidden">

          {/* Title & Season */}
          <div>
            <h1 className="text-5xl sm:text-6xl font-black text-zinc-100 tracking-tight leading-[0.9] uppercase">
              {banner.titleLine1} <br />
              {banner.titleLine2}
            </h1>
            <p className="mt-4 text-xs font-medium tracking-widest text-zinc-500 uppercase">
              {banner.season} <br />
              {banner.year}
            </p>
          </div>

          {/* Product Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[firstImage, secondImage].map((image, idx) => (
              <div key={image.src} className="flex flex-col space-y-2">
                <div className="aspect-[4/5] relative bg-zinc-900 overflow-hidden shadow-sm">
                  <Image
                    src={image.src}
                    alt={`Collection Showcase ${idx + 1}`}
                    fill
                    sizes="50vw"
                    className="object-cover object-center transition-all duration-500 ease-in-out"
                    priority
                  />
                </div>
                <div className="text-xs text-zinc-100">
                  <p>{image.name}</p>
                  <p>{image.detail}</p>
                </div>
                <p className="text-xs text-zinc-100">{image.price}</p>
              </div>
            ))}
          </div>

          {/* Full-width Shop Button */}
          <Link
            href={banner.buttonLink}
            className="flex items-center justify-between px-6 py-3.5 bg-zinc-800 text-zinc-100 font-medium text-xs tracking-wider uppercase hover:bg-zinc-700 transition-colors w-full"
          >
            <span>{banner.buttonText}</span>
            <FiArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </div>
    </section>
  );
}