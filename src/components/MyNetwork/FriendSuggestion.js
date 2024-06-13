import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useSelector } from 'react-redux';
import ProfileCard from './ProfileCard';
const FriendSuggestion = () => {

  const [profiles, setProfiles] = useState([]);
  const profileData = useSelector((state) => state.profile.profile);

  useEffect(() => {
    // Replace this with your API call to fetch matched profiles
    const FetchSuggestedMentors=async()=>{
        const suggestedMentors= await api.get(`/profile/suggestion/${profileData._id}`)
        setProfiles(suggestedMentors.data);
        console.log(suggestedMentors.data)
    }
    FetchSuggestedMentors()
  }, []);
    return (
        <div className="flex flex-wrap">
            {/* <div>Chal rha hai</div> */}
        {profiles.map(profile => (
            <ProfileCard key={profile._id} profiles={profiles} profile={profile} setProfiles={setProfiles} />
        ))}
    </div>
    );
};

export default FriendSuggestion;
