import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate= useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [isdisable,setIsDisable] = useState(false);
  const [profileData, setProfileData] = useState({
    ContactInformation: {
      CompanyEmail: "",
      Phone: "",
      LinkedInProfile: "",
      CompanyWebsite: "",
      OfficeAddress: "",
    },
    Bio: "",
    Name:"",
    Image: "",
    Role: "",
    Experience: "",
  });
  const [message, setMessage] = useState("");

    useEffect(()=>{
      const fetchUserProfile=async()=>{
        try {
          const response= await api.get(`profile/${userData._id}`,{
                    headers: {
                      Authorization: `Bearer ${userData.Token}`,
                    },
                  })
                  setProfileData(response.data)
        } catch (error) {
          
        }
      }
      fetchUserProfile();
    },[])
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
      } finally{
        setIsDisable(false);
      }
    };
  const handleChange = async(e) => {
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

  const handleStartUpChange = (index, field, value) => {
    const updatedStartUpDetails = [...profileData.StartUpDetails];
    updatedStartUpDetails[index][field] = value;
    setProfileData((prevData) => ({
      ...prevData,
      StartUpDetails: updatedStartUpDetails,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("updated:",profileData)
    try {
      await api.put(`/profile/update/${userData._id}`, profileData, {
        headers: {
          Authorization: `Bearer ${userData.Token}`,
          "Content-Type": "application/json",
        },
      });
      setMessage("Profile updated successfully.");
      console.log("Profile updated successfully.");
      navigate('/profile')
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
            onChange={(e)=> handleFileUpload(e.target.files[0])}
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
        {/* <div className="flex flex-col gap-2">
          <label className="text-sm">StartUps</label> */}
          {/* {profileData.StartUpDetails.map((startup, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 mb-4 p-2 border border-gray-700 rounded-md"
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm">StartUp Name</label>
                <input
                  type="text"
                  name={`startUpName${index}`}
                  value={startup.name}
                  onChange={(e) => handleStartUpChange(index, "name", e.target.value)}
                  className="p-2 rounded bg-gray-700 text-white"
                />
              </div> */}
              {/* <div className="flex flex-col gap-2">
                <label className="text-sm">Revenue</label>
                <input
                  type="text"
                  name={`revenue${index}`}
                  value={startup.revenue}
                  onChange={(e) => handleStartUpChange(index, "revenue", e.target.value)}
                  className="p-2 rounded bg-gray-700 text-white"
                />
              </div> */}
              {/* <button
                type="button"
                onClick={() => removeStartUp(index)}
                className="py-1 px-2 bg-red-600 rounded hover:bg-red-500"
              >
                Remove StartUp
              </button>
            </div>
          ))} */}
          {/* <button
            type="button"
            onClick={addStartUp}
            className="py-2 px-4 bg-blue-600 rounded hover:bg-blue-500"
          >
            Add StartUp
          </button>
        </div> */}
        <button type="submit" disabled={isdisable} className="py-2 px-4 bg-blue-600 rounded hover:bg-blue-500">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
