import React, { useEffect, useState } from 'react';
import 'flowbite';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { deleteEvent, updateEvent } from '../../feature/eventSlice';
import api from '../../api/axios';
import { Button, Select, Datepicker, Modal, TextInput, Label, Checkbox } from "flowbite-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EventsDetails() {

  const dispatch = useDispatch();
  const allEvents = useSelector(state => state.events.events);
  const [event, setEvent] = React.useState(null);
  const navigate = useNavigate();
  const EventId = useParams()?.title || null;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updatedEvent, setUpdatedEvent] = useState({
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

  useEffect(() => {
    if (allEvents && EventId) {
      const event = allEvents.find(event => event._id === EventId);
      if (event) {
        setEvent(event);
        setUpdatedEvent(event);
        // for date input
        setUpdatedEvent((prevEvent) => ({
          ...prevEvent,
          Date: event.Date.slice(0, 10),
        }));
      }
    }
    else {
      navigate('/events');
    }
  }, [allEvents, EventId, navigate])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdateEvent = async () => {
    const toastId = toast.loading("Please wait...");
    try {
      const response = await api.put(`/event/update/${event._id}`, updatedEvent);
      dispatch(updateEvent(response.data.event));
      setIsModalOpen(false);
      toast.update(toastId, { render: "Event updated successfully!", type: "success", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
    } catch (error) {
      console.error("Error updating event:", error);
      toast.update(toastId, { render: "Error in updating event!", type: "error", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
    }
  }

  const handleDelete = async () => {
    const toastId = toast.loading("Please wait...");
    try {
      await api.delete(`/event/delete/${event._id}`);
      dispatch(deleteEvent(event._id));
      navigate('/events');
      toast.update(toastId, { render: "Event deleted successfully!", type: "success", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
    } catch (error) {
      toast.update(toastId, { render: "Error in deleting event!", type: "error", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <main className="flex-grow bg-gray-800">
        <div className="bg-gray-900 text-white min-h-screen">
          <header className="bg-cover bg-center h-96" style={{ backgroundImage: `url(${event?.Image})` }}>
            <div className="bg-black bg-opacity-60 h-full flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-5xl font-bold">{event?.Name}</h1>
              <p className="text-lg mt-2 text-slate-300">Organized by {event?.Organizer}</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                <a href={event?.Link} target="_blank" rel="noopener noreferrer">Register now</a>
              </button>
            </div>
          </header>

          <div className="bg-gray-800 p-4">
            <div className="flex flex-wrap justify-around">
              <div className="text-center p-4">
                <h2 className="text-3xl font-bold">{event?.Venue}</h2>
                <p>VENUE</p>
              </div>
              <div className="text-center p-4">
                <h2 className="text-2xl font-bold">{new Date(event?.Date).toLocaleDateString()}</h2>
                <p>DATE</p>
              </div>
              <div className="text-center p-4">
                <h2 className="text-2xl font-bold">{event?.Time}</h2>
                <p>TIME</p>
              </div>
              <div className="text-center p-4">
                <h2 className="text-2xl font-bold">{event?.isFree ? "Free" : `$${event?.price}`}</h2>
                <p>PRICE</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h2 className="text-3xl font-bold text-center mb-4">About the Event</h2>
            <p className="text-center mx-auto max-w-prose">
              {event?.Description}
            </p>
          </div>

          <div className="p-4">
            <h2 className="text-3xl font-bold text-center mb-4">Speakers</h2>
            <p className="text-center mx-auto max-w-prose">
              {event?.Speakers.join(", ")}
            </p>
          </div>

          <div className="p-4 flex justify-center space-x-2">
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete Event
            </button>
            <button onClick={() => setIsModalOpen(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Edit Event
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Update an Event</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <TextInput id="name" name="Name" value={updatedEvent.Name} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <TextInput id="date" name="Date" type="date" value={updatedEvent.Date} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
              {/* <input id="date" name="Date" type="date" value={updatedEvent.Date} onChange={handleChange} className="mt-1 bg-gray-700 text-white" /> */}
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <TextInput id="time" name="Time" type="time" value={updatedEvent.Time} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
            </div>
            <div>
              <Label htmlFor="venue">Venue</Label>
              <TextInput id="venue" name="Venue" value={updatedEvent.Venue} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <TextInput id="description" name="Description" value={updatedEvent.Description} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <TextInput id="image" name="Image" value={updatedEvent.Image} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
            </div>
            <div>
              <Label htmlFor="link">Link</Label>
              <TextInput id="link" name="Link" value={updatedEvent.Link} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
            </div>
            <div className="flex items-center">
              <Checkbox id="isFree" name="isFree" checked={updatedEvent.isFree} onChange={handleChange} />
              <Label htmlFor="isFree" className="ml-2">Is Free</Label>
            </div>
            {!updatedEvent.isFree && (
              <div>
                <Label htmlFor="price">Price</Label>
                <TextInput id="price" name="price" type="number" value={updatedEvent.price} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
              </div>
            )}
            <div>
              <Label htmlFor="organizer">Organizer</Label>
              <TextInput id="organizer" name="Organizer" value={updatedEvent.Organizer} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
            </div>
            <div>
              <Label htmlFor="speakers">Speakers</Label>
              <TextInput id="speakers" name="Speakers" value={updatedEvent.Speakers} onChange={handleChange} className="mt-1 bg-gray-700 text-white" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleUpdateEvent} className="bg-purple-600">Update</Button>
          <Button onClick={() => setIsModalOpen(false)} className="bg-gray-600">Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EventsDetails;
