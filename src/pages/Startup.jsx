import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteStartup as deleteStartupFromStore } from '../feature/startupSlice';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';
import api from '../api/axios'

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
        console.log("Delete startup me ::", startup._id, userData.Token)
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Delete startup");
        try {
            const response = await api.delete(`startup/delete/${startup._id}`, {
                headers: {
                    'Authorization': `Bearer ${userData?.Token}`,
                },
            });
            console.log(response);
            dispatch(deleteStartupFromStore(startup._id));
            alert('Startup deleted successfully!')
            navigate('/startups');
        } catch (error) {
            console.error("Error updating startup:", error);
            if (error.response && error.response.data) {
                alert(`Error: ${error.response.data.message}`);
            }
        }
    };

    return startup ? (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow p-4 bg-slate-800">
                <div className="max-w-4xl mx-auto bg-slate-700 text-white rounded-md shadow-lg">
                    <div className="py-8 px-6">
                        <div className="flex justify-center mb-4 relative p-2">
                            {startup.Logo && (
                                <img
                                    src={startup.Logo}
                                    alt={startup.StartUpName}
                                    className="rounded-xl w-32 h-32 object-cover"
                                />
                            )}
                            {isFounder && (
                                <div className="absolute right-6 top-6">
                                    <Link to={`/startups`}>
                                        <button className="mr-3 bg-green-400 px-2 py-1 text-black font-semibold rounded-lg shadow-md hover:bg-green-500">
                                            Save
                                        </button>
                                    </Link>
                                    <Link to={`/edit-startup/${startup._id}`}>
                                        <button className="mr-3 bg-yellow-400 px-2 py-1 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500">
                                            Edit
                                        </button>
                                    </Link>
                                    <button className="bg-red-400 px-2 py-1 text-black font-semibold rounded-lg shadow-md hover:bg-red-500" onClick={deleteStartup}>
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="text-center mb-6">
                            <h1 className="text-4xl font-bold">{startup.StartUpName}</h1>
                            <p className="text-lg text-white mt-2">Founded by {startup.FounderName} in {startup.FoundingYear}</p>
                        </div>
                        <div className="space-y-4 text-white justify-center">
                            <p className="text-center text-xl font-medium">{startup.CompanyDes}</p>
                            <div>
                                <h2 className="text-2xl font-semibold mb-2">Growth</h2>
                                <ul className="list-disc list-inside">
                                    {startup.Growth.map((growth) => (
                                        <li key={growth._id}>
                                            {growth.Year}: ${growth.Revenue} revenue
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-2">Details</h2>
                                <p>Number of Employees: {startup.NumberOfEmployees}</p>
                                <p>Target Market: {startup.TargetMarket}</p>
                                <p>Current Stage: {startup.CurrentStage}</p>
                                <p>Key Features: {startup.KeyFeatures}</p>
                                <p>Investors: {startup.Inverstors}</p>
                                <p>Evaluation: ${startup.Evaluation}</p>
                                <p>Revenue: ${startup.Revenue}</p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-2">Funding Raised</h2>
                                <ul className="list-disc list-inside">
                                    {startup.FundingRaised.map((fund) => (
                                        <li key={fund._id}>
                                            {fund.CompanyName} - {fund.EquityHolds}% equity, ${fund.Amount} raised
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
                                <p>Email: {startup.ContactInformation.CompanyEmail || 'N/A'}</p>
                                <p>Phone: {startup.ContactInformation.Phone || 'N/A'}</p>
                                <p>LinkedIn: {startup.ContactInformation.LinkedInProfile || 'N/A'}</p>
                                <p>Website: {startup.ContactInformation.CompanyWebsite || 'N/A'}</p>
                                <p>Office Address: {startup.ContactInformation.OfficeAddress || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    ) : null;
}

export default Startup;
