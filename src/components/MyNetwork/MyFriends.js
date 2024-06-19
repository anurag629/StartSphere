import React, {  useEffect, useState } from 'react'
import ProfileCard from './ProfileCard'
import api from '../../api/axios';
import LoadingSkeleton from './Skeleton/LoadingSkeleton';
import { useSelector } from 'react-redux';

function MyFriends() {
    const [profiles,setProfiles] = useState([])
    const [isLoading,setIsLoading] = useState(false);
  const profileData = useSelector((state) => state.profile.profile);


  useEffect(() => {
    // Replace this with your API call to fetch matched profiles
    const FetchSuggestedMentors=async()=>{
      setIsLoading(true)
      try {
        const suggestedMentors= await api.get(`/profile/my-mentors/${profileData._id}`)
        setProfiles(suggestedMentors.data);
      } catch (error) {
        console.log(error)
      }
        setIsLoading(false);
    }
    FetchSuggestedMentors()
  }, []);
  return (
    <div className="flex flex-wrap">
      {isLoading? <LoadingSkeleton/>: profiles.map(profile => (
                    <ProfileCard key={profile._id} profiles={profiles} profile={profile} use={"MyFriend"} setProfiles={setProfiles} />
            ))}
                
        </div>
  )
}

export default MyFriends