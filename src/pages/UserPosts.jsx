import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';
import PostCard from '../components/Home/Post/PostCard';

function UserPosts() {
    const userData = useSelector((state) => state.auth.userData) || null
    const allPosts = useSelector((state) => state.posts.posts) || null
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (userData && allPosts) {
            const userPosts = allPosts.filter((post) => post.userId === userData._id)
            setPosts(userPosts)
        }
    }, [userData, allPosts])

    if (posts.length === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow p-4 bg-gray-900">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-2xl font-bold text-white text-center">No Posts Found</h1>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow p-4 bg-gray-900">
                <div className="max-w-4xl mx-auto">
                    <div>
                        {posts.map((post) => (
                            <PostCard
                                key={post.postId}
                                post={post}
                            />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default UserPosts
