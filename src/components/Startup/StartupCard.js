import React from "react";

const StartupCard = ({ company }) => {
  const { name, location, industry, employees, foundingYear, founderName, description } =
    company;

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="flex items-center mb-2">
        <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857"
            />
          </svg>
        </div>
        <h3 className="ml-4 text-xl font-bold text-zinc-600">{name}</h3>
      </div>
      <p className="text-gray-700 mb-2 ">{location}</p>
      <div className="flex mb-2">
        {industry.map((tag, index) => (
          <span key={index} className="bg-gray-200 px-2 py-1 rounded text-gray-700 mr-2">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-gray-700 mb-2">{employees} employees</p>
      <p className="text-gray-700 mb-2">Founded in {foundingYear}</p>
      <p className="text-gray-700 mb-2">{founderName}</p>
      <p className="text-gray-700 mb-2">{description}</p>
    </div>
  );
};

export default StartupCard;
