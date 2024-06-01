import React, { useEffect, useState } from 'react';
import RoutesConfig from './routes';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './feature/authSlice';
import { addPost } from './feature/postSlice'
import api from './api/axios';
import { setProfile } from './feature/profileSlice'
import { addStartup } from './feature/startupSlice'
import { addArticle } from './feature/articleSlice';

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

const fetchAllDummyArticles = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const articlesData = [
    {
      id: 1,
      title: 'How to Start a Startup',
      Author: {
        Name: "Gavnish Kumar",
        Email: "gk991789@gmail.com",
        Bio: "MERN stack developer",
        Image: "https://ik.imagekit.io/gavnish/test-upload_CiFZbPc0-.png?updatedAt=1691840962857",
        _id: "sdjfljlefee"
      },
      content: [
        { type: 'heading', value: '9 Steps to Help You Start a Startup' },
        { type: 'text', value: '9 Steps to Help You Start a StartupIf you’ve never started a business, the first time can be a little scary. Especially because it takes a lot of hard work and planning. On top of this, only about half of all businesses survive five years or longer Luckily, there are 9 basic strategies for startups you can follow to help get your company up and running:' },
        { type: 'subHeading', value: '1. Start with a Great Idea' },
        { type: 'text', value: 'Your first step in learning how to start a business is to identify a problem and solution. This is because successful startups begin from business ideas that fill the needs of a group of customers. But your idea doesn’t always have to be a new one. You can update existing products or services in a way that’s better for the consumer. This can be as simple as:' },
        { type: 'List', value: 'Changing the product’s appearance' },
        { type: 'List', value: 'Adding a new feature' },
        { type: 'List', value: 'Finding a new use for a product that customers already love' },
        { type: 'text', value: 'For instance, Apple started from Steve Jobs’ original idea for a computer and has since created enhanced versions that better fit the market. They’ve also continued to evolve newer products like iPhones and iPads, making them more useful with each update. One example is how they’re adding a keyboard for iPads that’ll make them easier to use like a laptop.2 All these innovations by Apple led to them being worth of over a billion dollars.' },
        { type: 'image', value: 'https://img.freepik.com/free-vector/businessman-with-great-idea_1012-219.jpg' },
        { type: 'text', value: '2. Make a Business Plan ' },
        { type: 'text', value: 'Once you have an idea, you’ll want to start building a business plan that describes your products and services in detail. It should include information on your industry, operations, finances and a market analysis.Writing a business plan is also important for getting financing for your startup. Banks are more likely to give loans to companies that can clearly explain how they’re going to use the money and why they need it.' },
        { type: 'subHeading', value: '3.Secure Funding for Your Startup' },
        { type: 'text', value: 'The cost of a startup is different for every business owner. However, no matter what your costs are, you’ll likely need to get startup financing from:' },
        { type: "List", value: 'Friends and family' },
        { type: "List", value: 'Angel investors' },
        { type: "List", value: 'Venture capitalists' },
        { type: "List", value: 'Bank loans' },
        { type: 'text', value: 'You can also apply for a business credit card. Many companies offer 0% APR promotions, which means you won’t pay interest on your purchases if you pay off the balance before the end of the offer period. We’ve partnered with Fundera, which put together a list of the top credit cards offering 0% interest rates.If you don’t get the right amount of funding or can’t raise money for your business, you’ll risk not being able to pay your operating costs. This may cause you to close your doors. In fact, it’s estimated that 29% of startups fail because they run out of money.3 To make sure you get the right amount, you’ll want to estimate your costs and cash flow, including the interest rates on your loans. Once you do that, you can use QuickBooks or FreshBooks to track your expenses and help you stick to a budget.' },
        { type: 'image', value: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5n60yANxR4o6dZcW6ZOYwaXaZMajLQY51w&s' },
        { type: 'subHeading', value: '4. Surround Yourself With the Right People' },
        { type: 'text', value: 'There can be a lot of risk in starting a business. That’s why you’ll need essential business advisors to help guide you along the way, like:' },
        { type: 'List', value: 'Attorneys' },
        { type: 'List', value: 'Certified Public Accountants (CPAs)' },
        { type: 'List', value: 'Insurance professionals' },
        { type: 'List', value: 'Bankers' },
        { type: 'text', value: 'Building the right startup team is especially important in the early stages of small businesses. This means you’ll want to carefully select your' },
        { type: 'List', value: 'Co-founders' },
        { type: 'List', value: 'Contractors' },
        { type: 'List', value: 'Initial employees, including remote workers' },
        { type: 'video', value: 'https://youtu.be/CBYhVcO4WgI' }
      ]
    },
    {
      id: 2, title: 'Tips for New Entrepreneurs', Author: {
        Name: "Gavnish Kumar",
        Email: "gk991789@gmail.com",
        Bio: "MERN stack developer",
        Image: "https://ik.imagekit.io/gavnish/test-upload_CiFZbPc0-.png?updatedAt=1691840962857",
        _id: "sdjfljlefee"
      }, content: [
        { type: 'text', value: 'Important tips for new entrepreneurs.' },
        { type: 'image', value: 'https://ik.imagekit.io/gavnish/test-upload_CiFZbPc0-.png?updatedAt=1691840962857' },
        { type: 'video', value: 'video2.mp4' },
        { type: 'text', value: 'Additional advice and tips.' }
      ]
    }
  ];
  return articlesData
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

  // articles
  useEffect(() => {
    const fetchArticles = async () => {
      if (!user || !user.Token) {
        console.log("User not found");
        return;
      }

      try {
        console.log("Fetching articles Please wait...");
        const articles = await fetchAllDummyArticles();
        console.log("All Articles: ", articles)
        if (articles.length > 0) {
          articles.forEach(article => dispatch(addArticle(article)));
        }
      } catch (error) {
        console.error("App.jsx/fetchArticles::", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [user, dispatch]);

  return (
    <div className="App">
      <RoutesConfig />
    </div>
  );
};

export default App;