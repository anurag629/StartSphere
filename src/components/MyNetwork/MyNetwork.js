import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import SearchBar from './SearchBar';
import Navbar from '../Home/Navbar';
import FriendSuggestion from './FriendSuggestion';
import MyFriends from './MyFriends';
import SearchProfile from './SearhProfile';
const MyNetwork = () => {
    const [profiles, setProfiles] = useState([]);
    const [menuSelect, setMenuSelect] = useState('AddFriend');
    const [search,setSearch]= useState()
 

    const renderContent = () => {
        switch (menuSelect) {
            case 'MyFriends':
                return <MyFriends />;
            case 'AddFriend':
                return <FriendSuggestion />;
            case 'Requests':
                return <div>Requests Component</div>;
            case 'search':
                return <SearchProfile search={search}/>
            case 'Groups':
                return <div>Groups Component</div>;
            default:
                return <div>Select a menu item</div>;
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-800 p-4 flex">
                <div className="w-1/4 p-4">
                    <Menu setMenuSelect={setMenuSelect} />
                </div>
                <div className="w-3/4 h-full p-4">
                    <SearchBar search={search} setSearch={setSearch} setMenuSelect={setMenuSelect} />
                    {renderContent()}
                </div>
            </div>
        </>
    );
};

export default MyNetwork;
