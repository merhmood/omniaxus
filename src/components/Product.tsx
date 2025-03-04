"use client";

import React, { Suspense, useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { ProductType } from "@/types";

const Product = () => {
  const id = usePathname().split("/")[2]; // extracts product id from url path;
  const [product, setProduct] = useState<ProductType>();
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const router = useRouter();

  useEffect(() => {
    // Request products and filter out the product chosen to read
    (async () => {
      const data = await fetch("/data.json");
      const response: { products: [] } = await data.json();
      const product: ProductType[] = response.products.filter(
        (product: ProductType) => product.id === id
      );
      setProduct(product[0]);
      setSelectedImage(product[0].image as string);
    })();
  }, [id]);

  const goBack = () => {
    if (window.history.length > 1) {
      router.back(); // Go to the previous page if history exists
    } else {
      router.push("/"); // Redirect to homepage if no history
    }
  };

  return (
    <section className="flex flex-col-reverse lg:flex-row lg:justify-between mt-24 lg:mt-40 mx-auto max-w-6xl w-5/6">
      <div className="basis-3/5">
        <Suspense fallback={<div className="my-10">Loading Product</div>}>
          <div className="max-w-4xl mx-auto p-4">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-black px-4 py-2 rounded-md hover:text-gray-700 transition"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Go Back
            </button>
            {/* Image Section */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Main Image with Animation */}
              <div className="flex-1">
                <motion.img
                  key={selectedImage} // Forces re-render on image change
                  src={selectedImage}
                  alt="Product"
                  className="w-full h-52 lg:h-96 object-cover rounded-lg shadow-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>

              {/* Sub Images */}
              <div className="flex my-2 lg:my-0 md:flex-col gap-2">
                {product?.subImages.map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt={`Product ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-blue-500"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* Buy Button */}
            <div className="mt-4 mb-10">
              <a
                href={product?.sellerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
              >
                Buy on Amazon
              </a>
            </div>
            {/* Product Title */}
            <h1 className="text-2xl font-bold mb-2">{product?.title}</h1>

            {/* Product Description */}
            <p className="text-gray-600 mb-4">{product?.description}</p>
          </div>
        </Suspense>
      </div>
      {/* <div className="flex lg:flex-col mb-10 gap-5" aria-label="ads">
        {ADS_CONTAINER.map((ADS) => (
          <div>{ADS}</div>
        ))}
      </div> */}
    </section>
  );
};

export default Product;
