import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Badge, Button } from "flowbite-react";

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
    navigate(`/events/${_id}`);
  };

  return (
    <Card className="max-w-sm bg-slate-800 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <Badge color='yellow'>{type}</Badge>
          <Badge color={isClosed ? "gray" : "green"}>
            {isClosed ? "Ended" : "Ongoing"}
          </Badge>
        </div>
      </div>
      <img src={image} alt={title} className="w-full rounded-md mb-4" />
      <h2 className="text-lg font-bold text-white mb-2">{title}</h2>
      <p className="text-white mb-4 text-sm">
        {subtitle.length > 200 ? `${subtitle.substring(0, 200)}... ` : subtitle}
        {subtitle.length > 200 && (
          <Link to={`/events/${_id}`} className="text-blue-500 hover:underline">
            see more
          </Link>
        )}
      </p>
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
      <Button
        onClick={handleClick}
        className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isClosed ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
        disabled={isClosed}
      >
        {buttonText}
      </Button>
    </Card>
  );
};

export default EventCard;
