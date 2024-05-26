import React, { useEffect, useState } from 'react';
import RoutesConfig from './routes';
import { useDispatch } from 'react-redux';
import { login, logout } from './feature/authSlice';
import { addPost } from './feature/postSlice'


const App = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const fetchDummyPosts = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const posts = [
      { postId: '1', userId: '6651b371894c51190fccb3a5', title: 'Post 1', description: 'This is post 1', userName: 'Anurag Verma', imageUrl: 'https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png', createdAt: '2021-13-01', updatedAt: '2021-19-01', likes: '10', comments: '22', shares: '51' },
      { postId: '2', userId: '322', title: 'Post 2', description: 'This is post 2', userName: 'Anuj Trivedi', imageUrl: 'https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png', createdAt: '2023-01-04', updatedAt: '2024-09-16', likes: '11', comments: '23', shares: '52' },
      { postId: '3', userId: '323', title: 'Post 3', description: 'This is post 3', userName: 'Gavnish Kumar', imageUrl: 'https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png', createdAt: '2021-09-08', updatedAt: '2023-09-01', likes: '12', comments: '24', shares: '53' },
      { postId: '4', userId: '324', title: 'Post 4', description: 'This is post 4', userName: 'Diya Agarwal', imageUrl: 'https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png', createdAt: '2022-22-01', updatedAt: '2023-02-13', likes: '13', comments: '25', shares: '54' },
      { postId: '5', userId: '324', title: 'Post 5', description: 'This is post 5', userName: 'Subrat Yadav', imageUrl: 'https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png', createdAt: '2024-19-01', updatedAt: '2024-20-11', likes: '14', comments: '26', shares: '55' },
    ]
    return posts
  }

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        dispatch(login({ userData }))
      } else {
        dispatch(logout())
      }
    } catch (error) {
      console.log("App.jsx/userData::", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await fetchDummyPosts()
        if (posts) {
          console.log("Posts::", posts)
          posts.forEach(post => dispatch(addPost(post)))
        }
      } catch (error) {
        console.log("App.jsx/fetchPosts::", error)
      }
      finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <div className="App">
      <RoutesConfig />
    </div>
  );
};

export default App;
