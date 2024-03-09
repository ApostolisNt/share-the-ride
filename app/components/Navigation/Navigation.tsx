"use client";

import "./Navigation.scss";
import navigationLinks from "./navigation.json";
import MenuItem from "./MenuItem";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname.startsWith("#");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className={`navigation ${isHomePage ? "homepage" : ""}`}>
      <h1 className="navigation_logo">Share the ride</h1>
      <div
        className={`burger_menu ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`navigation_link_wrapper ${isMenuOpen ? "open" : ""}`}>
        {navigationLinks.links.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Navigation;
