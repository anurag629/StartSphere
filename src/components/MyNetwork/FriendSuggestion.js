import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useSelector } from 'react-redux';
import ProfileCard from './ProfileCard';
import LoadingSkeleton from './Skeleton/LoadingSkeleton';
const FriendSuggestion = () => {

  const [profiles, setProfiles] = useState([]);
  const profileData = useSelector((state) => state.profile.profile);
    const [isLoading,setIsLoading] = useState(false);
  useEffect(() => {
    // Replace this with your API call to fetch matched profiles
    const FetchSuggestedMentors=async()=>{
        setIsLoading(true)
        try {
            const suggestedMentors= await api.get(`/profile/suggestion/${profileData._id}`)
            setProfiles(suggestedMentors.data);
        } catch (error) {
            console.log(error)
        }
       setIsLoading(false)
    }
    FetchSuggestedMentors()
  }, []);
    return (
        <div className="flex flex-wrap">
          
            {isLoading? <LoadingSkeleton/>: profiles.map(profile => (
            <ProfileCard key={profile._id} profiles={profiles} profile={profile} setProfiles={setProfiles} />
        ))}
        
    </div>
    );
};

export default FriendSuggestion;
