import Image from "next/image";

const About: React.FC = () => {
  return (
    <section className="bg-[#141414] mt-10 lg:mt-20" id="about">
      <div className="mx-auto max-w-6xl w-5/6 pt-11 lg:pt-20 h-fit">
        <p className="text-white text-xs lg:text-3xl text-center max-w-5xl mx-auto font-normal lg:font-normal">
          Our mission is to connect smart glass enthusiasts with the best deals
          from top online stores. As an affiliate, we provide a seamless
          shopping experience, helping you discover cutting-edge smart eyewear
          that enhances your vision, keeps you connected, and transforms the way
          you see the world. Join us in embracing the future of technology.
        </p>
        <div className="relative h-32 lg:h-[496px] w-5/6 lg:w-full mx-auto mt-4 lg:mt-8">
          <Image src="/about.png" fill objectFit="contain" alt="home" />
        </div>
      </div>
    </section>
  );
};

export default About;
