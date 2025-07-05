import React, { useState } from 'react';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const defaultProfilePic =
  "https://images.unsplash.com/photo-1511174511562-5f97f4f9c6b0?fit=crop&w=400&q=80";
const DoctorCard = ({
  name = "Dr. John Doe",
  speciality = "General Physician",
  experience = 10,
  ratings = 4.8,
  profilePic = defaultProfilePic,
  careerProfile = "MBBS, MD - Medicine | Senior Consultant at City Hospital"
}) => {
  const [showModal, setShowModal] = useState(false);
  const [appointment, setAppointment] = useState(null);
  
  const handleFormSubmit = (appointmentData) => {
    console.log("Appointment Data:", appointmentData); // Verification log
    setAppointment(appointmentData);
    setShowModal(false);
  };
  
  const handleCancel = () => {
    setAppointment(null);
  };
  
  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
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
            <span className="star">&#9733;</span> {ratings} / 5
          </div>
        </div>
        <div>
          <Popup
            trigger={
              <button className='book-appointment-btn' onClick={() => setShowModal(true)}>
                <div>{appointment ? "Cancel Appointment" : "Book Appointment"}</div>
                <div>No Booking Fee</div>
              </button>
            }
            modal
            open={showModal}
            onClose={() => setShowModal(false)}
          >
            {(close) => (
              <div>
                {appointment ? (
                  <div style={{ padding: 20, textAlign: 'center' }}>
                    <h3>Appointment Booked!</h3>
                    <p>Name: {appointment.name}</p>
                    <p>Phone Number: {appointment.phoneNumber}</p>
                    <p>Date: {appointment.appointmentDate || 'No date selected'}</p>
                    <p>Time Slot: {appointment.slot || 'No time slot selected'}</p>
                    <button onClick={() => { handleCancel(); close(); }}>
                      Cancel Appointment
                    </button>
                  </div>
                ) : (
                  <AppointmentForm
                    doctorName={name}
                    doctorSpeciality={speciality}
                    onSubmit={data => { handleFormSubmit(data); close(); }}
                  />
                )}
              </div>
            )}
          </Popup>
        </div>
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