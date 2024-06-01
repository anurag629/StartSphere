import React from "react";
import FilterData from "../components/Startup/FilterData";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

const AllStartup = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4 bg-slate-800">
        <div className="">
          <FilterData />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllStartup;
