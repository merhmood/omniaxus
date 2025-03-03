"use client";

import React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    src: "/products/glasses.png",
    description:
      "Ray-Ban Meta - Wayfarer (Standard) Smart Glasses - Shiny Black, Clear - 111",
    price: "$350",
  },
  {
    src: "/products/glasses.png",
    description:
      "Ray-Ban Meta - Wayfarer (Standard) Smart Glasses - Shiny Black, Clear - 222",
    price: "$127",
  },
  {
    src: "/products/glasses.png",
    description:
      "Ray-Ban Meta - Wayfarer (Standard) Smart Glasses - Shiny Black, Clear - 333",
    price: "$200",
  },
  {
    src: "/products/glasses.png",
    description:
      "Ray-Ban Meta - Wayfarer (Standard) Smart Glasses - Shiny Black, Clear - 444",
    price: "$399",
  },
];

const Latests = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="lg:bg-[#fdfdfd] w-full max-w-4xl mx-auto flex flex-col items-center overflow-hidden lg:border lg:rounded-lg mt-10 pb-10">
      <div className="w-full pl-4 pt-4 font-bold">Latest Products</div>
      <div className="relative w-full h-[150px] sm:h-[250px] flex items-center overflow-hidden">
        <motion.div
          className="flex w-[250%] sm:w-[200%] pl-16 lg:pl-48"
          initial={{ x: "0%" }}
          animate={{ x: `-${index * 50}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {images.map((image, i) => (
            <div key={i} className="w-2/3 flex-shrink-0 px-1">
              <img
                src={image.src}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="w-full pb-4 min-h-32rem] sm:min-h-[4rem] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="text-center text-base sm:text-xl font-medium text-gray-600 h-16 w-5/6 lg:w-3/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {images[index].description}
            <span className="block text-2xl font-bold mt-2 text-gray-800">
              {images[index].price}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Latests;
