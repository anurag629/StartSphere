import React, { useEffect, useState } from 'react'
import ProfileCard from './ProfileCard'
import api from '../../api/axios';
import { useSelector } from 'react-redux';

function MyFriends() {
    const [profiles,setProfiles] = useState([])
  
  const profileData = useSelector((state) => state.profile.profile);

  useEffect(() => {
    // Replace this with your API call to fetch matched profiles
    const FetchSuggestedMentors=async()=>{
        const suggestedMentors= await api.get(`/profile/my-mentors/${profileData._id}`)
        setProfiles(suggestedMentors.data);
        // console.log(suggestedMentors.data)
    }
    FetchSuggestedMentors()
  }, []);
  return (
    <div className="flex flex-wrap">
                {profiles.map(profile => (
                    <ProfileCard key={profile._id} profiles={profiles} profile={profile} use={"MyFriend"} setProfiles={setProfiles} />
            ))}
        </div>
  )
}

export default MyFriends