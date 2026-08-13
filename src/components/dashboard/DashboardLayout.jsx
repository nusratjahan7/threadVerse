'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiHome,
  FiEdit,
  FiUsers,
  FiShoppingBag,
  FiBox,
  FiPlusSquare,
  FiLogOut,
  FiMenu,
  FiX,
} from 'react-icons/fi';

const ADMIN_LINKS = [
  { name: 'Homepage Edit', href: '/dashboard/admin/fashion-approach', icon: FiEdit },
  { name: 'Users', href: '/dashboard/admin/users', icon: FiUsers },
  { name: 'Orders', href: '/dashboard/admin/orders', icon: FiShoppingBag },
  { name: 'Products', href: '/dashboard/admin/products', icon: FiBox },
  { name: 'Add Product', href: '/dashboard/admin/products/add', icon: FiPlusSquare },
];

const USER_LINKS = [
  { name: 'Overview', href: '/dashboard', icon: FiHome },
  { name: 'My Orders', href: '/dashboard/orders', icon: FiShoppingBag },
];

export default function DashboardLayout({ user = { role: 'admin', name: 'Admin User' }, children }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = user?.role === 'admin';
  const navLinks = isAdmin ? ADMIN_LINKS : USER_LINKS;

  return (
    <div className="flex min-h-screen">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 mt-17 z-50 p-2  text-zinc-100 border border-zinc-800 rounded-md shadow-md focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 left-0 z-40 pt-20 h-screen w-64  text-zinc-100 border-r border-zinc-900 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 space-y-8">
          {/* Brand Header */}
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
            <Link href="/" className="text-xl font-black uppercase tracking-wider text-white">
              THREAD<span className="text-zinc-500">VERSE</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              {isAdmin ? 'Admin Panel' : 'User Menu'}
            </div>

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-950 font-bold'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-950' : 'text-zinc-400'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer Profile & Actions */}
        <div className="p-4 border-t border-zinc-900 space-y-3">
          <div className="flex items-center justify-between px-3 py-2 bg-zinc-900/50 rounded-lg border border-zinc-900">
            <div className="truncate">
              <p className="text-xs font-bold text-zinc-200 truncate">{user?.name}</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                {user?.role}
              </p>
            </div>
            {isAdmin && (
              <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase bg-blue-950 text-blue-400 border border-blue-800 rounded">
                Admin
              </span>
            )}
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-red-400 hover:bg-red-950/30 border border-transparent hover:border-red-900/50 rounded-lg transition-colors"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 w-full lg:w-auto">
        {children}
      </main>
    </div>
  );
}