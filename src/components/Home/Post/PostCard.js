import { useState, useEffect } from 'react';
import { Card, Modal } from 'flowbite-react';
import { Link } from 'react-router-dom';
import api from '../../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost as updatePostInStore } from '../../../feature/postSlice';

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

const PostCard = ({ post }) => {
  const { _id, User, Title, Image, Description, createdAt, updatedAt, Likes, LikedBy, Comments } = post;
  const [likes, setLikes] = useState(Likes);
  const [comments, setComments] = useState(Comments);
  const [newComment, setNewComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [hasUserLiked, setHasUserLiked] = useState(false);
  const [likedUsers, setLikedUsers] = useState([]);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const userData = JSON.parse(localStorage.getItem('user'));
  const profileData = useSelector((state) => state.profile.profile) || {};
  const allPosts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    setHasUserLiked(LikedBy.some(profileId => profileId === profileData?._id));
  }, [LikedBy, profileData?._id]);

  useEffect(() => {
    if (allPosts && _id) {
      const post = allPosts.find((post) => post._id === _id);
    }
  }, [allPosts, _id]);

  const handleLike = async () => {
    if (hasUserLiked) {
      return;
    }
    try {
      const response = await api.put(`post/likes/${_id}`, {
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
      const response = await api.put(`post/comment/${_id}`, {
        userId: profileData?._id,
        comment: newComment
      }, {
        headers: {
          'Authorization': `Bearer ${userData?.Token}`,
        }
      });
      console.log("Comment Response::", response)
      setComments(response.data.comments);
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
      const response = await api.get(`post/likes/${_id}`, {
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

  return (
    <>
      <Card className="max-w-7xl bg-slate-800 shadow-lg mb-4 text-white">
        <div className="">
          <div className="flex items-center space-x-4">
            {User.Image && (
              <img
                src={User.Image}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
            )}
            <div className="flex flex-col">
              <Link to={`profile/${User?._id}`}>
                <h5
                  className="text-lg font-semibold hover:text-blue-500 transition duration-300 hover:underline"
                >{User.Name}</h5>
              </Link>
              <span className="text-sm text-slate-400">{User.Bio}</span>
              <span className="text-xs text-slate-400">{convertTimeFormat(updatedAt)} • Edited</span>
            </div>
          </div>
          <div className="border-b border-gray-400 w-full mb-2 mt-4"></div>
          <Link to={`/post/${_id}`}>
            <p className="mt-4 mb-4 text-sm">
              {Description.length > 350 ? `${Description.substring(0, 350)}... ` : Description}
              {Description.length > 350 && (
                <Link to={`/post/${_id}`} className="text-blue-500 hover:underline">
                  see more
                </Link>
              )}
            </p>
            {Image && (
              <div className="mb-3">
                <img src={Image} alt="Post" className="w-full h-96 rounded-lg" />
              </div>
            )}
          </Link>
          <div className="flex justify-between items-center">
            <div className="flex space-x-5">
              <div className="flex space-x-1">
                <button onClick={handleLike} className={`flex items-center ${hasUserLiked ? 'text-red-700' : 'text-red-300 hover:text-red-700'}`}>
                  <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
                <button onClick={handleShowLikes} className="flex items-center text-red-700 hover:text-blue-500 transition duration-300 hover:underline">
                  {likes}
                </button>
              </div>
              <div className="flex space-x-1">
                <button onClick={() => setShowCommentBox(!showCommentBox)} className="flex items-center text-blue-500 hover:text-blue-700">
                  <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 15h12a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2h2l4 4v-4zM6 6h12v6H6V6z" />
                  </svg>
                </button>
                <span className='text-blue-500'>{comments.length}</span>
              </div>
            </div>
          </div>
          <div className={`mt-4 transition-all duration-1000 ease-in-out ${showCommentBox ? 'opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            {showCommentBox && (
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
            )}
            <div className="mt-4 space-y-4">
              {comments.map(comment => (
                <div key={comment._id} className="bg-gray-700 p-3 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <img src={comment.User?.Image} alt="Profile" className="w-8 h-8 rounded-full" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <Link to={`profile/${User?._id}`}>
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
        </div>
      </Card>
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
    </>
  );
};

export default PostCard;
