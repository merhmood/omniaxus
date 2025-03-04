"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { ProductType, IncreaseProduct } from "@/types";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Array<ProductType>>([]);
  const [renderedProducts, setRenderedProducts] = useState<Array<ProductType>>(
    []
  );
  const [productsCursor, setProductCursor] = useState(0);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    // Fetch data and set them in reverse order, also handles
    // rendering the first set of products to the screen
    (async () => {
      const data = await fetch("/data.json");
      const response: { products: [] } = await data.json();
      setProducts(response.products.reverse());

      // Creates increase product object with common value.
      const increaseProduct = {
        productsCursor,
        setRenderedProducts,
        setProductCursor,
        products: response.products,
      };

      // Load products based on session storage product cursor
      const sessionProductCursor = sessionStorage.getItem("product-cursor");
      if (sessionProductCursor && parseInt(sessionProductCursor) > 0) {
        const sessionProductCursorNumber = parseInt(sessionProductCursor);

        addProductsToScreen({
          ...increaseProduct,
          isSession: true,
          sessionCursor: sessionProductCursorNumber,
        });
      } else {
        addProductsToScreen({ ...increaseProduct, isSession: false });
      }
    })();
  }, [offline]);

  useEffect(() => {
    // Handles network state accordingly
    window.addEventListener("offline", () => {
      setOffline(true);
    });
    window.addEventListener("online", () => {
      setOffline(false);
    });
    return () => {
      window.removeEventListener("offline", () => setOffline(true));
      window.removeEventListener("online", () => setOffline(false));
    };
  }, []);

  const addMoreHandler = () => {
    const increaseProduct: IncreaseProduct = {
      productsCursor,
      products,
      setRenderedProducts,
      setProductCursor,
      isSession: false,
    };
    addProductsToScreen(increaseProduct);
  };

  return (
    <section className="w-5/6 max-w-5xl mx-auto mt-44 lg:mt-32">
      <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
        {renderedProducts.length > 0 ? (
          renderedProducts.map((product, index) => (
            <section key={index} className="basis-80 mb-10">
              <Link href={product.link ? product.link : ""}>
                <div className="relative h-44 mb-3">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <p className="text-blue-700 text-sm lg:text-base hover:font-medium">
                  {product.title}
                </p>
                <p className="text-base lg:text-lg font-medium mt-3 text-right">
                  ${product.price}
                </p>
              </Link>
            </section>
          ))
        ) : !offline ? (
          <div className="grid place-items-center w-full h-full -mt-4">
            <div>
              <video
                className="h-16 w-16"
                src="/loading.webM"
                muted
                autoPlay
                loop
              ></video>
            </div>
            <p className="text-sm text-center lg:text-base">Loading ...</p>
          </div>
        ) : (
          <div className="grid place-items-center w-full h-full -mt-4">
            <div>
              <video
                className="h-16 w-16"
                src="/offline.webM"
                muted
                autoPlay
                loop
              ></video>
            </div>
            <p className="text-xs lg:text-base text-center text-red-500">
              Currently offline
            </p>
          </div>
        )}
      </div>
      {productsCursor < products.length && (
        <button
          className="block text-center font-semibold w-full mb-5 lg:mb-7"
          onClick={addMoreHandler}
        >
          Add more
        </button>
      )}
    </section>
  );
};

const CURSOR_VALUE = 3;
function addProductsToScreen(increase: IncreaseProduct) {
  const {
    products,
    productsCursor,
    isSession,
    setProductCursor,
    setRenderedProducts,
    sessionCursor,
  } = increase;
  const productsToRender: ProductType[] = [];

  // Increase the cursor value by if it hasn't exceed the products length
  // otherwise the newProductsCursorPosition will be set to the products length
  // value
  const newProductsCursor = isSession
    ? sessionCursor
    : productsCursor + CURSOR_VALUE < products.length
    ? productsCursor + CURSOR_VALUE
    : products.length;

  if (newProductsCursor) {
    // Adds products to renderedProducts
    for (let i = 0; i < newProductsCursor; i++) {
      productsToRender.push(products[i]);
    }
    // Adds newProductCursor to session storage
    sessionStorage.setItem("product-cursor", newProductsCursor.toString());

    setRenderedProducts([...productsToRender]);
    setProductCursor(newProductsCursor);
  }
}

export default Products;
