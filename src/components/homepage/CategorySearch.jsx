'use client';

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function CategorySearch() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['MEN', 'WOMEN', 'KIDS'];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching:', { category: selectedCategory, query: searchQuery });
  };

  return (
    <section className="w-full  text-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-start gap-6">
        
        {/* Category Selection Stack */}
        <div className="flex flex-col space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-left text-sm font-medium tracking-widest transition-colors duration-200 ${
                selectedCategory === category
                  ? 'text-white font-semibold'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar Input */}
        <form onSubmit={handleSearch} className="w-full max-w-sm">
          <div className="relative flex items-center bg-zinc-800 rounded-md overflow-hidden px-4 py-3">
            <FiSearch className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent text-right text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none pl-3"
            />
          </div>
        </form>

      </div>
    </section>
  );
}