import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import StartupForm from "../components/Startup/StartupForm";
import Navbar from '../components/Home/Navbar'
import Footer from '../components/Home/Footer'

function EditStartup() {
    const navigate = useNavigate()
    const { slug } = useParams()
    const [startup, setStartup] = useState(null)
    const allStartups = useSelector((state) => state.startups.startups) || []

    useEffect(() => {
        if (allStartups && slug) {
            const filterStartup = allStartups.find(startup => startup._id === slug)
            if (filterStartup) {
                setStartup(filterStartup)
            } else {
                navigate('/startups')
            }
        }
    }, [slug, allStartups, navigate])

    return startup ? (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow p-4 bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <StartupForm startup={startup} />
                </div>
            </main>
            <Footer />
        </div>
    ) : null
}

export default EditStartup
