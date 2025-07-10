import React, { useState } from 'react';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const defaultProfilePic =
  "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor&backgroundColor=f0f0f0&clothingColor=3c4f5c&eyeColor=blue&hairColor=brown&skinColor=fdbcb4&accessories=prescription01&clothing=blazerShirt";

const DoctorCard = ({
  name = "Dr. John Doe",
  speciality = "General Physician",
  experience = 10,
  ratings = 4.8,
  profilePic = defaultProfilePic,
  careerProfile = "MBBS, MD - Medicine | Senior Consultant at City Hospital"
}) => {
  const [showModal, setShowModal] = useState(false);
  const [appointment, setAppointment] = useState(null); // State to store a single appointment

  const handleFormSubmit = (appointmentData) => {
    console.log("Appointment Data:", appointmentData); // Verification log
    setAppointment(appointmentData); // Set the appointment data
    setShowModal(false); // Close the modal after submission
  };

  const handleCancel = () => {
    setAppointment(null); // Clear the appointment
    setShowModal(false); // Close the modal after cancellation
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-info-section">
          <div className="doctor-card-profile-image-container">
            <img
              src={profilePic}
              alt={`${name}'s profile`}
              className="doctor-card-profile-image"
              loading="lazy"
            />
          </div>
          <div className="doctor-card-details">
            <div className="doctor-card-detail-name">{name}</div>
            <div className="doctor-card-detail-speciality">{speciality}</div>
            <div className="doctor-card-detail-experience">{experience} years experience</div>
            <div className="doctor-card-detail-career">{careerProfile}</div>
            <div className="doctor-card-detail-ratings">
              <span className="rating-star">⭐</span>
              <span className="rating-text">{ratings}/5</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Move button section to bottom */}
      <div className="doctor-card-button-section">
        {/* This div will contain the Popup for booking/cancelling */}
        <Popup
          trigger={
            <button
              className={`book-appointment-btn ${appointment ? 'cancel-appointment' : ''}`}
              onClick={() => setShowModal(true)}
            >
              <div>{appointment ? "Cancel Appointment" : "Book Appointment"}</div>
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
            {/* The content of the popup */}
            {(close) => (
              <div className="doctorbg" style={{ height: 'auto', maxHeight: '80vh', overflow: 'auto' }}>
                {/* Doctor details within the modal (optional, but good for context) */}
                <div>
                  <div className="doctor-card-profile-image-container">
                    <img
                      src={profilePic}
                      alt={`${name}'s profile`}
                      className="doctor-card-profile-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="doctor-card-details">
                    <div className="doctor-card-detail-name">{name}</div>
                    <div className="doctor-card-detail-speciality">{speciality}</div>
                    <div className="doctor-card-detail-experience">{experience} years experience</div>
                    <div className="doctor-card-detail-ratings" style={{ justifyContent: 'center' }}>
                      <span className="rating-star">⭐</span>
                      <span className="rating-text">{ratings}/5</span>
                    </div>
                  </div>
                </div>

                {/* Conditional rendering based on whether an appointment is booked */}
                {appointment ? (
                  <>
                    <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                    <div className="bookedInfo">
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <p>Date: {appointment.appointmentDate || 'No date selected'}</p>
                      <p>Time Slot: {appointment.slot || 'No time slot selected'}</p>
                      <button onClick={() => { handleCancel(); close(); }}>
                        Cancel Appointment
                      </button>
                    </div>
                  </>
                ) : (
                  <AppointmentForm
                    doctorName={name}
                    doctorSpeciality={speciality}
                    onSubmit={handleFormSubmit} // Pass the submit handler
                  />
                )}
              </div>
            )}
          </Popup>
      </div>
      {/* ✅ Show appointment summary below card if booked */}
      {appointment && (
        <div className="appointment-summary">
          <h4>Booked Appointment Details:</h4>
          <p><strong>Name:</strong> {appointment.name}</p>
          <p><strong>Phone:</strong> {appointment.phoneNumber}</p>
          <p><strong>Date:</strong> {appointment.appointmentDate || 'No date selected'}</p>
          <p><strong>Time Slot:</strong> {appointment.slot || 'No time slot selected'}</p>
          <button onClick={handleCancel}>Cancel Appointment</button>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;