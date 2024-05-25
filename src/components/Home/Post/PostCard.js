import React from 'react';
import { Dropdown, DropdownItem } from "flowbite-react";

const PostCard = ({ title, description, image, likes, comments, shares }) => {
  
  const postDeleteHandler = () => {
    alert('Post deleted!');
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 mb-4 text-white">
      <div className="flex w-full justify-between bg-gray-700 p-4 rounded-lg text-white mb-2">
        <div className="flex space-x-4">
          <img src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj" alt="Profile" className="w-16 h-16 rounded-full" />
          <div>
            <h2 className="text-xl font-bold">Aman Gupta</h2>
            <p className="text-sm">Co Founder and CMO at boAt Lifestyle</p>
            <p className="text-sm">2d .Edited.</p>
          </div>
        </div>
        <div>
          <Dropdown label="" dismissOnClick={false}>
            <DropdownItem>Dashboard</DropdownItem>
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Share</DropdownItem>
            <DropdownItem onClick={postDeleteHandler}>Delete</DropdownItem>
          </Dropdown>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
      <div className="flex justify-center items-center mt-4">
        {image && <img src={image} alt="Post" className="w-10/12 h-96 rounded" />}
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {likes}
          </span>
          <span className="flex items-center">
            <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 15h12a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2h2l4 4v-4zM6 6h12v6H6V6z" />
            </svg>
            {comments}
          </span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0,0,256,256">
              <g fill="#fffefe" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" ><g transform="scale(5.33333,5.33333)"><path d="M35.47852,5.98047c-0.81349,0.00101 -1.54534,0.49459 -1.85108,1.24844c-0.30574,0.75385 -0.12447,1.61777 0.4585,2.18515l1.09375,1.09375c-11.7031,0.17286 -21.17969,9.7489 -21.17969,21.49219c-0.0102,0.72127 0.36875,1.39216 0.99175,1.75578c0.623,0.36361 1.39351,0.36361 2.01651,0c0.623,-0.36361 1.00195,-1.0345 0.99175,-1.75578c0,-9.57245 7.62742,-17.29729 17.1543,-17.48242l-1.06836,1.06836c-0.52248,0.50163 -0.73295,1.24653 -0.55024,1.94742c0.18271,0.70088 0.73006,1.24823 1.43094,1.43094c0.70088,0.18271 1.44578,-0.02776 1.94742,-0.55024l4.32227,-4.32227c0.49926,-0.37926 0.79179,-0.97068 0.79026,-1.59765c-0.00153,-0.62697 -0.29696,-1.21695 -0.79807,-1.59376l-4.31445,-4.31445c-0.37701,-0.38755 -0.89487,-0.60596 -1.43555,-0.60547zM12.5,6c-3.56615,0 -6.5,2.93385 -6.5,6.5v23c0,3.56615 2.93385,6.5 6.5,6.5h23c3.56615,0 6.5,-2.93385 6.5,-6.5v-7.5c0.0102,-0.72127 -0.36875,-1.39216 -0.99175,-1.75578c-0.623,-0.36361 -1.39351,-0.36361 -2.01651,0c-0.623,0.36361 -1.00195,1.0345 -0.99175,1.75578v7.5c0,1.40385 -1.09615,2.5 -2.5,2.5h-23c-1.40385,0 -2.5,-1.09615 -2.5,-2.5v-23c0,-1.40385 1.09615,-2.5 2.5,-2.5h7.5c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175z"></path></g></g>
            </svg>
            {shares}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
