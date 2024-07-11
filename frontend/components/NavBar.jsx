"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link href="/" legacyBehavior>
            <a>AutoGuardian</a>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        {/* desktop nav list */}
        <div className={`hidden lg:flex`}>
          <Link href="/" legacyBehavior>
            <a className="block mt-4 lg:inline-block lg:mt-2 text-white mr-8">
              Home
            </a>
          </Link>
          <Link href="/#about" legacyBehavior>
            <a className="block mt-4 lg:inline-block lg:mt-2 text-white mr-8">
              About
            </a>
          </Link>
          <Link href="/#services" legacyBehavior>
            <a className="block mt-4 lg:inline-block lg:mt-2 text-white mr-8">
              Services
            </a>
          </Link>
          <Link href="/#contact" legacyBehavior>
            <a className="block mt-4 lg:inline-block lg:mt-2 text-white mr-8">
              Contact Us
            </a>
          </Link>
          <Link
            href="/api/auth/login"
            legacyBehavior
            className={`${user ? "hidden" : "block"}`}
          >
            <button
              className={`${
                user ? "hidden" : "block"
              } bg-white text-blue-600 py-2 px-4 rounded mr-4`}
            >
              Login/Register
            </button>
          </Link>
          <Link
            href="/dashboard"
            legacyBehavior
            className={`${user ? "block" : "hidden"}`}
          >
            <button
              className={`${
                user ? "block" : "hidden"
              } bg-white text-blue-600 py-2 px-4 rounded mr-4`}
            >
              Dashboard
            </button>
          </Link>
          <Link
            href="/profile"
            legacyBehavior
            className={`${user ? "block" : "hidden"}`}
          >
            <button
              className={`${
                user ? "block" : "hidden"
              } bg-white text-blue-600 py-2 px-4 rounded mr-4`}
            >
              My Profile
            </button>
          </Link>
          <Link
            href="/api/auth/logout"
            legacyBehavior
            className={`${user ? "block" : "hidden"}`}
          >
            <button
              className={`${
                user ? "block" : "hidden"
              } bg-white text-blue-600 py-2 px-4 rounded mr-4`}
            >
              Log Out
            </button>
          </Link>
        </div>
      </div>
      {/* mobile nav list */}
      <div className={`lg:hidden ${isOpen ? "flex flex-col pl-6" : "hidden"}`}>
        <Link href="/" legacyBehavior>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4">
            Home
          </a>
        </Link>
        <Link href="/about" legacyBehavior>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4">
            About
          </a>
        </Link>
        <Link href="/services" legacyBehavior>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4">
            Services
          </a>
        </Link>
        <Link href="/contact" legacyBehavior>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-white">
            Contact
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
