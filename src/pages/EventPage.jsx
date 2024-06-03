import EventCard from "../components/Event/EventCard";
import Footer from "../components/Home/Footer";
import Navbar from "../components/Home/Navbar";

import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";

const EventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/event/all");
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-800">
      <Navbar />
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-5xl font-bold m-8 text-center text-white">Upcoming Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard
              key={event._id}
              _id={event._id}
              title={event.Name}
              subtitle={event.Description}
              date={new Date(event.Date).toLocaleDateString()}
              location={event.Venue}
              type={event.isFree ? "Free" : "Paid"}
              buttonText={event.isFree ? "Join for Free" : "Join for $" + event.price}
              isClosed={false} // You can add logic to determine if the event is closed
              qrCode={null} // Add QR code logic if necessary
              image={event.Image}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default EventPage;
