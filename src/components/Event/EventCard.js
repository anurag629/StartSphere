import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({
  _id,
  title,
  subtitle,
  date,
  location,
  type,
  buttonText,
  isClosed,
  qrCode,
  image,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // 
    const encodedTitle = encodeURIComponent(title);
    navigate(`/events/${encodedTitle}`);
  };

  return (
    <div className="rounded-lg shadow-md p-4 bg-slate-900">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="text-sm font-medium text-white">{type}</span>
          {isClosed ? (
            <span className="ml-2 px-2 py-1 rounded-full bg-gray-200 text-white text-xs font-medium">
              Ended
            </span>
          ) : (
            <span className="ml-2 px-2 py-1 rounded-full bg-green-200 text-green-700 text-xs font-medium">
              Ongoing
            </span>
          )}
        </div>
      </div>
      <img src={image} alt={title} className="w-full rounded-md mb-4 " />
      <h2 className="text-lg font-bold text-white mb-2">{title}</h2>
      <p className="text-white mb-4">{subtitle}</p>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-white mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14m0-5M5 11h14m0-5"
            />
          </svg>
          <span className="text-white">{date}</span>
        </div>
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-white mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.914a2 2 0 01-2.828 0L6.343 13.657c-.742-.742-1.25-1.76-1.25-2.791V7a2 2 0 012-2h3m2 12V7l.042-.043a2 2 0 01.742-.742L17.657 16.657z"
            />
          </svg>
          <span className="text-white">{location}</span>
        </div>
      </div>
      {qrCode && (
        <div className="mb-4">
          <img src={qrCode} alt="QR Code" className="w-24 h-24" />
        </div>
      )}
      <button
        onClick={handleClick}
        className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
          isClosed ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700 text-white"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default EventCard;