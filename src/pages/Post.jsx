import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deletePost as deletePostFromStore } from '../feature/postSlice'
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';

function convertTimeFormat(isoString) {
    const date = new Date(isoString);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const daySuffix = getDaySuffix(day);

    return `${month} ${day}${daySuffix}, ${year} at ${hours}:${minutes} ${ampm}`;
}

function getDaySuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const allPosts = useSelector((state) => state.posts.posts)
    const profileData = useSelector((state) => state.profile.profile)
    const isAuthor = post && profileData ? (post.User._id === profileData._id) : false

    // if (profileData) {
    //     console.log("Profile: ", profileData)
    //     console.log("Profile._id: ", profileData._id)
    // }
    // if (post) {
    //     console.log("Post: ", post)
    //     console.log("Post.User._id: ", post.User._id)
    // }

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
            <main className="flex-grow p-4 bg-gray-800">
                <div className="max-w-6xl mx-auto bg-gray-900 rounded-md text-white mb-10">
                    <div className="flex w-full justify-between p-4 rounded-lg text-white mb-2">
                        <div className="flex space-x-4 mt-4 mx-2">
                            {post?.User?.Image && <img src={post?.User?.Image} alt="Profile" className="w-16 h-16 rounded-full" />}
                            <div className='pt-2'>
                                {post?.User?.Name && <h2 className="text-xl font-bold">{post?.User?.Name}</h2>}
                                {post?.User?.Bio && <p className="text-sm text-slate-400">{post?.User?.Bio}</p>}
                            </div>
                        </div>
                        <div className='pt-5 mx-4'>
                            {post?.createdAt && <p className="text-sm text-slate-400">Created on {convertTimeFormat(post?.createdAt)}</p>}
                            {post?.updatedAt && <p className="text-sm text-slate-400">Uupdated on {convertTimeFormat(post?.updatedAt)}</p>}
                        </div>
                    </div>
                    <hr class="border-t-2 border-gray-800 my-4"></hr>
                    <div className="py-8">
                        <div className="flex justify-center w-full mb-6">
                            <h1 className="text-2xl font-bold">{post.Title}</h1>
                        </div>
                        <div className="flex justify-center mb-4 relative p-2">
                            {post.Image && (
                                <img
                                    src={post.Image}
                                    alt={post.Title}
                                    className="rounded-xl w-fit-content h-96 object-cover shadow-lg "
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
                        <div className="flex justify-center browser-css px-9 text-white">
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

