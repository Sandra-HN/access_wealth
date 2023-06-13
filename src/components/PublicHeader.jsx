import React from "react";
import PublicNavbar from "./PublicNavbar";

function PublicHeader() {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <PublicNavbar />
        
      </div>
    </div>
  );
}

export default PublicHeader;
