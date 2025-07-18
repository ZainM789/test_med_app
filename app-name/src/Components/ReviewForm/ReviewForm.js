import React, { useState, useEffect } from 'react';
import './ReviewForm.css';
import { API_URL } from '../../config';

// Icon components using Font Awesome classes (consistent with the project)
const CalendarDays = ({ size, className }) => <i className={`fa-solid fa-calendar-days ${className}`} style={{fontSize: `${size}px`}}></i>;
const FileText = ({ size, className }) => <i className={`fa-solid fa-file-text ${className}`} style={{fontSize: `${size}px`}}></i>;
const User = ({ size, className }) => <i className={`fa-solid fa-user ${className}`} style={{fontSize: `${size}px`}}></i>;
const LogIn = ({ size, className }) => <i className={`fa-solid fa-right-to-bracket ${className}`} style={{fontSize: `${size}px`}}></i>;
const CheckCircle = ({ size, className }) => <i className={`fa-solid fa-circle-check ${className}`} style={{fontSize: `${size}px`}}></i>;

// Use the same doctors as in the appointment page
const defaultConsultations = [
  { 
    id: 1, 
    name: 'Dr. Sarah Johnson', 
    specialty: 'Dentist', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah&backgroundColor=b6e3f4&clothingColor=262e33&eyeColor=blue&hairColor=blonde&skinColor=f8d25c&accessories=prescription02&clothing=blazerShirt'
  },
  { 
    id: 2, 
    name: 'Dr. Michael Chen', 
    specialty: 'General Physician', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael&backgroundColor=c0aede&clothingColor=3c4f5c&eyeColor=brown&hairColor=black&skinColor=ae5d29&accessories=prescription01&clothing=blazerSweater'
  },
  { 
    id: 3, 
    name: 'Dr. Emily Davis', 
    specialty: 'Dermatologist', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily&backgroundColor=ffd5dc&clothingColor=d08b5b&eyeColor=green&hairColor=auburn&skinColor=edb98a&accessories=sunglasses&clothing=collarSweater'
  },
  { 
    id: 4, 
    name: 'Dr. Robert Wilson', 
    specialty: 'Gynecologist/Obstetrician', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=robert&backgroundColor=d1f2eb&clothingColor=6565b0&eyeColor=blue&hairColor=brown&skinColor=fdbcb4&accessories=prescription02&clothing=blazerShirt'
  },
  { 
    id: 5, 
    name: 'Dr. Lisa Anderson', 
    specialty: 'ENT Specialist', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa&backgroundColor=fadbd8&clothingColor=ff488e&eyeColor=brown&hairColor=red&skinColor=f8d25c&accessories=wayfarers&clothing=overall'
  },
  { 
    id: 6, 
    name: 'Dr. David Kumar', 
    specialty: 'Homeopath', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david&backgroundColor=e8f6f3&clothingColor=ff5722&eyeColor=brown&hairColor=black&skinColor=ae5d29&accessories=prescription01&clothing=shirtCrewNeck'
  },
  { 
    id: 7, 
    name: 'Dr. Priya Sharma', 
    specialty: 'Ayurveda', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya&backgroundColor=fff3e0&clothingColor=a7c957&eyeColor=brown&hairColor=black&skinColor=d08b5b&accessories=kurt&clothing=blazerSweater'
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

        <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src={consultation.avatar} alt={`${consultation.name} avatar`} />
                      <div className="ml-4 text-sm font-medium text-gray-900">{consultation.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{consultation.specialty}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {!consultation.hasReviewed ? (
                      <button onClick={() => handleGiveReview(consultation)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Give Review</button>
                    ) : (
                      <span className="text-sm text-gray-500">Review Submitted</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {consultation.hasReviewed && <CheckCircle className="text-green-500 mx-auto" size={24} />}
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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Provide Feedback for {doctor.name}</h2>
        <p className="text-gray-600 mb-6">Share your experience with {doctor.name} ({doctor.specialty}).</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="feedback" className="block text-sm font-bold mb-2 text-gray-700">Your Feedback:</label>
            <textarea
              id="feedback"
              className="w-full p-2 border rounded focus:outline-none focus:ring"
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-gray-700">Rating:</label>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="cursor-pointer text-2xl"
                style={{ color: star <= rating ? 'gold' : 'gray' }}
                onClick={() => setRating(star)}
              >
                &#9733;
              </span>
            ))}
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;
