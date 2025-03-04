import { Metadata } from "next";

import Navigation from "@/components/Navigation";
import Articles from "@/components/Products";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Omniaxus | Products",
};

export default function Page() {
  return (
    <main className="flex flex-col justify-between h-screen">
      <div>
        <Navigation />
        <Articles />
      </div>
      <Footer />
    </main>
  );
}
