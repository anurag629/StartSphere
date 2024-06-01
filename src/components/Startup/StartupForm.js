import React, { useState, useEffect } from "react";

const StartupForm = () => {
  const [startupData, setStartupData] = useState({
    StartUpName: "",
    Logo: "",
    FounderName: "",
    CompanyDes: "",
    FoundingYear: "",
    NumberOfEmployees: "",
    TargetMarket: "",
    CurrentStage: "",
    KeyFeatures: "",
    Investors: "",
    Evaluation: "",
    Revenue: "",
    FundingRaised: [
      {
        CompanyName: "",
        EquityHolds: "",
        Amount: "",
      },
    ],
    ContactInformation: {
      CompanyEmail: "",
      Phone: "",
      LinkedInProfile: "",
      CompanyWebsite: "",
      OfficeAddress: "",
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split(".");
    if (nameParts.length === 2) {
      setStartupData({
        ...startupData,
        [nameParts[0]]: {
          ...startupData[nameParts[0]],
          [nameParts[1]]: value,
        },
      });
    } else if (nameParts.length === 3) {
      setStartupData({
        ...startupData,
        [nameParts[0]]: [
          {
            ...startupData[nameParts[0]][0],
            [nameParts[2]]: value,
          },
        ],
      });
    } else {
      setStartupData({ ...startupData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(startupData);
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-4   bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Startup Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          {
            label: "Startup Name",
            name: "StartUpName",
            type: "text",
            placeholder: "Startup Name",
          },
          { label: "Logo", name: "Logo", type: "text", placeholder: "Logo" },
          {
            label: "Founder Name",
            name: "FounderName",
            type: "text",
            placeholder: "Founder Name",
          },
          {
            label: "Company Description",
            name: "CompanyDes",
            type: "textarea",
            placeholder: "Company Description",
          },
          {
            label: "Founding Year",
            name: "FoundingYear",
            type: "number",
            placeholder: "Founding Year",
          },
          {
            label: "Number of Employees",
            name: "NumberOfEmployees",
            type: "number",
            placeholder: "Number of Employees",
          },
          {
            label: "Target Market",
            name: "TargetMarket",
            type: "text",
            placeholder: "Target Market",
          },
          {
            label: "Current Stage",
            name: "CurrentStage",
            type: "text",
            placeholder: "Current Stage",
          },
          {
            label: "Key Features",
            name: "KeyFeatures",
            type: "text",
            placeholder: "Key Features",
          },
          {
            label: "Investors",
            name: "Investors",
            type: "text",
            placeholder: "Investors",
          },
          {
            label: "Evaluation",
            name: "Evaluation",
            type: "number",
            placeholder: "Evaluation",
          },
          { label: "Revenue", name: "Revenue", type: "number", placeholder: "Revenue" },
        ].map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label className="block text-white font-semibold mb-1">{label}</label>
            {type === "textarea" ? (
              <textarea
                name={name}
                type={type}
                value={startupData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            ) : (
              <input
                type={type}
                name={name}
                value={startupData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            )}
          </div>
        ))}
        <h2 className="text-lg font-semibold mt-4 text-white">Funding Raised</h2>
        <div className="space-y-4">
          {[
            {
              label: "Funding Company Name",
              name: "FundingRaised.CompanyName",
              type: "text",
              placeholder: "Funding Company Name",
            },
            {
              label: "Equity Holds",
              name: "FundingRaised.EquityHolds",
              type: "number",
              placeholder: "Equity Holds",
            },
            {
              label: "Funding Amount",
              name: "FundingRaised.Amount",
              type: "number",
              placeholder: "Funding Amount",
            },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-white font-semibold mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={startupData.FundingRaised[0][name.split(".")[2]]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
        <h2 className="text-lg font-semibold mt-4 text-white">Contact Information</h2>
        <div className="space-y-4">
          {[
            {
              label: "Company Email",
              name: "ContactInformation.CompanyEmail",
              type: "email",
              placeholder: "Company Email",
            },
            {
              label: "Phone",
              name: "ContactInformation.Phone",
              type: "tel",
              placeholder: "Phone",
            },
            {
              label: "LinkedIn Profile",
              name: "ContactInformation.LinkedInProfile",
              type: "text",
              placeholder: "LinkedIn Profile",
            },
            {
              label: "Company Website",
              name: "ContactInformation.CompanyWebsite",
              type: "text",
              placeholder: "Company Website",
            },
            {
              label: "Office Address",
              name: "ContactInformation.OfficeAddress",
              type: "textarea",
              placeholder: "Office Address",
            },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-white font-semibold mb-1">{label}</label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  value={startupData.ContactInformation[name.split(".")[1]]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={startupData.ContactInformation[name.split(".")[1]]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StartupForm;