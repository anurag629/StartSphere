import React, { useEffect, useState } from 'react';
import RoutesConfig from './routes';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './feature/authSlice';
import { addPost } from './feature/postSlice'
import api from './api/axios';
import { setProfile } from './feature/profileSlice'
import { addStartup } from './feature/startupSlice'

const fetchAllDummyStartups = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const companies = [
    {
      _id: "6654531473ec8b947f3ff669",
      User: "6656b0023574bce7a4c10d24",
      StartUpName: "Creative Intell",
      Logo: "CI_LOGO_001",
      FounderName: "John Doe",
      CompanyDes: "Creative Intell is the artificial intelligence-powered dealmaking platform for the music industry.",
      FoundingYear: 2015,
      Growth: [
        {
          Revenue: 800000,
          Year: 2020,
          _id: "6654531473ec8b947f3ff66a"
        }
      ],
      NumberOfEmployees: 10,
      TargetMarket: "Music Industry",
      CurrentStage: "Growth",
      KeyFeatures: "AI-powered dealmaking, Music Industry Focus",
      Inverstors: "Venture Capital X",
      Evaluation: 2345,
      Revenue: 800000,
      FundingRaised: [
        {
          CompanyName: "Venture Capital X",
          EquityHolds: 20,
          Amount: 800000,
          _id: "6654531473ec8b947f3ff66b"
        }
      ],
      ContactInformation: {
        CompanyEmail: "contact@creativeintell.com",
        Phone: "123-456-7890",
        LinkedInProfile: "linkedin.com/company/creative-intell",
        CompanyWebsite: "creativeintell.com",
        OfficeAddress: "123 Music Ave, New York, NY, USA"
      },
      __v: 0
    },
    {
      _id: "6654531473ec8b947f3ff559",
      User: "66545304741adf02fe04140a",
      StartUpName: "SpaceX",
      Logo: "CI_LOGO_001",
      FounderName: "Elon Musk",
      CompanyDes: "Creative Intell is the artificial intelligence-powered dealmaking platform for the music industry.",
      FoundingYear: 2010,
      Growth: [
        {
          Revenue: 800000,
          Year: 2020,
          _id: "6654531473ec8b947f3ff66a"
        }
      ],
      NumberOfEmployees: 10,
      TargetMarket: "Music Industry",
      CurrentStage: "Growth",
      KeyFeatures: "AI-powered dealmaking, Music Industry Focus",
      Inverstors: "Venture Capital X",
      Evaluation: 2345,
      Revenue: 800000,
      FundingRaised: [
        {
          CompanyName: "Venture Capital X",
          EquityHolds: 20,
          Amount: 800000,
          _id: "6654531473ec8b947f3ff66b"
        }
      ],
      ContactInformation: {
        CompanyEmail: "contact@creativeintell.com",
        Phone: "123-456-7890",
        LinkedInProfile: "linkedin.com/company/creative-intell",
        CompanyWebsite: "creativeintell.com",
        OfficeAddress: "123 Music Ave, New York, NY, USA"
      },
      __v: 0
    },
  ]
  return companies
}

const fetchAllPosts = async (token) => {
  try {
    const response = await api.get(`post/all`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    if (response && response.data) {
      console.log("All posts::", response.data);
      return response.data;
    }
    else {
      console.log("No data found")
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

const App = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.userData)

  //user
  useEffect(() => {
    const checkUserData = () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("App.jsx/userData::", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserData();
  }, [dispatch]);

  // posts
  useEffect(() => {
    const fetchPosts = async () => {
      if (!user || !user.Token) {
        console.log("User not found");
        return;
      }

      try {
        console.log("Fetching posts Please wait...");
        const posts = await fetchAllPosts(user.Token);
        if (posts.length > 0) {
          posts.forEach(post => dispatch(addPost(post)));
        }
      } catch (error) {
        console.error("App.jsx/fetchPosts::", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user, dispatch]);

  // profile
  useEffect(() => {
    const getProfile = async () => {
      if (!user || !user._id || !user.Token) {
        console.log("Profile not found")
        return
      }
      try {
        const response = await api.get(`/profile/${user._id}`, {
          headers: {
            Authorization: `Bearer ${user.Token}`
          }
        });
        if (response) {
          console.log("User Profile::", response);
          dispatch(setProfile(response.data));
        }
      } catch (error) {
        console.error("App.jsx/getProfile::", error);
      }
    }
    getProfile()
  }, [user, dispatch])

  // startups
  useEffect(() => {
    const fetchStartups = async () => {
      if (!user || !user.Token) {
        console.log("User not found");
        return;
      }

      try {
        console.log("Fetching startups Please wait...");
        const startups = await fetchAllDummyStartups();
        console.log("All Startups: ", startups)
        if (startups.length > 0) {
          startups.forEach(startup => dispatch(addStartup(startup)));
        }
      } catch (error) {
        console.error("App.jsx/fetchStartups::", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, [user, dispatch]);

  return (
    <div className="App">
      <RoutesConfig />
    </div>
  );
};

export default App;