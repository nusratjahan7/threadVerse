"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { AiOutlineAlignLeft } from "react-icons/ai";
import {
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiLogOut,
  FiGrid,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "New", href: "/new" },
  ];

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setDropdownOpen(false);
          router.push("/auth/login");
        },
      },
    });
  };

  return (
    <div>
      <nav className="w-full text-zinc-100 border-b border-zinc-800 sticky  top-0 z-50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Mobile Toggle & Desktop Links */}
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="md:hidden text-zinc-300 hover:text-white p-2 rounded-md focus:outline-none"
                aria-label="Toggle Navigation"
              >
                {isOpen ? (
                  <HiOutlineX className="w-6 h-6" />
                ) : (
                  <HiOutlineMenu className="w-6 h-6" />
                )}
              </button>

              <div className="hidden md:flex items-center space-x-8">
                <div>
                  <AiOutlineAlignLeft className="text-2xl" />
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Center: Brand Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <Link href="/" className="flex items-center">
                <div className="w-6 h-6 rotate-45 border-2 border-zinc-100 flex items-center justify-center overflow-hidden">
                  <div className="w-1/2 h-full bg-zinc-100 mr-auto" />
                </div>
              </Link>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-3">
              {isPending ? (
                <div className="w-20 h-8 bg-zinc-800/50 animate-pulse rounded-full" />
              ) : user ? (
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {/* Wishlist Button */}
                  <Link
                    href="/wishlist"
                    className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-200 hover:text-white transition-all"
                    aria-label="Wishlist"
                  >
                    <FiHeart className="w-4 h-4" />
                  </Link>

                  {/* Cart Pill */}
                  <Link
                    href="/cart"
                    className="flex items-center pl-4 pr-1 py-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-full text-xs font-medium text-zinc-200 transition-all space-x-2"
                  >
                    <span>Cart</span>
                    <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-950 flex items-center justify-center shrink-0">
                      <FiShoppingBag className="w-4 h-4" />
                    </div>
                  </Link>

                  {/* User Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-200 hover:text-white transition-all focus:outline-none"
                      aria-label="User Menu"
                    >
                      <FiUser className="w-4 h-4" />
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-3 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl py-2 z-50 text-xs">
                        <div className="px-4 py-2 border-b border-zinc-800">
                          <p className="font-semibold text-zinc-100 truncate">
                            {user.name || "User"}
                          </p>
                          <p className="text-zinc-400 truncate text-[11px]">
                            {user.email}
                          </p>
                        </div>

                        {/* Dynamic Dashboard Route based on Role */}
                        <Link
                          href={
                            user?.role === "admin"
                              ? "/dashboard/admin"
                              : "/dashboard/user"
                          }
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2.5 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                        >
                          <FiGrid className="w-4 h-4 mr-2.5 text-zinc-400" />
                          Dashboard
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2.5 text-red-400 hover:bg-zinc-800 transition-colors text-left"
                        >
                          <FiLogOut className="w-4 h-4 mr-2.5" />
                          Log out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Unauthenticated View */
                <>
                  <Link
                    href="/auth/login"
                    className="text-xs sm:text-sm font-medium px-4 py-2 text-zinc-300 hover:text-white transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="text-xs sm:text-sm font-medium px-5 py-2 rounded-full bg-zinc-100 text-zinc-950 hover:bg-zinc-200 transition-colors duration-200"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden border-t border-zinc-800 bg-zinc-950">
            <div className="px-4 pt-3 pb-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-base font-medium text-zinc-300 hover:text-white transition-colors duration-200 py-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
