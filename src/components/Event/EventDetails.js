import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const { title } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`api/event/${title}`);
        setEvent(response.data.event);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event:", error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [title]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <img src={event.Image} alt={event.Name} className="w-full rounded-md mb-4" />
        <h1 className="text-3xl font-bold mb-2 text-center text-teal-600">
          {event.Name}
        </h1>
        <p className="text-gray-600 text-center mb-4">{event.Description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <h2 className="text-lg font-bold mb-2">Date:</h2>
          <p className="text-gray-600">{new Date(event.Date).toLocaleDateString()}</p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Time:</h2>
          <p className="text-gray-600">{event.Time}</p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Venue:</h2>
          <p className="text-gray-600">{event.Venue}</p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Organizer:</h2>
          <p className="text-gray-600">{event.Organizer}</p>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Speakers:</h2>
        <ul>
          {event.Speakers.map((speaker, index) => (
            <li key={index} className="mb-2">
              <p className="text-gray-600">{speaker}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-2">Price:</h2>
        <p className="text-gray-600">{event.isFree ? "Free" : `$${event.price}`}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">Attendees:</h2>
        <ul>
          {event.Attendees.map((attendee) => (
            <li key={attendee._id} className="mb-2">
              <p className="text-gray-600">
                {attendee.Name} ({attendee.Email})
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventDetails;
