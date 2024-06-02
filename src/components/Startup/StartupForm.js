import React, { useState, useEffect } from "react";
import api from '../../api/axios';
import { addStartup, updateStartup as updateStartupInStore } from '../../feature/startupSlice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StartupForm = ({ startup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const id = JSON.parse(localStorage.getItem('user'))._id;

  const [startupData, setStartupData] = useState({
    User: id,
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
    FundingRaised: [{
      CompanyName: "",
      EquityHolds: "",
      Amount: "",
    }],
    ContactInformation: {
      CompanyEmail: "",
      Phone: "",
      LinkedInProfile: "",
      CompanyWebsite: "",
      OfficeAddress: "",
    },
  });

  useEffect(() => {
    if (startup) {
      setStartupData(startup);
    }
    window.scrollTo(0, 0);
  }, [startup]);

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
    } else if (nameParts.length === 3 && Array.isArray(startupData[nameParts[0]])) {
      const updatedArray = [...startupData[nameParts[0]]];
      updatedArray[parseInt(nameParts[1])] = {
        ...updatedArray[parseInt(nameParts[1])],
        [nameParts[2]]: value,
      };
      setStartupData({
        ...startupData,
        [nameParts[0]]: updatedArray,
      });
    } else {
      setStartupData({ ...startupData, [name]: value });
    }
  };

  const createStartup = async () => {
    const id = toast.loading("Please wait...")
    console.log("Create startup");
    console.log("startup token", userData?.Token);
    try {
      const response = await api.post('/startup/create', startupData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData?.Token}`,
        },
      });
      console.log("Create startup response::", response);
      toast.update(id, { render: "Startup created succesfully!", type: "success", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
      dispatch(addStartup(response.data.startUp));
      navigate(`/startups/${response.data.startUp._id}`);
    } catch (error) {
      toast.update(id, { render: "Error creating startup!", type: "error", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
    }
  };

  const updateStartup = async (id) => {
    const toastId = toast.loading("Please wait...")
    console.log("Update startup");
    try {
      const response = await api.put(`/startup/update/${id}`, startupData, {
        headers: {
          'Authorization': `Bearer ${userData?.Token}`,
        },
      });
      console.log(response.data);
      toast.update(toastId, { render: "Startup updated succesfully!", type: "success", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
      dispatch(updateStartupInStore(response.data.startUp));
      navigate(`/startups/${response.data.startUp._id}`);
    } catch (error) {
      console.error("Error updating startup:", error);
      toast.update(toastId, { render: "Error updating startup!", type: "error", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startup) {
      updateStartup(startup._id);
    } else {
      createStartup();
    }
  };

  const addFundingEntry = () => {
    setStartupData({
      ...startupData,
      FundingRaised: [
        ...startupData.FundingRaised,
        { CompanyName: "", EquityHolds: "", Amount: "" },
      ],
    });
  };

  const removeFundingEntry = (index) => {
    const updatedFundingRaised = startupData.FundingRaised.filter((_, i) => i !== index);
    setStartupData({ ...startupData, FundingRaised: updatedFundingRaised });
  };

  return (
    <div className="mx-auto my-8 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-white mb-6">
        {startup ? "Edit Startup" : "Add Startup"}
      </h1>
      <form onSubmit={handleSubmit}>
        {/* General Details */}
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
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
            {
              label: "Revenue",
              name: "Revenue",
              type: "number",
              placeholder: "Revenue"
            },
            {
              label: "Company Description",
              name: "CompanyDes",
              type: "textarea",
              placeholder: "Company Description",
            },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <div className="flex flex-col gap-2">
                <label className="text-sm mb-1">{label}</label>
                {type === "textarea" ? (
                  <textarea
                    name={name}
                    type={type}
                    value={startupData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="p-2 rounded bg-gray-700 text-white"
                  />
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={startupData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="p-2 rounded bg-gray-700 text-white"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Funding Raised */}
        <div className='flex'>
          <h2 className="text-lg font-semibold mt-10 mb-4 text-white">Funding Raised </h2>
        </div>
        <div className="grid grid-cols-4 grid-rows-1 gap-4">
          {startupData.FundingRaised.map((funding, index) => (
            <div key={index} className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm">Funding Company Name</label>
                <input
                  type="text"
                  name={`FundingRaised.${index}.CompanyName`}
                  value={funding.CompanyName}
                  onChange={handleChange}
                  placeholder="Funding Company Name"
                  className="p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm">Equity Holds</label>
                <input
                  type="number"
                  name={`FundingRaised.${index}.EquityHolds`}
                  value={funding.EquityHolds}
                  onChange={handleChange}
                  placeholder="Equity Holds"
                  className="p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm">Funding Amount</label>
                <input
                  type="number"
                  name={`FundingRaised.${index}.Amount`}
                  value={funding.Amount}
                  onChange={handleChange}
                  placeholder="Funding Amount"
                  className="p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <button
                type="button"
                onClick={() => removeFundingEntry(index)}
                className="bg-red-600 text-white px-2 py-1 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className='mt-4'>
          <button
            type="button"
            onClick={addFundingEntry}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            Add Funding Entry
          </button>
        </div>
        {/* Contact Information */}
        <h2 className="text-lg font-semibold mt-10 mb-4 text-white">Contact Information</h2>
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
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
              <div className="flex flex-col gap-2">
                <label className="text-sm">{label}</label>
                {type === "textarea" ? (
                  <textarea
                    name={name}
                    value={startupData.ContactInformation[name.split(".")[1]]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="p-2 rounded bg-gray-700 text-white"
                  />
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={startupData.ContactInformation[name.split(".")[1]]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="p-2 rounded bg-gray-700 text-white"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className='flex justify-end'>
            <button
              type="submit"
              className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
            >
              {startup ? "Update Startup" : "Create Startup"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StartupForm;
