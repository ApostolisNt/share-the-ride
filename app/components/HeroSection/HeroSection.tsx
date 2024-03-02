"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import heroImage from "@assets/hero-bg.jpg";
import "./HeroSection.scss";
import SearchForm from "@components/SearchForm/SearchForm";

const words = ["Share", "Connect"];

const HeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex(
        (currentWordIndex) => (currentWordIndex + 1) % words.length
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="hero_section">
      <div className="backgroundImage">
        <Image
          src={heroImage}
          alt="Hero Image"
          objectFit="cover"
          objectPosition="top"
        />
      </div>
      <div className="hero_container">
        <div className="flex-1 flex justify-center hero_text_wrapper">
          <h1>
            Let&apos;s <span>{words[currentWordIndex]}</span>
            <br />
            the journey together
          </h1>
        </div>
        <SearchForm />
      </div>
    </section>
  );
};

export default HeroSection;
