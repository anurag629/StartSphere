import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axios';

const ProfileCard = ({ profiles, profile, setProfiles, use }) => {
    const { Image, Name, Bio, Role, _id } = profile;
    const profileData = useSelector((state) => state.profile.profile);
    console.log("use in", use);

    const handleAddMentor = async () => {
        const toastId = toast.loading("Please wait...");
        try {
            const AddMentorResponse = await api.post(`/profile/add-mentors/${profileData._id}`, { "mentorId": _id });
            
            setProfiles(profiles.filter((element) => element._id !== _id));
            toast.update(toastId, { render: "Mentor added successfully!", type: "success", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
        } catch (error) {
            toast.update(toastId, { render: error.response.data, type: "error", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
        }
    }
    const handleRemoveMentor=async()=>{
        const toastId = toast.loading("Please wait...");
        try {
            console.log("id",_id)
            const RemoveMentorResponse = await api.delete(`/profile/remove-mentor/${profileData._id}`, {
                data: { "mentorId": _id }
        });
            setProfiles(profiles.filter((element) => element._id !== _id));
            toast.update(toastId, { render: "Mentor added successfully!", type: "success", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
        } catch (error) {
            toast.update(toastId, { render: "Error adding mentor!", type: "error", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
            console.error(error);
        }
    }
    return (
        <div className="w-full md:w-1/5 rounded text-white overflow-hidden shadow-lg p-4 m-4 bg-slate-700 flex flex-col">
            <img className="w-24 h-24 rounded-full mx-auto" src={Image ? Image : "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg"} alt={`${Name}'s profile`} />
            <div className="text-center mt-4 flex-grow">
                <hr />
                <h2 className="text-xl font-bold text-left truncate">{Name}</h2>
                <p className="text-gray-200 text-left text-sm truncate"><b>Bio: </b>{Bio}</p>
                <p className="text-gray-200 text-left text-sm truncate"><b>Role: </b>{Role}</p>
            </div>
            <div className={`mt-4 ${use === "MyFriend" ? 'flex w-full justify-around' : ''}`}>
                {use === "MyFriend" ? (
                    <>
                        <button className="py-2 px-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleAddMentor}>
                            Message
                        </button>
                        <button className="py-2 px-2 bg-red-500 text-white rounded hover:bg-red-400" onClick={handleRemoveMentor}>
                            Remove
                        </button>
                    </>
                ) : (
                    <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleAddMentor}>
                        {use === "MyFriend" ? "Message" : "Add Mentor"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;