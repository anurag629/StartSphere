import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [isdisable, setIsDisable] = useState(false);
  const [profileData, setProfileData] = useState({
    ContactInformation: {
      CompanyEmail: "",
      Phone: "",
      LinkedInProfile: "",
      CompanyWebsite: "",
      OfficeAddress: "",
    },
    Bio: "",
    Name: userData?.Name || "",
    Image: "",
    Role: "",
    Experience: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`profile/${userData._id}`, {
          headers: {
            Authorization: `Bearer ${userData.Token}`,
          },
        })
        setProfileData(response.data)
      } catch (error) {

      }
    }
    fetchUserProfile();
  }, [])

  const handleFileUpload = async (file) => {
    setIsDisable(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'auenhckk');
    formData.append('cloud_name', 'dnjis096o');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dnjis096o/upload`,
        formData
      );
      console.log(response.data.url)
      setProfileData((prevData) => ({
        ...prevData,
        ["Image"]: response.data.url,
      }));
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsDisable(false);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContactInfoChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      ContactInformation: {
        ...prevData.ContactInformation,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = toast.loading("Please wait...")
    console.log("ProfileData:", profileData)
    try {
      await api.put(`/profile/update/${userData._id}`, profileData, {
        headers: {
          Authorization: `Bearer ${userData.Token}`,
          "Content-Type": "application/json",
        },
      });
      toast.update(id, { render: "Profile updated successfully!", type: "success", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
      console.log("Profile updated successfully.");
      navigate('/profile')
    } catch (error) {
      toast.update(id, { render: "Error updating profile!", type: "error", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
      console.error("Error updating profile.", error);
    }
  };

  return (
    <div className=" mx-auto my-8 p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="flex justify-center text-2xl font-bold mb-5">Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm">Name </label>
            <input
              type="text"
              name="Name"
              value={profileData.Name}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">Upload Image </label>
            <input
              type="file"
              name="Image"
              onChange={(e) => handleFileUpload(e.target.files[0])}
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
          <div className="flex flex-col gap-2">
            <label className="text-sm">Bio</label>
            <textarea
              name="Bio"
              value={profileData.Bio}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 text-white"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" disabled={isdisable} className="py-2 px-4 bg-blue-600 rounded hover:bg-blue-500">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
