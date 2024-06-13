import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import SearchBar from './SearchBar';
import ProfileCard from './ProfileCard';
import Navbar from '../Home/Navbar';
import FriendSuggestion from './FriendSuggestion';
import MyFriends from './MyFriends';

const MyNetwork = () => {
    const [profiles, setProfiles] = useState([]);
    const [menuSelect, setMenuSelect] = useState('AddFriend');

    useEffect(() => {
        console.log(menuSelect);
    }, [menuSelect]);

    const renderContent = () => {
        switch (menuSelect) {
            case 'MyFriends':
                return <MyFriends />;
            case 'AddFriend':
                return <FriendSuggestion />;
            case 'Requests':
                return <div>Requests Component</div>;
            case 'Groups':
                return <div>Groups Component</div>;
            default:
                return <div>Select a menu item</div>;
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-500 p-4 flex">
                <div className="w-1/4 p-4">
                    <Menu setMenuSelect={setMenuSelect} />
                </div>
                <div className="w-3/4 h-full p-4">
                    <SearchBar />
                    {renderContent()}
                </div>
            </div>
        </>
    );
};

export default MyNetwork;
