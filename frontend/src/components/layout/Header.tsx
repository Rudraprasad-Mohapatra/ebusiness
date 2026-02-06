import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import type { Brand } from "../../types";
import { fetchBrand } from "../../utils/api";
import { HiMenu, HiX } from "react-icons/hi";

const Header: React.FC = () => {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const loadBrand = async () => {
      setIsLoading(true);
      const brandData = await fetchBrand();
      setBrand(brandData);
      setIsLoading(false);
    };
    loadBrand();
  }, []);

  const headerBgColor = brand?.primary_color || "#1a4d2e";
  const headerStyle = brand
    ? {
        backgroundColor: headerBgColor,
        fontFamily: brand.font_family || "inherit",
      }
    : {};

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className="shadow-xl sticky top-0 z-50 transition-all duration-300"
      style={headerStyle}
    >
      <div className="container px-1 py-1 flex items-center justify-center relative">
        {/* Desktop Navigation - Right */}
        <nav className="shrink-0 hidden sm:block absolute right-1">
          <ul className="flex gap-6 md:gap-8 text-sm md:text-base">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="transition-colors duration-200 font-medium px-2 py-2"
                  style={{ color: brand?.accent_color }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logo Section - Center */}
        <Link to="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 sm:gap-4 shrink-0"
          >
            {!isLoading && brand?.logo && (
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-lg scale-280"
              />
            )}
            {/* <Link
            to="/"
            className="text-sm sm:text-lg md:text-2xl font-bold text-white hover:text-gray-100 transition-colors duration-200 line-clamp-1 md:line-clamp-none"
          >
            {brand?.name || 'Radharaman'}
          </Link> */}
          </motion.div>
        </Link>

        {/* Hamburger for Mobile - Left */}
        <div className="sm:hidden absolute left-1">
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
            style={{color: brand?.accent_color}}
          >
            {isSidebarOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-6 flex flex-col"
          >
            {/* Close button inside sidebar */}
            <div className="self-end mb-4">
              <button
                onClick={toggleSidebar}
                className="focus:outline-none"
                style={{ color: brand?.accent_color }}
              >
                <HiX size={28} />
              </button>
            </div>

            {/* Menu items */}
            <ul className="flex flex-col gap-4 text-gray-800 text-lg">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={toggleSidebar}
                    className="font-medium"
                    style={{ color: brand?.accent_color }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black z-40"
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
