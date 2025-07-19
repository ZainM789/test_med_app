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
        // Sample doctor data as fallback - expanded to 20 doctors
        const sampleDoctors = [
            {
                name: "Dr. Sarah Johnson",
                speciality: "Dentist",
                experience: "8 years",
                ratings: 4.8,
                location: "New York",
                phone: "+1-555-0123",
                profilePic: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=b6e3f4&color=262e33&size=120&bold=true",
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
                profilePic: "https://ui-avatars.com/api/?name=Michael+Chen&background=c0aede&color=3c4f5c&size=120&bold=true",
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
                profilePic: "https://ui-avatars.com/api/?name=Emily+Davis&background=ffd5dc&color=d08b5b&size=120&bold=true",
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
                profilePic: "https://ui-avatars.com/api/?name=Robert+Wilson&background=d1f2eb&color=6565b0&size=120&bold=true",
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
                profilePic: "https://ui-avatars.com/api/?name=Lisa+Anderson&background=fadbd8&color=ff488e&size=120&bold=true",
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
                profilePic: "https://ui-avatars.com/api/?name=David+Kumar&background=e8f6f3&color=ff5722&size=120&bold=true",
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
                profilePic: "https://ui-avatars.com/api/?name=Priya+Sharma&background=fff3e0&color=a7c957&size=120&bold=true",
                fees: "$55",
                careerProfile: "BAMS, MD - Ayurveda | Traditional Medicine Expert"
            },
            {
                name: "Dr. James Wilson",
                speciality: "Cardiologist",
                experience: "14 years",
                ratings: 4.9,
                location: "Massachusetts",
                phone: "+1-555-0130",
                profilePic: "https://ui-avatars.com/api/?name=James+Wilson&background=ffcccb&color=8b0000&size=120&bold=true",
                fees: "$120",
                careerProfile: "MBBS, MD - Cardiology | Heart Specialist"
            },
            {
                name: "Dr. Maria Rodriguez",
                speciality: "Pediatrician",
                experience: "11 years",
                ratings: 4.8,
                location: "Arizona",
                phone: "+1-555-0131",
                profilePic: "https://ui-avatars.com/api/?name=Maria+Rodriguez&background=e6e6fa&color=4b0082&size=120&bold=true",
                fees: "$70",
                careerProfile: "MBBS, MD - Pediatrics | Child Health Expert"
            },
            {
                name: "Dr. Ahmed Hassan",
                speciality: "Orthopedic Surgeon",
                experience: "16 years",
                ratings: 4.7,
                location: "Michigan",
                phone: "+1-555-0132",
                profilePic: "https://ui-avatars.com/api/?name=Ahmed+Hassan&background=f0fff0&color=006400&size=120&bold=true",
                fees: "$150",
                careerProfile: "MBBS, MS - Orthopedics | Bone & Joint Specialist"
            },
            {
                name: "Dr. Jennifer Lee",
                speciality: "Neurologist",
                experience: "13 years",
                ratings: 4.9,
                location: "Georgia",
                phone: "+1-555-0133",
                profilePic: "https://ui-avatars.com/api/?name=Jennifer+Lee&background=f5f5dc&color=8b4513&size=120&bold=true",
                fees: "$140",
                careerProfile: "MBBS, MD - Neurology | Brain & Nerve Specialist"
            },
            {
                name: "Dr. Carlos Martinez",
                speciality: "Psychiatrist",
                experience: "10 years",
                ratings: 4.6,
                location: "Nevada",
                phone: "+1-555-0134",
                profilePic: "https://ui-avatars.com/api/?name=Carlos+Martinez&background=e0ffff&color=008b8b&size=120&bold=true",
                fees: "$90",
                careerProfile: "MBBS, MD - Psychiatry | Mental Health Specialist"
            },
            {
                name: "Dr. Rachel Green",
                speciality: "Ophthalmologist",
                experience: "8 years",
                ratings: 4.7,
                location: "Colorado",
                phone: "+1-555-0135",
                profilePic: "https://ui-avatars.com/api/?name=Rachel+Green&background=ffefd5&color=ff8c00&size=120&bold=true",
                fees: "$85",
                careerProfile: "MBBS, MS - Ophthalmology | Eye Specialist"
            },
            {
                name: "Dr. Thomas Brown",
                speciality: "Urologist",
                experience: "12 years",
                ratings: 4.8,
                location: "Virginia",
                phone: "+1-555-0136",
                profilePic: "https://ui-avatars.com/api/?name=Thomas+Brown&background=f0f8ff&color=191970&size=120&bold=true",
                fees: "$100",
                careerProfile: "MBBS, MS - Urology | Urinary System Specialist"
            },
            {
                name: "Dr. Angela White",
                speciality: "Endocrinologist",
                experience: "9 years",
                ratings: 4.7,
                location: "Utah",
                phone: "+1-555-0137",
                profilePic: "https://ui-avatars.com/api/?name=Angela+White&background=fffacd&color=b8860b&size=120&bold=true",
                fees: "$95",
                careerProfile: "MBBS, MD - Endocrinology | Hormone Specialist"
            },
            {
                name: "Dr. Kevin Park",
                speciality: "Radiologist",
                experience: "11 years",
                ratings: 4.6,
                location: "Minnesota",
                phone: "+1-555-0138",
                profilePic: "https://ui-avatars.com/api/?name=Kevin+Park&background=f5fffa&color=2e8b57&size=120&bold=true",
                fees: "$110",
                careerProfile: "MBBS, MD - Radiology | Medical Imaging Expert"
            },
            {
                name: "Dr. Sofia Gonzalez",
                speciality: "Rheumatologist",
                experience: "10 years",
                ratings: 4.8,
                location: "North Carolina",
                phone: "+1-555-0139",
                profilePic: "https://ui-avatars.com/api/?name=Sofia+Gonzalez&background=fff0f5&color=c71585&size=120&bold=true",
                fees: "$105",
                careerProfile: "MBBS, MD - Rheumatology | Joint & Muscle Specialist"
            },
            {
                name: "Dr. Daniel Kim",
                speciality: "Gastroenterologist",
                experience: "13 years",
                ratings: 4.9,
                location: "Tennessee",
                phone: "+1-555-0140",
                profilePic: "https://ui-avatars.com/api/?name=Daniel+Kim&background=f8f8ff&color=6a5acd&size=120&bold=true",
                fees: "$115",
                careerProfile: "MBBS, MD - Gastroenterology | Digestive System Expert"
            },
            {
                name: "Dr. Michelle Taylor",
                speciality: "Pulmonologist",
                experience: "8 years",
                ratings: 4.7,
                location: "Alabama",
                phone: "+1-555-0141",
                profilePic: "https://ui-avatars.com/api/?name=Michelle+Taylor&background=fff8dc&color=cd853f&size=120&bold=true",
                fees: "$90",
                careerProfile: "MBBS, MD - Pulmonology | Lung & Respiratory Expert"
            },
            {
                name: "Dr. Alexander Davis",
                speciality: "Anesthesiologist",
                experience: "15 years",
                ratings: 4.8,
                location: "South Carolina",
                phone: "+1-555-0142",
                profilePic: "https://ui-avatars.com/api/?name=Alexander+Davis&background=f0ffff&color=008080&size=120&bold=true",
                fees: "$125",
                careerProfile: "MBBS, MD - Anesthesiology | Surgical Support Specialist"
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
