"use client";

import "./Navigation.scss";
import navigationLinks from "./navigation.json";
import MenuItem from "./MenuItem";
import { Fragment, useState } from "react";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

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
          <Fragment key={index}>
            {item.auth ? (
              <SignedIn>
                <MenuItem key={index} item={item} />
              </SignedIn>
            ) : (
              <MenuItem key={index} item={item} />
            )}
          </Fragment>
        ))}
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button
              className="transition-colors rounded-md border-2 px-4 py-2
 hover:border-black"
            >
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </section>
  );
};

export default Navigation;
