import React, { useState, useEffect } from 'react';
import './ReviewForm.css';
import { API_URL } from '../../config';

// Icon components using Font Awesome classes (consistent with the project)
const CalendarDays = ({ size, className }) => <i className={`fa-solid fa-calendar-days ${className}`} style={{fontSize: `${size}px`}}></i>;
const FileText = ({ size, className }) => <i className={`fa-solid fa-file-text ${className}`} style={{fontSize: `${size}px`}}></i>;
const User = ({ size, className }) => <i className={`fa-solid fa-user ${className}`} style={{fontSize: `${size}px`}}></i>;
const LogIn = ({ size, className }) => <i className={`fa-solid fa-right-to-bracket ${className}`} style={{fontSize: `${size}px`}}></i>;
const CheckCircle = ({ size, className }) => <i className={`fa-solid fa-circle-check ${className}`} style={{fontSize: `${size}px`}}></i>;

// Use the same doctors as in the appointment page - expanded to 20 doctors
const defaultConsultations = [
  { 
    id: 1, 
    name: 'Dr. Sarah Johnson', 
    specialty: 'Dentist', 
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=b6e3f4&color=262e33&size=60&bold=true'
  },
  { 
    id: 2, 
    name: 'Dr. Michael Chen', 
    specialty: 'General Physician', 
    avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=c0aede&color=3c4f5c&size=60&bold=true'
  },
  { 
    id: 3, 
    name: 'Dr. Emily Davis', 
    specialty: 'Dermatologist', 
    avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=ffd5dc&color=d08b5b&size=60&bold=true'
  },
  { 
    id: 4, 
    name: 'Dr. Robert Wilson', 
    specialty: 'Gynecologist/obstetrician', 
    avatar: 'https://ui-avatars.com/api/?name=Robert+Wilson&background=d1f2eb&color=6565b0&size=60&bold=true'
  },
  { 
    id: 5, 
    name: 'Dr. Lisa Anderson', 
    specialty: 'Ear-nose-throat (ent) Specialist', 
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Anderson&background=fadbd8&color=ff488e&size=60&bold=true'
  },
  { 
    id: 6, 
    name: 'Dr. David Kumar', 
    specialty: 'Homeopath', 
    avatar: 'https://ui-avatars.com/api/?name=David+Kumar&background=e8f6f3&color=ff5722&size=60&bold=true'
  },
  { 
    id: 7, 
    name: 'Dr. Priya Sharma', 
    specialty: 'Ayurveda', 
    avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=fff3e0&color=a7c957&size=60&bold=true'
  },
  { 
    id: 8, 
    name: 'Dr. James Wilson', 
    specialty: 'Cardiologist', 
    avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=ffcccb&color=8b0000&size=60&bold=true'
  },
  { 
    id: 9, 
    name: 'Dr. Maria Rodriguez', 
    specialty: 'Pediatrician', 
    avatar: 'https://ui-avatars.com/api/?name=Maria+Rodriguez&background=e6e6fa&color=4b0082&size=60&bold=true'
  },
  { 
    id: 10, 
    name: 'Dr. Ahmed Hassan', 
    specialty: 'Orthopedic Surgeon', 
    avatar: 'https://ui-avatars.com/api/?name=Ahmed+Hassan&background=f0fff0&color=006400&size=60&bold=true'
  },
  { 
    id: 11, 
    name: 'Dr. Jennifer Lee', 
    specialty: 'Neurologist', 
    avatar: 'https://ui-avatars.com/api/?name=Jennifer+Lee&background=f5f5dc&color=8b4513&size=60&bold=true'
  },
  { 
    id: 12, 
    name: 'Dr. Carlos Martinez', 
    specialty: 'Psychiatrist', 
    avatar: 'https://ui-avatars.com/api/?name=Carlos+Martinez&background=e0ffff&color=008b8b&size=60&bold=true'
  },
  { 
    id: 13, 
    name: 'Dr. Rachel Green', 
    specialty: 'Ophthalmologist', 
    avatar: 'https://ui-avatars.com/api/?name=Rachel+Green&background=ffefd5&color=ff8c00&size=60&bold=true'
  },
  { 
    id: 14, 
    name: 'Dr. Thomas Brown', 
    specialty: 'Urologist', 
    avatar: 'https://ui-avatars.com/api/?name=Thomas+Brown&background=f0f8ff&color=191970&size=60&bold=true'
  },
  { 
    id: 15, 
    name: 'Dr. Angela White', 
    specialty: 'Endocrinologist', 
    avatar: 'https://ui-avatars.com/api/?name=Angela+White&background=fffacd&color=b8860b&size=60&bold=true'
  },
  { 
    id: 16, 
    name: 'Dr. Kevin Park', 
    specialty: 'Radiologist', 
    avatar: 'https://ui-avatars.com/api/?name=Kevin+Park&background=f5fffa&color=2e8b57&size=60&bold=true'
  },
  { 
    id: 17, 
    name: 'Dr. Sofia Gonzalez', 
    specialty: 'Rheumatologist', 
    avatar: 'https://ui-avatars.com/api/?name=Sofia+Gonzalez&background=fff0f5&color=c71585&size=60&bold=true'
  },
  { 
    id: 18, 
    name: 'Dr. Daniel Kim', 
    specialty: 'Gastroenterologist', 
    avatar: 'https://ui-avatars.com/api/?name=Daniel+Kim&background=f8f8ff&color=6a5acd&size=60&bold=true'
  },
  { 
    id: 19, 
    name: 'Dr. Michelle Taylor', 
    specialty: 'Pulmonologist', 
    avatar: 'https://ui-avatars.com/api/?name=Michelle+Taylor&background=fff8dc&color=cd853f&size=60&bold=true'
  },
  { 
    id: 20, 
    name: 'Dr. Alexander Davis', 
    specialty: 'Anesthesiologist', 
    avatar: 'https://ui-avatars.com/api/?name=Alexander+Davis&background=f0ffff&color=008080&size=60&bold=true'
  }
];

