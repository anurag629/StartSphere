import React from 'react';
import { Card, Dropdown, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

function convertTimeFormat(isoString) {
  const date = new Date(isoString);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const daySuffix = getDaySuffix(day);

  return `${month} ${day}${daySuffix}, ${year} at ${hours}:${minutes} ${ampm}`;
}

function getDaySuffix(day) {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

const PostCard = ({ post }) => {
  const { _id, User, Title, Image, Description, createdAt, updatedAt, Likes, Comments } = post;

  return (
    <Card className="max-w-7xl bg-slate-900 shadow-lg mb-4 text-white">
      <Link to={`/post/${_id}`}>
        <div className="">
          <div className="flex items-center space-x-4">
            {User.Image && (
              <img
                src={User.Image}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
            )}
            <div className="flex flex-col">
              {/* <Link to={`/profile/${User._id}`}> */}
              <h5 className="text-lg font-semibold">{User.Name}</h5>
              {/* </Link> */}
              <span className="text-sm text-slate-400">{User.Bio}</span>
              <span className="text-xs text-slate-400">{convertTimeFormat(updatedAt)} • Edited</span>
            </div>
          </div>
          <div className="border-b border-gray-400 w-full mb-2 mt-4"></div>
          <p className="mt-4 mb-4 text-sm">{Description.substring(0,350)}{}...see more</p>
          {Image && (
            <div className="mb-3">
              <img src={Image} alt="Post" className="w-full h-96 rounded-lg" />
            </div>
          )}
          {/* <div className="border-b border-gray-400 w-full mb-2"></div> */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="flex items-center text-red-500 hover:text-red-700">
                <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {Likes}
              </button>
              <button className="flex items-center text-blue-500 hover:text-blue-700">
                <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 15h12a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2h2l4 4v-4zM6 6h12v6H6V6z" />
                </svg>
                {Comments.length}
              </button>
              <button className="flex items-center text-blue-500 hover:blue-green-900">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0,0,256,256">
                  <g fill="#2872FBE3" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(8,8)"><path d="M21.33203,4.29297l-1.41406,1.41406l4.29297,4.29297h-2.21094c-7.16797,0 -13,5.83203 -13,13h2c0,-6.08594 4.91406,-11 11,-11h2.21094l-4.29297,4.29297l1.41406,1.41406l6.70703,-6.70703zM5,11v16h22v-6h-2v4h-18v-14z"></path></g></g>
                </svg>
                {Comments.length}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default PostCard;
