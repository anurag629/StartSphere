import React, { useState } from "react";
import EventCard from "../components/Event/EventCard";
import Footer from "../components/Home/Footer";
import Navbar from "../components/Home/Navbar";
import EventDetails from "../components/Event/EventDetails";

const events = [
  {
    id: 1,
    title: "Nirman 2024 - 24 hours hackathon |...",
    subtitle:
      "This 24-hour competition challenges teams to develop solutions based on...",
    date: "4/22/2024",
    location: "Amity University, Mumbai",
    type: "Hackathon",
    buttonText: "Registration Closed",
    isClosed: true,
    image: "https://via.placeholder.com/300x200.png?text=Event+1",
    qrCode: null,
  },
  {
    id: 2,
    title: "CodeX-24 - Tranforming Ideas...",
    subtitle: "Code X 24 is a 24 hour hackathon challenge for participants to expand...",
    date: "10th and 11th May 2024",
    location: "Panipat Institute of Technology",
    type: "Hackathon",
    buttonText: "Participate Now!",
    isClosed: false,
    image: "https://via.placeholder.com/300x200.png?text=Event+2",
    qrCode: null,
  },
  {
    id: 3,
    title: "CODE GLADIATORS 2024",
    subtitle:
      "Code Gladiators is TechGig's annual coding event and has become a global stage for coding talent over the past decade. With challenges covering the latest tech....",
    date: "3/25/2024",
    location: "Online",
    type: "Other",
    buttonText: "Register Now!",
    isClosed: false,
    image: "https://via.placeholder.com/300x200.png?text=Event+3",
    qrCode: null,
  },
  {
    id: 4,
    title: "Strategies for Scaling Productivit...",
    subtitle:
      "Hackathon hero Priyanshu Pandey, SIH Winner 2019 and Senior Software Engineer...",
    date: "4/20/2024",
    location: "Online",
    type: "Workshop",
    buttonText: "Registration Closed",
    isClosed: true,
    image: "https://via.placeholder.com/300x200.png?text=Event+4",
    qrCode: null,
  },
];

const EventPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <h1 className="text-5xl font-bold text-gray-800 m-8 text-center ">
        Upcoming Events
      </h1>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventPage;
