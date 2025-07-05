import React, { useState } from 'react';
import './AppointmentForm.css';

const slots = [
  "09:00 AM - 09:30 AM",
  "10:00 AM - 10:30 AM",
  "11:00 AM - 11:30 AM",
  "12:00 PM - 12:30 PM",
  "02:00 PM - 02:30 PM",
  "03:00 PM - 03:30 PM"
];

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
    if (!appointmentDate) newErrors.appointmentDate = 'Date of Appointment is required';
    if (!selectedSlot) newErrors.selectedSlot = 'Time Slot is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name, phoneNumber, appointmentDate, slot: selectedSlot });
    setName('');
    setPhoneNumber('');
    setAppointmentDate('');
    setSelectedSlot('');
    setErrors({});
  };

  return (
    <div className="appointment-wrapper">
      <div className="doctor-header">
        <h3>{doctorName}</h3>
        <p className="speciality">{doctorSpeciality}</p>
        <p><strong>Ratings:</strong> ⭐⭐⭐⭐</p>
      </div>

      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            required
          />
          {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="appointmentDate">Date of Appointment:</label>
          <input
            type="date"
            id="appointmentDate"
            value={appointmentDate}
            onChange={e => setAppointmentDate(e.target.value)}
            required
          />
          {errors.appointmentDate && <span className="error-text">{errors.appointmentDate}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="timeSlot">Book Time Slot:</label>
          <select
            id="timeSlot"
            value={selectedSlot}
            onChange={e => setSelectedSlot(e.target.value)}
            required
          >
            <option value="">Select a time slot</option>
            {slots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          {errors.selectedSlot && <span className="error-text">{errors.selectedSlot}</span>}
        </div>
        <button type="submit" className="book-btn" disabled={!name || !phoneNumber || !appointmentDate || !selectedSlot}>
          Book Now
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
