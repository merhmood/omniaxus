import React from "react";
import { Props } from "@/types";

import Product from "@/components/Product";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function page({ params, searchParams }: Props) {
  return (
    <main className="flex flex-col justify-between h-screen">
      <div>
        <Navigation />
        <Product />
      </div>
      <Footer />
    </main>
  );
}
