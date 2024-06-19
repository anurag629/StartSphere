import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Select, Datepicker, Modal, TextInput, Label, Checkbox } from "flowbite-react";
import EventCard from "../components/Event/EventCard";
import Footer from "../components/Home/Footer";
import Navbar from "../components/Home/Navbar";
import { addEvent, setEvent } from "../feature/eventSlice";
import api from "../api/axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventPage = () => {
  const events = useSelector((state) => state.events.events) || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    Attendees: [],
    Date: "",
    Description: "",
    Image: "",
    Link: "",
    Name: "",
    Organizer: "",
    Speakers: "",
    Time: "",
    Venue: "",
    isFree: false,
    price: 0,
  });
  const [filters, setFilters] = useState({ lookingFor: "", location: "", date: "" });
  const dispatch = useDispatch();

  // fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("Fetching events...");
        const response = await api.get("/event/all");
        dispatch(setEvent(response.data.events));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    if (events.length === 0)
      fetchEvents();
  }, [events.length, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateEvent = async () => {
    const toastId = toast.loading("Please wait...");
    try {
      const response = await api.post("/event/create", newEvent);
      dispatch(addEvent(response.data.event));
      setIsModalOpen(false);
      toast.update(toastId, { render: "Event created successfully!", type: "success", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
    } catch (error) {
      console.error("Error creating event:", error);
      toast.update(toastId, { render: "Error in creating event!", type: "error", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
    }
  };

  const filteredEvents = events.filter((event) => {
    return (
      (filters.lookingFor ? event.Name.includes(filters.lookingFor) : true) &&
      (filters.location ? event.Venue.includes(filters.location) : true) &&
      (filters.date ? event.Date.slice(0, 10) === filters.date : true)
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="relative w-full h-96">
        <img
          src='https://blog.vattan.com/content/images/2022/01/conferences-3.png'
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <div className="flex justify-center space-x-4">
            <div className="flex flex-col items-center">
              <Label htmlFor="looking-for">Looking For</Label>
              <Select
                id="looking-for"
                className="bg-gray-700 text-white rounded-md"
                value={filters.lookingFor}
                onChange={(e) => setFilters({ ...filters, lookingFor: e.target.value })}
              >
                <option value="" className="text-gray-400">Select an option</option>
                <option>Event</option>
                <option>Conference</option>
                <option>Workshop</option>
                <option>Meetup</option>
                <option>Programs</option>
                <option>Pitches</option>
                <option>Meetings</option>
              </Select>
            </div>
            <div className="flex flex-col items-center">
              <Label htmlFor="location">In</Label>
              <Select
                id="location"
                className="bg-gray-700 text-white rounded-md"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              >
                <option value="" className="text-gray-400">Select location</option>
                <option>Bangalore</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
                <option>Pune</option>
                <option>Agra</option>
              </Select>
            </div>
            <div className="flex flex-col items-center">
              <Label htmlFor="date">When</Label>
              {/* <Datepicker
                id="date"
                className="bg-gray-700 text-white rounded-md"
                placeholder="Select date"
                value={filters.date}
                onChange={(date) => setFilters({ ...filters, date: date.target.value })}
              /> */}
              <input
                type="date"
                id="date"
                className="bg-gray-700 text-white text-sm rounded-md"
                placeholder="Select date"
                value={filters.date}
                onChange={(date) => setFilters({ ...filters, date: date.target.value })}
              />
            </div>
          </div>
          <Button className="mt-4 bg-purple-600" onClick={() => setIsModalOpen(true)}>Create an Event</Button>
        </div>
      </div>
      <div className="container mx-auto py-8">
        <h1 className="text-5xl font-bold text-center mb-8">Upcoming Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {filteredEvents.length !== 0 ? filteredEvents.map((event) => (
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
          )) : <p>Opps! No results found🙄</p>}
        </div>
      </div>
      <Footer />
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Create an Event</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <TextInput id="name" name="Name" value={newEvent.Name} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <TextInput id="date" name="Date" type="date" value={newEvent.Date} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
              {/* <input id="date" name="Date" type="date" value={newEvent.Date} onChange={handleChange} className="mt-1 bg-gray-700 text-white" /> */}
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <TextInput id="time" name="Time" type="time" value={newEvent.Time} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
            </div>
            <div>
              <Label htmlFor="venue">Venue</Label>
              <TextInput id="venue" name="Venue" value={newEvent.Venue} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <TextInput id="description" name="Description" value={newEvent.Description} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <TextInput id="image" name="Image" value={newEvent.Image} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
            </div>
            <div>
              <Label htmlFor="link">Link</Label>
              <TextInput id="link" name="Link" value={newEvent.Link} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
            </div>
            <div className="flex items-center">
              <Checkbox id="isFree" name="isFree" checked={newEvent.isFree} onChange={handleChange} />
              <Label htmlFor="isFree" className="ml-2">Is Free</Label>
            </div>
            {!newEvent.isFree && (
              <div>
                <Label htmlFor="price">Price</Label>
                <TextInput id="price" name="price" type="number" value={newEvent.price} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
              </div>
            )}
            <div>
              <Label htmlFor="organizer">Organizer</Label>
              <TextInput id="organizer" name="Organizer" value={newEvent.Organizer} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
            </div>
            <div>
              <Label htmlFor="speakers">Speakers</Label>
              <TextInput id="speakers" name="Speakers" value={newEvent.Speakers} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCreateEvent} className="bg-purple-600">Create</Button>
          <Button onClick={() => setIsModalOpen(false)} className="bg-gray-600">Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventPage;
