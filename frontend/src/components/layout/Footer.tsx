import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Brand } from "../../types";
import { fetchBrand } from "../../utils/api";
import {
  FaFacebookF,
  FaInstagram,
  // FaTwitter,
  // FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const [brand, setBrand] = useState<Brand | null>(null);

  useEffect(() => {
    const loadBrand = async () => {
      const brandData = await fetchBrand();
      setBrand(brandData);
    };
    loadBrand();
  }, []);

  // Use warm cream background with dark text for better contrast
  const footerBgColor = brand?.secondary_color;
  const footerTextColor = brand?.accent_color;

  return (
    <footer
      className="transition-colors duration-300 border-t-4"
      style={{
        backgroundColor: footerBgColor,
        borderColor: footerTextColor,
        fontFamily: brand?.font_family || "inherit",
      }}
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center sm:text-left"
          >
            <Link to="/">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="
        flex items-center
        justify-center sm:justify-start
        gap-3 sm:gap-4
        shrink-0
      "
              >
                {brand?.logo && (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-12 sm:h-14 md:h-16 w-auto object-contain drop-shadow-lg scale-400"
                  />
                )}
              </motion.div>
            </Link>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center sm:text-left"
          >
            <h4
              className="text-base sm:text-lg font-bold mb-3"
              style={{ color: footerTextColor }}
            >
              Contact
            </h4>
            <div className="text-base sm:text-lg md:text-xl space-y-3">
              {brand?.contact_email && (
                <p style={{ color: footerTextColor }}>
                  🏠︎{" "}
                  <a
                    className="hover:opacity-70 transition-opacity  font-bold"
                    style={{ color: footerTextColor }}
                  >
                    {brand.address}
                  </a>
                </p>
              )}
              {brand?.contact_email && (
                <div style={{ color: footerTextColor }} className="font-extrabold text-lg sm:text-xl">
                  ✉︎{" "}
                  <a
                    href={`mailto:${brand.contact_email}`}
                    className="hover:opacity-70 transition-opacity  font-bold"
                    style={{ color: footerTextColor }}
                  >
                    {brand.contact_email}
                  </a>
                </div>
              )}
              {brand?.contact_phone && (
                <div style={{ color: footerTextColor }} className="font-extrabold text-lg sm:text-xl">
                  ☏{" "}
                  <a
                    href={`tel:${brand.contact_phone}`}
                    className="hover:opacity-70 transition-opacity"
                    style={{ color: footerTextColor }}
                  >
                    {brand.contact_phone}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center sm:text-left"
          >
            <h4
              className="text-base sm:text-lg font-bold mb-4"
              style={{ color: footerTextColor }}
            >
              Follow Us
            </h4>

            <div className="flex justify-center sm:justify-start gap-6">
              {/* Facebook */}
              <a
                href={brand?.facebook_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 flex items-center justify-center rounded-full border-2 hover:scale-110 transition-transform"
                style={{ borderColor: footerTextColor, color: footerTextColor }}
              >
                <FaFacebookF size={28} />
              </a>

              {/* Instagram */}
              <a
                href={brand?.instagram_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 flex items-center justify-center rounded-full border-2 hover:scale-110 transition-transform"
                style={{ borderColor: footerTextColor, color: footerTextColor }}
              >
                <FaInstagram size={28} />
              </a>

              {/* Twitter */}
              {/* <a
                href={brand?.twitter_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 flex items-center justify-center rounded-full border-2 hover:scale-110 transition-transform"
                style={{ borderColor: footerTextColor, color: footerTextColor }}
              >
                <FaTwitter size={28} />
              </a> */}

              {/* LinkedIn */}
              {/* <a
                href={brand?.linkedin_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 flex items-center justify-center rounded-full border-2 hover:scale-110 transition-transform"
                style={{ borderColor: footerTextColor, color: footerTextColor }}
              >
                <FaLinkedinIn size={28} />
              </a> */}

              {/* Whatsapp */}
              <a
                href={brand?.whatsapp_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 flex items-center justify-center rounded-full border-2 hover:scale-110 transition-transform"
                style={{ borderColor: footerTextColor, color: footerTextColor }}
              >
                <FaWhatsapp size={28} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        className="border-t px-4 sm:px-6 md:px-8 py-6 sm:py-8 text-center font-semibold"
        style={{ borderColor: footerTextColor }}
      >
        <p
          className="text-sm sm:text-base"
          style={{ color: footerTextColor}}
        >
          &copy; {new Date().getFullYear()} {brand?.name || "Radharaman Crafts"}
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
