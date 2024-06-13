// src/components/ProfileCard.js
import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axios';

const MentorsCard = ({ profiles, profile,setProfiles }) => {
  const { Image, Name, Bio, Role,_id} = profile;
  const profileData = useSelector((state) => state.profile.profile);
  const handleAddMentor=async()=>{
    const toastId = toast.loading("Please wait...")
    try {
        const AddMentorResponse = await api.post(`/profile/add-mentors/${profileData._id}`, {"mentorId": _id})
        setProfiles(profiles.filter((element)=> element._id!==_id))
        toast.update(toastId, { render: "mentor added succesfully!", type: "success", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
      } catch (error) {
        toast.update(toastId, { render: "Error creating article!", type: "error", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
        console.error(error);
      }
  }
  return (
    <div className="w-1/6 rounded text-white overflow-hidden shadow-lg p-4 m-4 bg-slate-700">
      <img className="w-24 h-24 rounded-full mx-auto" src={Image? Image: "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg"} alt={`${Name}'s profile`} />
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold">{Name}</h2>
        <p className="text-gray-200">{Bio}</p>
        <p className="text-gray-200">{Role}</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleAddMentor}>
          Add Mentor
        </button>
      </div>
    </div>
  );
};

export default MentorsCard;
