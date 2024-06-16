// src/components/ProfileList.js
import React, { useEffect, useState } from 'react';
import MentorsCard from './MetorsCard';
import { useSelector } from 'react-redux';
import api from '../../api/axios';

const Mentors = () => {
  const [profiles, setProfiles] = useState([]);
  const profileData = useSelector((state) => state.profile.profile);

  useEffect(() => {
    // Replace this with your API call to fetch matched profiles
    const FetchSuggestedMentors=async()=>{
        const suggestedMentors= await api.get(`/profile/suggestion/${profileData?._id}`)
        setProfiles(suggestedMentors.data);
        console.log(suggestedMentors.data)
    }
    FetchSuggestedMentors()
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-white font-bold text-center mb-8">Add Mentors with similar profile</h1>
      <div className="flex flex-wrap justify-center">
        {profiles && profiles.map(profile => (
          <MentorsCard key={profile._id} setProfiles={setProfiles} profiles={profiles} profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default Mentors;
