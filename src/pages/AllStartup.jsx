import React from "react";
import FilterData from "../components/Startup/FilterData";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

const AllStartup = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <FilterData />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllStartup;
