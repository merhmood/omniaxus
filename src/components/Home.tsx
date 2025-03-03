"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Home: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const videoControlHandler = () => {
    if (isVideoPlaying && videoRef && videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      if (!isVideoPlaying && videoRef && videoRef.current) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  return (
    <section className="home flex flex-col-reverse lg:flex-row lg:justify-center lg:items-center mt-44 lg:mt-32 mx-auto max-w-6xl w-5/6">
      <div className="w-full max-w-lg mx-auto ">
        <h2 className="text-2xl text-center lg:text-5xl lg:text-left font-bold mt-6 lg:mt-0">
          Join the New World of Smart Glass Wearers.
        </h2>
        <p className="text-xs text-center lg:text-base lg:text-left mt-5 lg:mt-3 font-light">
          Step into the future with the new world of smart glass wearers.
          Experience cutting-edge technology that enhances your vision, keeps
          you connected, and transforms the way you see the world. Join the
          revolution today!
        </p>
        <Link
          href="/products"
          className="block text-center lg:text-left hover:text-[#288054] text-[#107684] font-semibold mt-9"
        >
          See Products
        </Link>
      </div>
      <div className="relative h-96 w-5/6 lg:w-64 mx-auto">
        <video
          src="/home.mp4"
          className="h-full w-full object-cover object-center rounded-3xl"
          autoPlay
          loop
          muted={true}
          ref={videoRef}
        ></video>
        <div className="absolute flex top-0 h-full w-full">
          <div className="flex flex-col justify-end w-full h-full pr-4 pb-4 bg-black/5 rounded-3xl">
            <div className="flex justify-end">
              <div className="relative h-5 w-4" onClick={videoControlHandler}>
                <Image
                  src={isVideoPlaying ? "/pause.png" : "/play.png"}
                  alt="controls"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
