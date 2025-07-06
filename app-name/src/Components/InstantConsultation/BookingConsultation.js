import React, { useEffect, useState } from 'react';
import './BookingConsultation.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch'; // Assuming path to FindDoctorSearch.js
import DoctorCard from './DoctorCard/DoctorCard'; // Assuming path to DoctorCard.js

const BookingConsultation = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    // Function to fetch doctor details from the API
    const getDoctorsDetails = () => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63') // Using the same API endpoint as InstantConsultation
            .then(res => res.json())
            .then(data => {
                setDoctors(data);
                // Filter doctors based on speciality if a search parameter is present
                if (searchParams.get('speciality')) {
                    const filtered = data.filter(
                        doctor =>
                            doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase()
                    );
                    setFilteredDoctors(filtered);
                    setIsSearched(true);
                } else {
                    setFilteredDoctors([]);
                    setIsSearched(false);
                }
            })
            .catch(err => {
                console.error("Error fetching doctors:", err);
                setDoctors([]);
                setFilteredDoctors([]);
                setIsSearched(false);
            });
    };

    // Handler for the search functionality
    const handleSearch = (searchText) => {
        if (!searchText || searchText.trim() === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
        } else {
            const filtered = doctors.filter(
                doctor =>
                    doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredDoctors(filtered);
            setIsSearched(true);
        }
    };

    // useEffect hook to fetch doctors on component mount or when search params change
    useEffect(() => {
        getDoctorsDetails();
        // Example: Uncomment below to redirect unauthenticated users
        // const authtoken = sessionStorage.getItem("auth-token");
        // if (!authtoken) {
        //     navigate("/login");
        // }
        // eslint-disable-next-line
    }, [searchParams, navigate]); // navigate is included in dependency array if used inside useEffect

    return (
        <center>
            <div className="searchpage-container">
                {/* FindDoctorSearch component for searching doctors */}
                <FindDoctorSearch onSearch={handleSearch} />
                <div className="search-results-container">
                    {/* Display search results if a search has been performed */}
                    {isSearched ? (
                        <center>
                            <h2>
                                {filteredDoctors.length} doctor
                                {filteredDoctors.length !== 1 ? 's' : ''} are available
                                {searchParams.get('location') ? ` in ${searchParams.get('location')}` : ''}
                            </h2>
                            <h3>Book appointments with minimum wait-time &amp; verified doctor details</h3>
                            {/* Render DoctorCard components for each filtered doctor */}
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map(doctor => (
                                    <DoctorCard className="doctorcard" {...doctor} key={doctor.name} />
                                ))
                            ) : (
                                <p>No doctors found matching your search criteria.</p>
                            )}
                        </center>
                    ) : null}
                </div>
            </div>
        </center>
    );
};

export default BookingConsultation;
