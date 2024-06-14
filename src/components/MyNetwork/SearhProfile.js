import React, { useEffect, useState } from 'react'
import ProfileCard from './ProfileCard'
import api from '../../api/axios';
import LoadingSkeleton from './Skeleton/LoadingSkeleton';
function SearchProfile({search}) {
    const [profiles,setProfiles] = useState([])
    const [isLoading,setIsLoading] = useState(false);
    console.log("my search" ,search)
  useEffect(() => {

    const FetchSuggestedMentors=async()=>{
        setIsLoading(true)
        try {
            const searchData= await api.post('/profile/search',{searchText: search})
            setProfiles(searchData.data);
        } catch (error) {
            console.log(error)
        }
       setIsLoading(false)
    }
    FetchSuggestedMentors()
  }, [search]);
  return (
    <div className="flex flex-wrap">
                 {isLoading? <LoadingSkeleton/>: profiles.map(profile => (
            <ProfileCard key={profile._id} profiles={profiles} profile={profile} setProfiles={setProfiles} />
        ))}
        </div>
  )
}

export default SearchProfile