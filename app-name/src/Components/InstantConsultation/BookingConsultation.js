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
        // Sample doctor data as fallback
        const sampleDoctors = [
            {
                name: "Dr. Sarah Johnson",
                speciality: "Dentist",
                experience: "8 years",
                ratings: 4.8,
                location: "New York",
                phone: "+1-555-0123",
                profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah&backgroundColor=b6e3f4&clothingColor=262e33&eyeColor=blue&hairColor=blonde&skinColor=f8d25c&accessories=prescription02&clothing=blazerShirt",
                fees: "$50",
                careerProfile: "BDS, MDS - Dentistry | Senior Consultant at City Dental"
            },
            {
                name: "Dr. Michael Chen",
                speciality: "General Physician", 
                experience: "12 years",
                ratings: 4.9,
                location: "California",
                phone: "+1-555-0124",
                profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael&backgroundColor=c0aede&clothingColor=3c4f5c&eyeColor=brown&hairColor=black&skinColor=ae5d29&accessories=prescription01&clothing=blazerSweater",
                fees: "$60",
                careerProfile: "MBBS, MD - Internal Medicine | Chief of Medicine"
            },
            {
                name: "Dr. Emily Davis",
                speciality: "Dermatologist",
                experience: "6 years", 
                ratings: 4.7,
                location: "Texas",
                phone: "+1-555-0125",
                profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily&backgroundColor=ffd5dc&clothingColor=d08b5b&eyeColor=green&hairColor=auburn&skinColor=edb98a&accessories=sunglasses&clothing=collarSweater",
                fees: "$75",
                careerProfile: "MBBS, MD - Dermatology | Skin Specialist"
            },
            {
                name: "Dr. Robert Wilson",
                speciality: "Gynecologist/obstetrician",
                experience: "15 years",
                ratings: 4.9,
                location: "Florida",
                phone: "+1-555-0126", 
                profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert&backgroundColor=d1f2eb&clothingColor=6565b0&eyeColor=blue&hairColor=brown&skinColor=fdbcb4&accessories=prescription02&clothing=blazerShirt",
                fees: "$80",
                careerProfile: "MBBS, MS - Obstetrics & Gynecology | Women's Health Expert"
            },
            {
                name: "Dr. Lisa Anderson",
                speciality: "Ear-nose-throat (ent) Specialist",
                experience: "10 years",
                ratings: 4.6,
                location: "Illinois",
                phone: "+1-555-0127",
                profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa&backgroundColor=fadbd8&clothingColor=ff488e&eyeColor=brown&hairColor=red&skinColor=f8d25c&accessories=wayfarers&clothing=overall",
                fees: "$65",
                careerProfile: "MBBS, MS - ENT | Head & Neck Surgery Specialist"
            },
            {
                name: "Dr. David Kumar",
                speciality: "Homeopath",
                experience: "7 years",
                ratings: 4.5,
                location: "Washington",
                phone: "+1-555-0128",
                profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=david&backgroundColor=e8f6f3&clothingColor=ff5722&eyeColor=brown&hairColor=black&skinColor=ae5d29&accessories=prescription01&clothing=shirtCrewNeck",
                fees: "$45",
                careerProfile: "BHMS, MD - Homeopathy | Holistic Medicine Practitioner"
            },
            {
                name: "Dr. Priya Sharma",
                speciality: "Ayurveda",
                experience: "9 years",
                ratings: 4.8,
                location: "Oregon",
                phone: "+1-555-0129",
                profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya&backgroundColor=fff3e0&clothingColor=a7c957&eyeColor=brown&hairColor=black&skinColor=d08b5b&accessories=kurt&clothing=blazerSweater",
                fees: "$55",
                careerProfile: "BAMS, MD - Ayurveda | Traditional Medicine Expert"
            }
        ];

        // Try to fetch from API first, fallback to sample data
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then(res => res.json())
            .then(data => {
                setDoctors(data && data.length > 0 ? data : sampleDoctors);
                // Filter doctors based on speciality if a search parameter is present
                if (searchParams.get('speciality')) {
                    const filtered = (data && data.length > 0 ? data : sampleDoctors).filter(
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
                console.log("API not available, using sample data:", err);
                setDoctors(sampleDoctors);
                // Filter doctors based on speciality if a search parameter is present
                if (searchParams.get('speciality')) {
                    const filtered = sampleDoctors.filter(
                        doctor =>
                            doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase()
                    );
                    setFilteredDoctors(filtered);
                    setIsSearched(true);
                } else {
                    setFilteredDoctors([]);
                    setIsSearched(false);
                }
            });
    };

    // Handler for the specialty selection functionality
    const handleSpecialitySelect = (speciality) => {
        if (!speciality || speciality.trim() === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
        } else {
            const filtered = doctors.filter(
                doctor =>
                    doctor.speciality.toLowerCase() === speciality.toLowerCase()
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
    }, [searchParams, navigate]); // navigate is included in dependency array if used inside useEffect

    // Show all doctors initially when no search is performed
    const displayDoctors = isSearched ? filteredDoctors : doctors;

    return (
        <center>
            <div className="searchpage-container">
                {/* FindDoctorSearch component for searching doctors */}
                <FindDoctorSearch onSelectSpeciality={handleSpecialitySelect} />
                <div className="search-results-container">
                    {/* Always show doctors - either all doctors or filtered results */}
                    <div className="results-header">
                        <h2>
                            {isSearched ? (
                                <>
                                    {filteredDoctors.length} doctor
                                    {filteredDoctors.length !== 1 ? 's' : ''} are available
                                    {searchParams.get('location') ? ` in ${searchParams.get('location')}` : ''}
                                </>
                            ) : (
                                `${doctors.length} doctors available`
                            )}
                        </h2>
                        <h3>Book appointments with minimum wait-time &amp; verified doctor details</h3>
                    </div>
                    <div className="doctors-grid">
                        {/* Render DoctorCard components for each doctor */}
                        {displayDoctors.length > 0 ? (
                            displayDoctors.map(doctor => (
                                <DoctorCard className="doctorcard" {...doctor} key={doctor.name} />
                            ))
                        ) : (
                            <p>No doctors found matching your search criteria.</p>
                        )}
                    </div>
                </div>
            </div>
        </center>
    );
};

export default BookingConsultation;
