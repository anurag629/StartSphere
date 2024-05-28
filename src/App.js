import React, { useEffect, useState } from 'react';
import RoutesConfig from './routes';
import { useDispatch } from 'react-redux';
import { login, logout } from './feature/authSlice';
import { addPost } from './feature/postSlice'
import api from './api/axios';

const App = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  // const fetchDummyPosts = async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  //   const posts = [
  //     {
  //       User: '321',
  //       Image: 'https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png',
  //       Title: 'Post 1',
  //       Description: 'This is post 1',
  //       Likes: '10',
  //       _id: '1',
  //       Comments: [],
  //       // userName: 'Anurag Verma',
  //       createdAt: '2021-13-01',
  //       updatedAt: '2021-19-01',
  //     },
  //     { _id: '2', User: '322', Title: 'Post 2', Description: 'This is post 2', Image: 'https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png', createdAt: '2023-01-04', updatedAt: '2024-09-16', Likes: '11', Comments: [] },
  //     { _id: '3', User: '323', Title: 'Post 3', Description: 'This is post 3', Image: 'https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png', createdAt: '2021-09-08', updatedAt: '2023-09-01', Likes: '12', Comments: [] },
  //     { _id: '4', User: '324', Title: 'Post 4', Description: 'This is post 4', Image: 'https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png', createdAt: '2022-22-01', updatedAt: '2023-02-13', Likes: '13', Comments: [] },
  //     { _id: '5', User: '324', Title: 'Post 5', Description: 'This is post 5', Image: 'https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png', createdAt: '2024-19-01', updatedAt: '2024-20-11', Likes: '14', Comments: [] },
  //   ]
  //   return posts
  // }

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        dispatch(login({ userData }))
      } else {
        dispatch(logout())
      }
    } catch (error) {
      console.error("App.jsx/userData::", error)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchAllPosts = async () => {
    console.log("Fetch all posts")
    const token = JSON.parse(localStorage.getItem('user')).Token;
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
        console.log("All posts response::", response.data);
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await fetchAllPosts()
        if (posts.length > 0) {
          console.log("Posts::", posts)
          posts.forEach(post => dispatch(addPost(post)))
        }
      } catch (error) {
        console.error("App.jsx/fetchPosts::", error)
      }
      finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [dispatch])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <RoutesConfig />
    </div>
  );
};

export default App;
