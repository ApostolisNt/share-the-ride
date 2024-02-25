"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import heroImage from "@assets/hero-bg.jpg";
import "./HeroSection.scss";

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
    <section className="relative overflow-hidden h-screen mt-[-5rem] flex items-center justify-center">
      <div className="backgroundImage">
        <Image
          src={heroImage}
          alt="Hero Image"
          objectFit="cover"
          objectPosition="top"
        />
      </div>
      <div className="relative flex h-full w-full justify-evenly items-center">
        <div className="flex-1 flex justify-center">
          <h1 className="w-3/4 text-7xl text-white font-extrabold uppercase">
            Let&apos;s{" "}
            <span className="text-slate-700">{words[currentWordIndex]}</span>
            <br />
            the journey together
          </h1>
        </div>
        <div className="flex-1 flex justify-center relative">FILTER FIELD</div>
      </div>
    </section>
  );
};

export default HeroSection;
