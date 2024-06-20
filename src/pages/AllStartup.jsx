import React, { useEffect } from "react";
import FilterData from "../components/Startup/FilterData";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import { addStartup } from '../feature/startupSlice';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/axios';

const fetchAllStartups = async () => {
  try {
    const response = await api.get(`startup/all`);
    if (response.status === 200 && response.data.startUps) {
      return response.data.startUps;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

const AllStartup = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData) || null;
  const startups = useSelector(state => state.startups.startups);

  // Fetch startups
  useEffect(() => {
    const fetchStartups = async () => {
      if (!user || !user.Token) {
        return;
      }

      if (startups.length === 0) {
        try {
          const fetchedStartups = await fetchAllStartups();
          fetchedStartups.forEach(startup => dispatch(addStartup(startup)));
        } catch (error) {
          console.error("App.jsx/fetchStartups::", error);
        }
      }
    };

    fetchStartups();
  }, [user, dispatch, startups.length]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-800">
      <Navbar />
      <main className="flex-grow p-4 px-8 relative">
        <FilterData />
      </main>
      <Footer />
    </div>
  );
};

export default AllStartup;
