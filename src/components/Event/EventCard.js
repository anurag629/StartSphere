import React from "react";

const EventCard = ({
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
  return (
    <div className="rounded-lg shadow-md p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-600">{type}</span>
          {isClosed && (
            <span className="ml-2 px-2 py-1 rounded-full bg-gray-200 text-gray-600 text-xs font-medium">
              Ended
            </span>
          )}
          {!isClosed && (
            <span className="ml-2 px-2 py-1 rounded-full bg-green-200 text-green-600 text-xs font-medium">
              Ongoing
            </span>
          )}
        </div>
      </div>
      <img src={image} alt={title} className="w-full rounded-md mb-4" />
      <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{subtitle}</p>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-gray-400 mr-2"
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
          <span className="text-gray-600">{date}</span>
        </div>
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-gray-400 mr-2"
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
          <span className="text-gray-600">{location}</span>
        </div>
      </div>
      {qrCode && (
        <div className="mb-4">
          <img src={qrCode} alt="QR Code" className="w-24 h-24" />
        </div>
      )}
      {!isClosed && (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {buttonText}
        </button>
      )}
      {isClosed && (
        <button className="bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EventCard;
