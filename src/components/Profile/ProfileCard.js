import React, { useEffect, useState, useContext } from 'react';
import api from '../../api/axios';
import UserPosts from '../Home/Post/UserPosts';
import { Link } from 'react-router-dom';
import UserStartup from '../Startup/UserStartup';
import Mentors from '../Mentors/Mentors';

const ProfileCard = () => {
    const [profile, setProfile] = useState(null);
    const [startups, setStartups] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser && storedUser.Token) {
                    const profileResponse = await api.get(`/profile/${storedUser._id}`, {
                        headers: {
                            Authorization: `Bearer ${storedUser.Token}`,
                        },
                    });
                    setProfile(profileResponse.data);
                    console.log("profile response", profileResponse.data);
                    const startupsResponse = profileResponse.data.StartUpDetails;
                    setStartups(startupsResponse);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    return (
        <section className="">
            <div className="w-full overflow-hidden dark:bg-gray-900 flex flex-col lg:flex-row">
                <div className="flex flex-col w-full lg:w-3/4">
                    {/* Cover Image */}
                    <img
                        // src={profile && profile.Image}
                        src='https://e1.pxfuel.com/desktop-wallpaper/936/176/desktop-wallpaper-digital-global-map-tech-world.jpg'
                        alt="User Cover"
                        className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem] rounded-md"
                    />
                    {/* Profile Image and Name */}
                    <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
                        <img
                            src={profile && profile.Image}
                            alt="User Profile"
                            className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
                        />
                        {/* FullName */}
                        <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-white dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
                            {profile?.Name}
                            {/* In next line write role */}
                            <span className="text-gray-400 dark:text-gray-400 text-lg block">
                                {profile?.Role}
                            </span>
                        </h1>
                    </div>
                    <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
                        {/* Description */}
                        <p className="w-fit text-gray-400 dark:text-gray-400 text-md">
                            {profile?.Bio}
                        </p>
                        {/* Social Links */}
                        <div className="w-full flex gap-4 justify-center">
                            <div className="w-full flex gap-4">
                                <a href={profile?.ContactInformation?.LinkedInProfile} target="_blank" rel="noreferrer">
                                    <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#0077b5]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                                        </svg>
                                    </span>
                                </a>
                            </div>
                            {/* Github */}
                            <div className="w-full flex gap-4">
                                <a href="https://github.com/anurag629/StartSphere" target="_blank" rel="noreferrer">
                                    <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#cfcaca]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                                        </svg>
                                    </span>
                                </a>
                            </div>
                            {/* Twitter */}
                            <div className="w-full flex gap-4">
                                <a href="https://twitter.com/anurag629" target="_blank" rel="noreferrer">
                                    <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#1da1f2]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M512 97.2c-19.1 8.4-39.5 14 61.1-33.6-20.3 12.1-42.2 20.3-65.6 24.7 23.7-14.2 41.8-36.7 50.4-63.6-22.1 13.1-46.5 22.6-72.6 27.8-20.8-22.1-50.4-35.9-83.3-35.9-63.1 0-114.3 51.2-114.3 114.3 0 8.9 .8 17.6 2.6 26.1-95.1-4.8-179.3-50.4-235.6-119.8-9.9 17-15.6 36.8-15.6 57.8 0 39.7 20.2 74.7 50.9 95.3-18.8-.6-36.4-5.8-51.8-14.4v1.4c0 55.5 39.5 101.8 91.8 112.3-9.6 2.6-19.7 4-30.1 4-7.4 0-14.6-.7-21.7-2.1 14.7 45.8 57.4 79.3 108.1 80.3-39.6 31-89.6 49.5-144.1 49.5-9.4 0-18.7-.6-27.9-1.7 51.4 32.9 112.5 52.1 178.2 52.1 214.9 0 332.3-178.1 332.3-332.3 0-5.1-.1-10.2-.3-15.2 22.8-16.5 42.6-37.1 58.3-60.7z" />
                                        </svg>
                                    </span>
                                </a>
                            </div>
                            {/* Instagram */}
                            <div className="w-full flex gap-4">
                                <a href="https://www.instagram.com/anurag629/" target="_blank" rel="noreferrer">
                                    <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#c13584]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                        {/* Detail */}
                        <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                            <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                                <div className="w-full">
                                    <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Role</dt>
                                            <dd className="text-lg font-semibold text-white">
                                                {profile?.Role}
                                            </dd>
                                        </div>
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                                            <dd className="text-lg font-semibold text-white">
                                                {profile?.ContactInformation?.CompanyEmail}
                                            </dd>
                                        </div>
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Gender</dt>
                                            <dd className="text-lg font-semibold text-white">
                                                {profile?.gender || 'Male'}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="w-full">
                                    <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Location</dt>
                                            <dd className="text-lg font-semibold text-white">
                                                {profile?.ContactInformation?.OfficeAddress}
                                            </dd>
                                        </div>
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone Number</dt>
                                            <dd className="text-lg font-semibold text-white">
                                                {profile?.ContactInformation?.Phone}
                                            </dd>
                                        </div>

                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Website</dt>
                                            <dd className="text-lg font-semibold text-white">
                                                {profile?.ContactInformation?.CompanyWebsite}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/4 mt-4 lg:mt-0 lg:ml-4 bg-gray-800 p-4 rounded-lg shadow-md">
                    <Link to="/add-startup">
                        <button className="bg-blue-700 text-white font-semibold px-4 py-2 rounded-md mb-4 w-full">
                            Add StartUp
                        </button>
                    </Link>
                    <h2 className=" flex justify-center text-2xl font-bold text-white text-center mb-4">Your StartUps</h2>
                    <UserStartup />
                </div>
            </div>
            <div className="border-b border-gray-400 w-full mb-2 mt-5"></div>
            <div className=" mt-4">
                <div>
                    <Mentors />
                </div>
            </div>
            <div className="w-full mt-4">
                <div>
                    <UserPosts />
                </div>
            </div>
        </section>
    );
};

export default ProfileCard;
