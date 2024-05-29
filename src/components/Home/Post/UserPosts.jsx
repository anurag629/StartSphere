import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PostCard from './PostCard';

function UserPosts() {
    const allPosts = useSelector((state) => state.posts.posts) || null
    const profileData = useSelector((state) => state.profile.profile) || null
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (profileData && allPosts) {
            const userPosts = allPosts.filter((post) => post.User._id === profileData._id)
            setPosts(userPosts)
        }
    }, [profileData, allPosts])

    if (posts.length === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <main className="flex-grow p-4 bg-gray-900">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-2xl font-bold text-white text-center">You have no posts</h1>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow p-4 bg-gray-900">
                <div className="max-w-4xl mx-auto">
                    <div>
                        {posts.map((post) => (
                            <PostCard
                                key={post._id}
                                post={post}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default UserPosts
