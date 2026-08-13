'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiPlus, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const DEFAULT_PRODUCTS = [
  {
    id: '1',
    category: 'V-Neck T-Shirt',
    title: 'Embroidered Seersucker Shirt',
    price: '$99',
    image: '/assets/im1.png',
  },
  {
    id: '2',
    category: 'Cotton T-Shirt',
    colors: '+5',
    title: 'Basic Slim Fit T-Shirt',
    price: '$99',
    image: '/assets/im2.png',
  },
  {
    id: '3',
    category: 'Henley T-Shirt',
    colors: '+3',
    title: 'Blurred Print T-Shirt',
    price: '$99',
    image: '/assets/im3.png',
  },
  {
    id: '4',
    category: 'Crewneck T-Shirt',
    colors: '+2',
    title: 'Full Sleeve Zipper',
    price: '$99',
    image: '/assets/banner1.png',
  },
  {
    id: '5',
    category: 'Relaxed Fit',
    title: 'Graphic Oversized Tee',
    price: '$89',
    image: '/assets/banner2.png',
  },
];

export default function NewThisWeek() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         setLoading(true);
//         const res = await fetch('/api/products/new-this-week');
//         if (!res.ok) throw new Error('Failed to fetch data');
//         const result = await res.json();

//         if (result.success && Array.isArray(result.data) && result.data.length > 0) {
//           setProducts(result.data);
//         }
//       } catch (err) {
//         // Falls back silently to DEFAULT_PRODUCTS if API endpoint fails or doesn't exist
//         setProducts(DEFAULT_PRODUCTS);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProducts();
//   }, []);

  const totalProducts = products.length;

  const handlePrev = () => {
    if (totalProducts === 0) return;
    setStartIndex((prev) => (prev === 0 ? totalProducts - 1 : prev - 1));
  };

  const handleNext = () => {
    if (totalProducts === 0) return;
    setStartIndex((prev) => (prev + 1) % totalProducts);
  };

  const visibleProducts = totalProducts > 0
    ? Array.from({ length: Math.min(4, totalProducts) }).map((_, i) =>
        products[(startIndex + i) % totalProducts]
      )
    : [];

  return (
    <section className="w-full  text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-end justify-between">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none uppercase">
            NEW <br />
            THIS WEEK <span className="text-blue-500 text-lg sm:text-xl font-bold tracking-normal align-top ml-1">({totalProducts})</span>
          </h2>

          <Link
            href="/new-arrivals"
            className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
          >
            See All
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="animate-pulse space-y-3">
                <div className="aspect-[4/5] bg-zinc-900 border border-zinc-800" />
                <div className="h-4 bg-zinc-900 rounded w-2/3" />
                <div className="h-4 bg-zinc-900 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Product Cards Grid */}
        {!loading && visibleProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product, idx) => (
              <div key={`${product.id || idx}-${idx}`} className="group flex flex-col justify-between space-y-3">

                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center">
                  <Image
                    src={product.image || '/assets/placeholder.png'}
                    alt={product.title || 'Product Image'}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Quick Add Button */}
                  <button
                    type="button"
                    aria-label="Quick Add"
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-zinc-950/80 hover:bg-white hover:text-black text-white border border-zinc-700 rounded-none flex items-center justify-center transition-all duration-200"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>

                {/* Info */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2 text-zinc-500 font-medium">
                    <span>{product.category}</span>
                    {product.colors && (
                      <span className="border border-zinc-700 px-1 py-0.2 text-[10px] text-zinc-400 rounded-sm">
                        {product.colors}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start justify-between font-bold text-zinc-100">
                    <p className="truncate pr-2">{product.title}</p>
                    <span>{product.price}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && visibleProducts.length === 0 && (
          <div className="py-12 text-center text-zinc-500 text-sm">
            No products currently available.
          </div>
        )}

        {/* Navigation Arrows */}
        {totalProducts > 0 && (
          <div className="flex items-center justify-center space-x-3 pt-4">
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Previous Slide"
              className="w-10 h-10 border border-zinc-800 hover:border-zinc-600 bg-zinc-900 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              type="button"
              aria-label="Next Slide"
              className="w-10 h-10 border border-zinc-800 hover:border-zinc-600 bg-zinc-900 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}