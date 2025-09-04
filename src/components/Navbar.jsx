import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ChildNameContext } from "./ChildNameContext";
import { navLinks } from "../data";

function Navbar() {
  const { childName } = useContext(ChildNameContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between z-50 fixed top-0 left-0 max-md:w-full 
                px-6 py-4 sm:max-w-7xl mx-auto max-sm:bg-white max-sm:rounded-md">
  {/* Left: Welcome message */}
  <div className="text-lg max-md:text-md font-semibold pr-10 text-m-blue-green">
    {childName ? `Welcome, ${childName}!` : "Welcome!"}
  </div>

  {/* Desktop Navigation links */}
  <ul className="hidden sm:flex gap-6">
    {navLinks.map(({ label, path }) => (
      <li key={path}>
        <Link
          to={path}
          className="text-gray-700 hover:text-m-blue-green max-md:text-sm font-medium"
        >
          {label}
        </Link>
      </li>
    ))}
  </ul>

  {/* Right: Toggle button (mobile only) */}
  <button
    className="sm:hidden text-gray-700"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    ☰
  </button>

  {/* Mobile menu */}
  {menuOpen && (
    <ul className="absolute top-full right-0 w-fit rounded-md bg-white px-6 pb-4 shadow-md sm:hidden">
      {navLinks.map(({ label, path }) => (
        <li key={path} className="py-2 border-b">
          <Link
            to={path}
            className="block text-gray-700 hover:text-m-blue-green font-medium"
            onClick={() => setMenuOpen(false)} 
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )}
</nav>

  );
}

export default Navbar;
