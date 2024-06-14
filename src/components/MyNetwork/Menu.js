import React, { useState } from 'react';

const Menu = ({ setMenuSelect }) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('AddFriend');

    const handleUpdateMenuSelect = (e) => {
        e.preventDefault();
        const selectedItem = e.target.name;
        setSelectedMenuItem(selectedItem);
        setMenuSelect(selectedItem);
    };

    const getButtonClass = (menuItem) => {
        return selectedMenuItem === menuItem 
            ? "text-left w-full text-white bg-gray-500 rounded p-2" 
            : "text-left w-full text-white hover:bg-gray-400 rounded p-2";
    };

    return (
        <div className="bg-slate-700 text-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl mb-4">Menu</h2>
            <ul>
                <li className="mb-2">
                    <button
                        name='MyFriends'
                        onClick={handleUpdateMenuSelect}
                        className={getButtonClass('MyFriends')}
                    >
                        My Mentors
                    </button>
                </li>
                <li className="mb-2">
                    <button
                        name='AddFriend'
                        onClick={handleUpdateMenuSelect}
                        className={getButtonClass('AddFriend')}
                    >
                        Add New Mentor
                    </button>
                </li>
                <li className="mb-2">
                    <button
                        name='Requests'
                        onClick={handleUpdateMenuSelect}
                        className={getButtonClass('Requests')}
                    >
                        Requests
                    </button>
                </li>
                <li className="mb-2">
                    <button
                        name='Groups'
                        onClick={handleUpdateMenuSelect}
                        className={getButtonClass('Groups')}
                    >
                        Groups
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
