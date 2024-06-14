import React, { useState } from 'react';

const SearchBar = ({search,setSearch,setMenuSelect}) => {
    const handleSearch= ()=>{
        setMenuSelect("search");
    }
    return (
        <div className="flex items-center bg-slate-600 p-4 rounded shadow-md mb-4">
            <input
                type="text"
                placeholder="Search friends..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="flex-grow px-4 py-2 border rounded-l"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r" onClick={handleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.65 13.65A7.5 7.5 0 1113.65 3.65a7.5 7.5 0 013.5 10" />
                </svg>
            </button>
        </div>
    );
};

export default SearchBar;
