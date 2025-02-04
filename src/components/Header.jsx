import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";

function Header() {
  return (
    <div className="relative z-50 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
      </div>
    </div>
  );
}

export default Header;