const ReviewPage = () => {
  const [consultations, setConsultations] = useState(defaultConsultations.map(d => ({ ...d, hasReviewed: false })));
  const [filteredConsultations, setFilteredConsultations] = useState(consultations);
  const [searchTerm, setSearchTerm] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const userEmail = sessionStorage.getItem('email');

  // Search functionality
  useEffect(() => {
    const filtered = consultations.filter(doctor => 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredConsultations(filtered);
  }, [searchTerm, consultations]);

  // Fetch reviews for all doctors on mount
  useEffect(() => {
    defaultConsultations.forEach((doc, idx) => {
      fetch(`${API_URL}/api/reviews/${encodeURIComponent(doc.name)}`)
        .then(res => res.json())
        .then(data => {
          const userReview = data.find(r => r.userEmail === userEmail);
          setConsultations(prev => prev.map((c, i) =>
            i === idx ? { ...c, hasReviewed: !!userReview, feedback: userReview?.feedback, rating: userReview?.rating } : c
          ));
        })
        .catch(() => {});
    });
  }, [userEmail]);

  const handleGiveReview = (doctor) => {
    setSelectedDoctor(doctor);
    setShowReviewForm(true);
  };


  const handleSubmitReview = async (doctorId, feedbackObj) => {
    const doctor = consultations.find(c => c.id === doctorId);
    if (!doctor || !userEmail) return;
    // Save review to backend
    await fetch(`${API_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userEmail,
        doctorName: doctor.name,
        rating: feedbackObj.rating,
        feedback: feedbackObj.feedback
      })
    });
    setConsultations(prevConsultations =>
      prevConsultations.map(consultation =>
        consultation.id === doctorId ? { ...consultation, hasReviewed: true, feedback: feedbackObj.feedback, rating: feedbackObj.rating } : consultation
      )
    );
    setShowReviewForm(false);
    setSelectedDoctor(null);
  };

  const handleCloseReviewForm = () => {
    setShowReviewForm(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col items-center">
      <header className="w-full bg-purple-600 text-white p-4 shadow-md flex justify-between items-center rounded-b-lg">
        <div className="flex items-center">
          <img src="https://placehold.co/80x30/FFFFFF/000000?text=Medic4U" alt="Medic4U Logo" className="h-8 mr-4 rounded" />
        </div>
        <nav className="flex space-x-6">
          <a href="#" className="flex items-center space-x-1 hover:text-gray-200">
            <CalendarDays size={18} />
            <span>Appointments</span>
          </a>
          <a href="#" className="flex items-center space-x-1 hover:text-gray-200">
            <FileText size={18} />
            <span>Reviews</span>
          </a>
          <a href="#" className="flex items-center space-x-1 hover:text-gray-200">
            <User size={18} />
            <span>Sign Up</span>
          </a>
          <a href="#" className="flex items-center space-x-1 hover:text-gray-200">
            <LogIn size={18} />
            <span>Login</span>
          </a>
        </nav>
      </header>

      <main className="container mx-auto p-6 mt-8">
        <h1 className="text-4xl font-bold text-red-700 text-center mb-8">Reviews</h1>

        {/* Search functionality */}
        <div className="mb-6">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <i className="fa-solid fa-search text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg table-container">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-tl-lg">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Specialty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Provide review</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-tr-lg">Review status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredConsultations.map((consultation) => (
                <tr key={consultation.id}>
                  <td className="px-6 py-4 whitespace-nowrap" data-label="Name">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src={consultation.avatar} alt={`${consultation.name} avatar`} />
                      <div className="ml-4 text-sm font-medium text-gray-900">{consultation.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-label="Specialty">{consultation.specialty}</td>
                  <td className="px-6 py-4 whitespace-nowrap" data-label="Provide review">
                    {!consultation.hasReviewed ? (
                      <button onClick={() => handleGiveReview(consultation)} className="give-review-button">Give Review</button>
                    ) : (
                      <span className="review-submitted-text">Review Submitted</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center" data-label="Review status">
                    {consultation.hasReviewed && <CheckCircle className="check-icon" size={24} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showReviewForm && selectedDoctor && (
          <ReviewForm doctor={selectedDoctor} onSubmit={handleSubmitReview} onClose={handleCloseReviewForm} />
        )}
      </main>
    </div>
  );
};

const ReviewForm = ({ doctor, onSubmit, onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() && rating > 0) {
      onSubmit(doctor.id, { feedback, rating });
    } else {
      alert("Please provide feedback and rating.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Provide Feedback for {doctor.name}</h2>
        <p className="text-gray-600 mb-6">Share your experience with {doctor.name} ({doctor.specialty}).</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="feedback" className="block text-sm font-bold mb-2 text-gray-700">Your Feedback:</label>
            <textarea
              id="feedback"
              className="modal-content textarea"
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-700">Rating:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className="star-button"
                  style={{ color: star <= rating ? '#fbbf24' : '#d1d5db' }}
                  onClick={() => setRating(star)}
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="modal-button cancel">Cancel</button>
            <button type="submit" className="modal-button submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;
