import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const [profileData, setProfileData] = useState({
    ContactInformation: {
      CompanyEmail: "",
      Phone: "",
      LinkedInProfile: "",
      CompanyWebsite: "",
      OfficeAddress: "",
    },
    Bio: "",
    Image: "",
    Role: "",
    Experience: "",
    StartUpDetails: [],
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;
      if (!token) {
        setMessage("User is not authenticated.");
        return;
      }

      try {
        const userId = storedUser?._id;
        // use api.get(`/profile/${userId}`) instead of axios.get
        const response = await api.get(`/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
        console.log("Profile fetched successfully.");
      } catch (error) {
        setMessage("Failed to fetch profile details.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      ContactInformation: {
        ...prevData.ContactInformation,
        [name]: value,
      },
    }));
  };

  const handleStartUpChange = (index, field, value) => {
    const updatedStartUpDetails = [...profileData.StartUpDetails];
    updatedStartUpDetails[index][field] = value;
    setProfileData((prevData) => ({
      ...prevData,
      StartUpDetails: updatedStartUpDetails,
    }));
  };

  // const addStartUp = () => {
  //     setProfileData((prevData) => ({
  //         ...prevData,
  //         StartUpDetails: [...prevData.StartUpDetails, { name: '', revenue: '' }]
  //     }));
  // };

  // const removeStartUp = (index) => {
  //     const updatedStartUpDetails = profileData.StartUpDetails.filter((_, i) => i !== index);
  //     setProfileData((prevData) => ({
  //         ...prevData,
  //         StartUpDetails: updatedStartUpDetails
  //     }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;
    const userId = storedUser?._id;
    if (!token) {
      setMessage("User is not authenticated.");
      return;
    }

    try {
      await api.put(`/profile/update/${userId}`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setMessage("Profile updated successfully.");
      console.log("Profile updated successfully.");
    } catch (error) {
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm">Upload Image </label>
          <input
            type="file"
            name="Image"
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Company Email</label>
          <input
            type="email"
            name="CompanyEmail"
            value={profileData.ContactInformation.CompanyEmail}
            onChange={handleContactInfoChange}
            className="p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Phone</label>
          <input
            type="text"
            name="Phone"
            value={profileData.ContactInformation.Phone}
            onChange={handleContactInfoChange}
            className="p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">LinkedIn Profile</label>
          <input
            type="text"
            name="LinkedInProfile"
            value={profileData.ContactInformation.LinkedInProfile}
            onChange={handleContactInfoChange}
            className="p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Company Website</label>
          <input
            type="text"
            name="CompanyWebsite"
            value={profileData.ContactInformation.CompanyWebsite}
            onChange={handleContactInfoChange}
            className="p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Office Address</label>
          <input
            type="text"
            name="OfficeAddress"
            value={profileData.ContactInformation.OfficeAddress}
            onChange={handleContactInfoChange}
            className="p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Bio</label>
          <textarea
            name="Bio"
            value={profileData.Bio}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Role</label>
          <input
            type="text"
            name="Role"
            value={profileData.Role}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Experience</label>
          <input
            type="text"
            name="Experience"
            value={profileData.Experience}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white"
          />
        </div>

        <button type="submit" className="py-2 px-4 bg-blue-600 rounded hover:bg-blue-500">
          Update Profile
        </button>

        <Link
          to="/add-startup"
          className="py-2 px-4 bg-rose-600 text-center rounded hover:bg-rose-500"
        >
          Add StartUp
        </Link>
      </form>
    </div>
  );
};

export default UpdateProfile;
