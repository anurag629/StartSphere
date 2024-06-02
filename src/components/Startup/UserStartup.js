import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function UserStartup() {
    const allStartups = useSelector((state) => state.startups.startups) || null
    const userData = useSelector((state) => state.auth.userData) || null
    const [startups, setStartups] = useState([])

    useEffect(() => {
        if (userData && allStartups) {
            const userStartups = allStartups.filter((startup) => startup.User === userData._id)
            setStartups(userStartups)
        }
    }, [userData, allStartups])

    if (startups.length === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <main className="flex-grow p-4 bg-gray-900 rounded-md">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="flex justify-center text-lg text-white">No startups</h1>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            {startups.map((startup) => (
                <Link to={`/startups/${startup._id}`} key={startup._id} className="bg-slate-900 rounded-md shadow-lg mb-4 p-4 text-white hover:bg-slate-800 transition duration-300">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            {startup.Logo && (
                                <img
                                    src={startup.Logo}
                                    alt={startup.StartUpName}
                                    className="rounded-xl w-10 h-10 object-cover mr-2"
                                />
                            )}
                            <div>
                                <h2 className="text-xl font-bold">{startup.StartUpName}</h2>
                                <p className="text-sm mt-1">
                                    Founded by {startup.FounderName} in {startup.FoundingYear}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <p className="text-sm line-clamp-2">{startup.CompanyDes}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default UserStartup
