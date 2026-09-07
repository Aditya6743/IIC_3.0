import React, { useEffect } from "react";
import Footer from "../components/Footer";
import FoodMenu from "../components/FoodMenu";

const Food: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-transparent relative flex flex-col">
      <FoodMenu />
      <Footer />
    </div>
  );
};

export default Food;
