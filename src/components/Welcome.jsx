import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const setupTextHover = (container, type) => {
  if (!container) return ()=>{};

  // Skip hover effect on touch devices
  if (window.matchMedia("(pointer: coarse)").matches) return ()=>{};

  const letters = container.querySelectorAll("span");
  const { min, max } = FONT_WEIGHTS[type];

  const animateLetter = ({ letter, weight, duration = 0.25 }) => {
    gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `"wght" ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 20000);

      const newWeight = min + (max - min) * intensity;
      animateLetter({ letter, weight: newWeight });
    });
  };
  const handleMouseLeave = () => {
    const defaultWeight = FONT_WEIGHTS[type].default;
    letters.forEach((letter) =>
      animateLetter({ letter, weight: defaultWeight, duration: 0.3 })
    );
  };





  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return ()=>{
    container.removeEventListener("mousemove",handleMouseMove);
    container.removeEventListener("mouseleave",handleMouseLeave);

  }
  
};


const Welcome = () => {
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP(() => {
    const titleCleanUp=setupTextHover(titleRef.current, "title");
    const subtitleCleanUp=setupTextHover(subtitleRef.current,"subtitle");

   return()=>{
    subtitleCleanUp();
    titleCleanUp();

   };
   
  }, []);

  return (
    <section id='welcome'>
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Pradip Maity! Welcome to my ",
          "text-lg sm:text-xl md:text-3xl font-georama",
          100
        )}
      </p>

      <h1 ref={titleRef} className='mt-4 sm:mt-5 md:mt-7'>
        {renderText("portfolio", "text-4xl sm:text-6xl md:text-9xl italic font-georama")}
      </h1>
    </section>
  );
};

export default Welcome;
