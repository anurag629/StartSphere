import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deletePost as deletePostFromStore } from '../feature/postSlice'
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';

function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? (post.User === userData._id) : false
    const dispatch = useDispatch()
    const allPosts = useSelector((state) => state.posts.posts)

    useEffect(() => {
        if (allPosts && slug) {
            const post = allPosts.find((post) => post._id === slug)
            if (post) {
                setPost(post)
            }
        }
        else {
            navigate('/')
        }
    }, [allPosts, slug, navigate])

    const deletePost = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(deletePostFromStore(post._id))
        navigate('/')
    }

    return post ? (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow p-4 bg-gray-900">
                <div className="max-w-4xl mx-auto bg-slate-400 rounded-md">
                    <div className="py-8">
                        <div className="flex justify-center mb-4 relative p-2">
                            {post.Image && (
                                <img
                                    src={post.Image}
                                    alt={post.Title}
                                    className="rounded-xl"
                                />
                            )}

                            {isAuthor && (
                                <div className="absolute right-6 top-6">
                                    <Link to={`/`}>
                                        <button className="mr-3 bg-green-400 px-2 py-1 text-black font-semibold rounded-lg shadow-md hover:bg-green-500">
                                            Save
                                        </button>
                                    </Link>
                                    <Link to={`/edit-post/${post._id}`}>
                                        <button className="mr-3 bg-yellow-400 px-2 py-1 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500">
                                            Edit
                                        </button>
                                    </Link>
                                    <button className="bg-red-400 px-2 py-1 text-black font-semibold rounded-lg shadow-md hover:bg-red-500" onClick={deletePost}>
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center w-full mb-6">
                            <h1 className="text-2xl font-bold">{post.Title}</h1>
                        </div>
                        <div className="flex justify-center browser-css">
                            {post.Description}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    ) : null;
}

export default Post

