import React, { useEffect, useState } from 'react';
import './InstantConsultation.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from './DoctorCardIC/DoctorCardIC';

const InstantConsultation = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate(); // <-- useNavigate initialization
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    const getDoctorsDetails = () => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then(res => res.json())
            .then(data => {
                setDoctors(data);
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
                console.log(err);
                setDoctors([]);
                setFilteredDoctors([]);
                setIsSearched(false);
            });
    };

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

    useEffect(() => {
        getDoctorsDetails();
        // Example: Uncomment below to redirect unauthenticated users
        // const authtoken = sessionStorage.getItem("auth-token");
        // if (!authtoken) {
        //     navigate("/login");
        // }
        // eslint-disable-next-line
    }, [searchParams, navigate]); // <-- include navigate in dependency array if used above

    return (
        <center>
            <div className="searchpage-container">
                <FindDoctorSearchIC onSearch={handleSearch} />
                <div className="search-results-container">
                    {isSearched ? (
                        <center>
                            <h2>
                                {filteredDoctors.length} doctor
                                {filteredDoctors.length !== 1 ? 's' : ''} are available
                                {searchParams.get('location') ? ` in ${searchParams.get('location')}` : ''}
                            </h2>
                            <h3>Book appointments with minimum wait-time &amp; verified doctor details</h3>
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map(doctor => (
                                    <DoctorCardIC className="doctorcard" {...doctor} key={doctor.name} />
                                ))
                            ) : (
                                <p>No doctors found.</p>
                            )}
                        </center>
                    ) : null}
                </div>
            </div>
        </center>
    );
};

export default InstantConsultation;