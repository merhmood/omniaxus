import React from "react";
import { Metadata } from "next";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AboutBiz from "@/components/AboutBiz";

export const metadata: Metadata = {
  title: "Omniaxus | About",
};

export default function Page() {
  return (
    <main>
      <Navigation />
      <AboutBiz />
      <Footer />
    </main>
  );
}
