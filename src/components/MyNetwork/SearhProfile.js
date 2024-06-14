import React, { useEffect, useState } from 'react'
import ProfileCard from './ProfileCard'
import api from '../../api/axios';
import axios from 'axios';

function SearchProfile({search}) {
    const [profiles,setProfiles] = useState([])
    console.log("my search" ,search)
  useEffect(() => {

    const FetchSuggestedMentors=async()=>{
        const searchData= await api.post('/profile/search',{searchText: search})
        setProfiles(searchData.data);
    }
    FetchSuggestedMentors()
  }, [search]);
  return (
    <div className="flex flex-wrap">
                {profiles.map(profile => (
                    <ProfileCard key={profile._id} profiles={profiles} profile={profile} use={"FriendSuggestion"} setProfiles={setProfiles} />
            ))}
        </div>
  )
}

export default SearchProfile