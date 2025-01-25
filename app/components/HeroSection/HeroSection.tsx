import heroImage from "@assets/hero-bg.jpg";
import "./HeroSection.scss";
import SearchForm from "@components/SearchForm/SearchForm";
import { Image } from "./../Global/Image";

const HeroSection = () => {
  return (
    <section className="hero_section">
      <div className="backgroundImage">
        <Image src={heroImage} alt="Hero Image" />
      </div>
      <div className="hero_container">
        <div className="hero_text_wrapper flex justify-center">
          <h1>
            Let&apos;s <span>Share</span> the journey together
          </h1>
        </div>
        <SearchForm />
      </div>
    </section>
  );
};

export default HeroSection;
