import React from "react";

const EventDetails = ({ event }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">{event.title}</h1>
      <div className="flex items-center mb-4">
        <img src={event.qrCode} alt="QR Code" className="w-24 h-24 mr-4" />
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{event.subtitle}</h2>
          <p className="text-gray-600">{event.date}</p>
          <p className="text-gray-600">{event.location}</p>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Description</h2>
        <p className="text-gray-600">{event.description}</p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Prizes</h2>
        <p className="text-gray-600">{event.prizes}</p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Registration</h2>
        <p className="text-gray-600">{event.registration}</p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Contact</h2>
        <p className="text-gray-600">{event.contact}</p>
      </div>
    </div>
  );
};

export default EventDetails;
