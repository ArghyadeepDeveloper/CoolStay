import React from "react";
import { Carousel } from "rsuite";
import "rsuite/dist/rsuite.min.css"; // Ensure this is imported in your project
import salesImageOne from "../../../assets/sale/sale-image-1.jpg";

export default function SalesCarousel() {
  return (
    <div className="w-full">
      <Carousel autoplay className="custom-slider">
        <img src={salesImageOne} alt="Sale Image 1" className="w-full h-auto" />
        <img src={salesImageOne} alt="Sale Image 2" className="w-full h-auto" />
        <img src={salesImageOne} alt="Sale Image 3" className="w-full h-auto" />
      </Carousel>
    </div>
  );
}
