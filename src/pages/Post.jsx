import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deletePost as deletePostFromStore } from '../feature/postSlice';
import { Modal } from 'flowbite-react';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/axios';
import { updatePost as updatePostInStore } from '../feature/postSlice';

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
    const [post, setPost] = useState(null);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profileData = useSelector((state) => state.profile.profile);
    const userData = useSelector((state) => state.auth.userData);
    const [hasUserLiked, setHasUserLiked] = useState(false);
    const [likedUsers, setLikedUsers] = useState([]);
    const [showLikesModal, setShowLikesModal] = useState(false);
    const [likes, setLikes] = useState(0);
    const { slug } = useParams();
    const allPosts = useSelector((state) => state.posts.posts);
    const isAuthor = post && profileData ? post.User._id === profileData._id : false;

    useEffect(() => {
        if (allPosts && slug) {
            const post = allPosts.find((post) => post._id === slug);
            if (post) {
                setPost(post);
                setLikes(post.Likes);
                if (post?.LikedBy && profileData?._id) {
                    setHasUserLiked(post?.LikedBy.some(profileId => profileId === profileData?._id));
                }
            }
        } else {
            navigate('/');
        }
    }, [allPosts, slug, navigate]);

    const deletePost = async () => {
        const toastId = toast.loading("Please wait...");
        try {
            await api.delete(`post/deletepost/${post._id}`, {
                headers: {
                    'Authorization': `Bearer ${userData.Token}`,
                },
            });
            toast.update(toastId, { render: "Delete post Successfully!", type: "success", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
            dispatch(deletePostFromStore(post._id));
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.update(toastId, { render: "Error in deleting post!", type: "error", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
        }
    };

    const handleLike = async () => {
        if (hasUserLiked) {
            return;
        }
        try {
            const response = await api.put(`post/likes/${post._id}`, {
                UserId: profileData?._id,
            }, {
                headers: {
                    'Authorization': `Bearer ${userData?.Token}`,
                }
            });
            console.log("Like Response::", response)
            setLikes(response.data.likes);
            setHasUserLiked(true);

            const updatedPost = {
                ...post,
                Likes: response.data.likes,
                LikedBy: [...post.LikedBy, profileData?._id]
            };
            dispatch(updatePostInStore(updatedPost));
        } catch (error) {
            console.error('Error liking the post', error);
        }
    };

    const handleComment = async () => {
        try {
            const response = await api.put(`post/comment/${post._id}`, {
                userId: profileData._id,
                comment: newComment,
            }, {
                headers: {
                    'Authorization': `Bearer ${userData.Token}`,
                },
            });
            console.log("Comment Response::", response);
            setPost({ ...post, Comments: response.data.comments });
            setNewComment('');

            const updatedPost = {
                ...post,
                Comments: response.data.comments
            };
            dispatch(updatePostInStore(updatedPost));
        } catch (error) {
            console.error('Error commenting on the post', error);
        }
    };

    const fetchLikedUsers = async () => {
        try {
            const response = await api.get(`post/likes/${post?._id}`, {
                headers: {
                    Authorization: `Bearer ${userData?.Token}`,
                },
            });
            setLikedUsers(response.data.likedBy);
        } catch (error) {
            console.error('Error fetching liked users', error);
        }
    };

    const handleShowLikes = async () => {
        await fetchLikedUsers();
        setShowLikesModal(true);
    };

    return post ? (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow bg-gray-800">
                <div className="max-w-6xl mx-auto bg-gray-900 rounded-md text-white mb-10 p-5">
                    <div className="flex justify-between p-4 rounded-lg text-white mb-2">
                        <div className="flex space-x-4 mt-4 mx-2">
                            {post?.User?.Image && <img src={post?.User?.Image} alt="Profile" className="w-16 h-16 rounded-full" />}
                            <div className='pt-2'>
                                {post?.User?.Name && <h2 className="text-xl font-bold">{post?.User?.Name}</h2>}
                                {post?.User?.Bio && <p className="text-sm text-slate-400">{post?.User?.Bio}</p>}
                            </div>
                        </div>
                        <div className='pt-5 mx-4'>
                            {post?.createdAt && <p className="text-sm text-slate-400">Created on {convertTimeFormat(post?.createdAt)}</p>}
                            {post?.updatedAt && <p className="text-sm text-slate-400">Updated on {convertTimeFormat(post?.updatedAt)}</p>}
                        </div>
                    </div>
                    <hr className="border-t-2 border-gray-800 my-4"></hr>
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
                    {/* Like and Comment section */}
                    <div className="flex justify-between items-center p-4 px-12">
                        <div className="flex space-x-5">
                            <button className="flex items-center text-blue-500 hover:text-blue-700">
                                Comments ({post?.Comments.length})
                            </button>
                            <div className="flex space-x-1">
                                <button onClick={handleLike} className={`flex items-center ${hasUserLiked ? 'text-red-700' : 'text-red-300 hover:text-red-700'}`}>
                                    <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </button>
                                <button onClick={handleShowLikes} className="flex items-center text-red-700 hover:text-blue-500 transition duration-300 hover:underline">
                                    ({likes})
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Add new comment */}
                    <div className="flex items-start space-x-3">
                        <img src={profileData?.Image} alt="Profile" className="w-8 h-8 rounded-full" />
                        <div className="flex-1">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="w-full p-2 text-white rounded h-24 resize-none overflow-hidden bg-gray-800"
                            />
                            <button onClick={handleComment} className="mt-2 bg-blue-500 text-white p-1 rounded hover:bg-blue-700 text-sm">
                                Comment
                            </button>
                        </div>
                    </div>
                    {/* Comments section */}
                    <div className="mt-4 space-y-4">
                        {post.Comments.map(comment => (
                            <div key={comment._id} className="bg-gray-700 p-3 rounded-lg">
                                <div className="flex items-start space-x-3">
                                    <img src={comment.User?.Image} alt="Profile" className="w-8 h-8 rounded-full" />
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <Link to={`profile/${comment.User?._id}`}>
                                                <span
                                                    className="font-semibold hover:text-blue-500 transition duration-300 hover:underline ">
                                                    {comment.User?.Name}
                                                </span>
                                            </Link>
                                            <span className="text-xs text-gray-400">• {convertTimeFormat(comment.createdAt)}</span>
                                        </div>
                                        <p className="text-sm">{comment.Comment}</p>
                                        <div className="flex space-x-4 text-xs text-gray-400 mt-1">
                                            <button className="hover:text-gray-200">Like</button>
                                            <button className="hover:text-gray-200">Reply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Modal show={showLikesModal} onClose={() => setShowLikesModal(false)}>
                    <Modal.Header className="dark:bg-gray-800 dark:text-white dark:border-gray-600">Liked By</Modal.Header>
                    <Modal.Body className="dark:bg-gray-800 dark:text-white">
                        <div className="space-y-4">
                            {likedUsers && likedUsers.map(user => (
                                <div key={user?._id} className="flex items-center space-x-3">
                                    <img src={user?.Image} alt="Profile" className="w-8 h-8 rounded-full" />
                                    <div>
                                        <Link to={`profile/${user?._id}`}>
                                            <h5 className="font-semibold hover:text-blue-500 transition duration-300 hover:underline">{user?.Name}</h5>
                                        </Link>
                                        <p className="text-sm text-slate-400">{user?.Bio}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Modal.Body>
                </Modal>
            </main>
            <Footer />
        </div>
    ) : null;
}

export default Post;
