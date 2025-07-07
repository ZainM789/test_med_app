import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    let storedDoctorData = null;
    let storedAppointmentData = null;

    try {
      storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
      if (storedDoctorData?.name) {
        storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData.name));
      }
    } catch (e) {
      console.error("Error parsing localStorage data", e);
    }

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    if (storedAppointmentData && storedAppointmentData.status !== 'cancelled') {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true);
    }
  }, []);

  // Listen for appointment cancellation (simulate from localStorage or could be triggered externally)
  useEffect(() => {
    const interval = setInterval(() => {
      if (doctorData?.name) {
        const latestData = JSON.parse(localStorage.getItem(doctorData.name));
        if (latestData?.status === 'cancelled') {
          setShowNotification(false);
          setAppointmentData(null);
        }
      }
    }, 1000); // Check every second (or you can use other events/props to trigger it)

    return () => clearInterval(interval);
  }, [doctorData]);

  return (
    <div>
      <Navbar />
      {children}

      {isLoggedIn && showNotification && appointmentData && (
        <div className="notification-container">
          <div className="appointment-card">
            <div className="appointment-card__content">
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p><strong>Patient:</strong> {username}</p>
              <p><strong>Doctor:</strong> {doctorData?.name}</p>
              <p><strong>Date:</strong> {appointmentData?.date}</p>
              <p><strong>Time:</strong> {appointmentData?.time}</p>
              <p className="appointment-card__status">Status: <strong>{appointmentData?.status || 'confirmed'}</strong></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
