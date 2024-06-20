import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteStartup as deleteStartupFromStore } from '../feature/startupSlice';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';
import { Tabs } from 'flowbite-react';
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import api from '../api/axios';

function Startup() {
    const [startup, setStartup] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allStartups = useSelector((state) => state.startups.startups);
    const userData = useSelector((state) => state.auth.userData);
    const isFounder = startup && userData ? (userData._id === startup.User) : false;

    useEffect(() => {
        if (allStartups && slug) {
            const startup = allStartups.find((startup) => startup._id === slug);
            if (startup) {
                setStartup(startup);
            }
        }
    }, [allStartups, slug, navigate]);

    const deleteStartup = async () => {
        try {
            const response = await api.delete(`startup/delete/${startup._id}`, {
                headers: {
                    'Authorization': `Bearer ${userData?.Token}`,
                },
            });
            console.log(response);
            dispatch(deleteStartupFromStore(startup._id));
            alert('Startup deleted successfully!');
            navigate('/startups');
        } catch (error) {
            console.error("Error updating startup:", error);
            if (error.response && error.response.data) {
                alert(`Error: ${error.response.data.message}`);
            }
        }
    };

    return startup ? (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <Navbar />
            <main className="flex-grow p-4">
                <div className="max-w-6xl mx-auto bg-gray-800 text-white rounded-md shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            {startup.Logo && (
                                <img
                                    src={startup.Logo}
                                    alt={startup.StartUpName}
                                    className="rounded-lg w-16 h-16 object-cover mr-4"
                                />
                            )}
                            <div>
                                <h1 className="text-3xl font-bold">{startup.StartUpName}</h1>
                            </div>
                        </div>
                        {isFounder && (
                            <div>
                                <Link to={`/startups`}>
                                    <button className="mr-3 bg-green-500 px-4 py-2 text-black font-semibold rounded-lg shadow-md hover:bg-green-600">
                                        Save
                                    </button>
                                </Link>
                                <Link to={`/edit-startup/${startup._id}`}>
                                    <button className="mr-3 bg-yellow-500 px-4 py-2 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-600">
                                        Edit
                                    </button>
                                </Link>
                                <button className="bg-red-500 px-4 py-2 text-black font-semibold rounded-lg shadow-md hover:bg-red-600" onClick={deleteStartup}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                    <Tabs aria-label="Tabs with underline" variant="underline" className="dark">
                        <Tabs.Item active title="Overview" icon={HiUserCircle}>
                            <div className="mt-4">
                                <h2 className="text-2xl font-semibold mb-4">{startup.StartUpName} Overview</h2>
                                <p className="text-lg mb-6 text-gray-100">{startup.CompanyDes}</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-xl font-semibold">Founding Year</h3>
                                        <p className='text-gray-400'>{startup.FoundingYear}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">Founder Name</h3>
                                        <p className='text-gray-400'>{startup.FounderName}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">Number of Employees</h3>
                                        <p className='text-gray-400'>{startup.NumberOfEmployees}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">Target Market</h3>
                                        <p className='text-gray-400'>{startup.TargetMarket}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">Current Stage</h3>
                                        <p className='text-gray-400'>{startup.CurrentStage}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">Key Features</h3>
                                        <p className='text-gray-400'>{startup.KeyFeatures}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">Investors</h3>
                                        <p className='text-gray-400'>{startup.Inverstors}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">Evaluation</h3>
                                        <p className='text-gray-400'>${startup.Evaluation}M</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">Revenue</h3>
                                        <p className='text-gray-400'>${startup.Revenue}K</p>
                                    </div>
                                </div>
                            </div>
                        </Tabs.Item>
                        <Tabs.Item title="Funding" icon={MdDashboard}>
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold mb-2">Cumulative Funding Raised Over Time ($)</h3>
                                <ul>
                                    {startup.FundingRaised.map((fund, index) => (
                                        <li key={index}>
                                            <div className="flex justify-between">
                                                <span>{fund.CompanyName}</span>
                                                <span>${fund.Amount}K</span>
                                            </div>
                                            <div className="flex justify-between text-gray-400">
                                                <span>Equity Holds: {fund.EquityHolds}%</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Tabs.Item>
                        <Tabs.Item title="Growth" icon={HiAdjustments}>
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold mb-2">Growth Over Time</h3>
                                {/* <ul>
                                    {startup.Growth.map((growth, index) => (
                                        <li key={index}>
                                            <div className="flex justify-between">
                                                <span>{growth.Year}</span>
                                                <span>${growth.Revenue}K</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul> */}
                                <p className='text-gray-400' >Not mentioned!</p>
                            </div>
                        </Tabs.Item>
                        <Tabs.Item title="Contacts" icon={HiClipboardList}>
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                                <div>
                                    <h4 className="font-semibold">Company Email</h4>
                                    <p className='text-gray-400'>{startup.ContactInformation.CompanyEmail || 'N/A'}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Phone</h4>
                                    <p className='text-gray-400'>{startup.ContactInformation.Phone || 'N/A'}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">LinkedIn Profile</h4>
                                    <p className='text-gray-400'>{startup.ContactInformation.LinkedInProfile || 'N/A'}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Company Website</h4>
                                    <p className='text-gray-400'>{startup.ContactInformation.CompanyWebsite || 'N/A'}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Office Address</h4>
                                    <p className='text-gray-400'>{startup.ContactInformation.OfficeAddress || 'N/A'}</p>
                                </div>
                            </div>
                        </Tabs.Item>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </div>
    ) : null;
}

export default Startup;
