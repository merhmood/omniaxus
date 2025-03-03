import React from "react";

import Navigation from "@/components/Navigation";
import Home from "@/components/Home";
import About from "@/components/About";
import Footer from "@/components/Footer";
import News from "@/components/Latests";

export default function Page() {
  return (
    <main>
      <Navigation />
      <Home />
      <About />
      <News />
      <Footer />
    </main>
  );
}
