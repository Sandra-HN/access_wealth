import React from "react";
import Contact from "./Contact";
import { StarsCanvas } from "./canvas";

function Footer() {
  return (
    <div className="relative z-0">
      <Contact />
      <StarsCanvas />
    </div>
  );
}

export default Footer;
