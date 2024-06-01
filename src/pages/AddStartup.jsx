import React from "react";
import Navbar from "../components/Home/Navbar";
import StartupForm from "../components/Startup/StartupForm";
import Footer from "../components/Home/Footer";

const AddStartup = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <StartupForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddStartup;
