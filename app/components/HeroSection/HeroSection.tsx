import heroImage from "@assets/hero-bg.jpg";
import SearchForm from "@components/SearchForm/SearchForm";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative -mt-28 flex h-screen items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="absolute inset-0 bg-black opacity-80"></div>
      </div>
      {/* Content container */}
      <div className="relative flex w-[95%] max-w-[1300px] flex-col items-center justify-evenly gap-8 md:flex-row">
        {/* Headline */}
        <h1 className="w-full max-w-xl text-center text-[2.8rem] font-extrabold uppercase leading-none text-white md:w-3/4 md:text-left md:text-[4rem] lg:text-[5rem]">
          Let&apos;s <span className="text-slate-400">Share</span> the journey
          together
        </h1>

        {/* Search Form */}
        <div className="w-full max-w-sm rounded-md bg-[#ffffff25] p-4 shadow-card">
          <h2 className="mb-4 text-center text-2xl text-white md:text-left">
            Find your destination
          </h2>
          <SearchForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
