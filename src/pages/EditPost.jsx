import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import PostCreation from '../components/Home/PostCreation'
import Navbar from '../components/Home/Navbar'
import Footer from '../components/Home/Footer'

function EditPost() {
    const navigate = useNavigate()
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const allPosts = useSelector((state) => state.posts.posts)

    useEffect(() => {
        if (allPosts && slug) {
            const filterPost = allPosts.find(post => post._id === slug)
            if (filterPost) {
                setPost(filterPost)
            }
        }
        else {
            navigate('/')
        }
    }, [slug, allPosts, navigate])

    return post ? (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow p-4 bg-gray-900">
                <div className="max-w-4xl mx-auto">
                    <PostCreation post={post} />
                </div>
            </main>
            <Footer />
        </div>
    ) : null
}

export default EditPost
