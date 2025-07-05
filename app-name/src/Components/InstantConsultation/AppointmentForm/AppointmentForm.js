import React, { useState, useEffect } from 'react';
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
  const [appointmentDate, setAppointmentDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [errors, setErrors] = useState({});
  const [dateInputError, setDateInputError] = useState('');

  // Debugging effect
  useEffect(() => {
    console.log('AppointmentForm mounted');
    console.log('Initial date value:', appointmentDate);

    // Check if the date input exists in the DOM
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
      console.log('Date input exists in DOM:', dateInput);
    } else {
      console.log('Date input does not exist in DOM');
    }
  }, [appointmentDate]);

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    console.log('Date changed to:', dateValue); // Log when the date changes
    setAppointmentDate(dateValue);
    
    // Reset error if date is selected
    if (dateValue) {
      console.log('Date selected, clearing error');
      setDateInputError('');
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      console.log('Name validation failed');
    }
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
      console.log('Phone validation failed');
    }
    if (!appointmentDate) {
      newErrors.appointmentDate = 'Date of Appointment is required';
      console.log('Date validation failed');
      setDateInputError('Please select a valid date');
    } else {
      console.log('Date is valid:', appointmentDate);
    }
    if (!selectedSlot) {
      newErrors.selectedSlot = 'Time Slot is required';
      console.log('Slot validation failed');
    }
    setErrors(newErrors);
    console.log('Validation complete, errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submission started');
    if (!validate()) {
      console.log('Form validation failed');
      return;
    }
    
    console.log('Form is valid, submitting with data:', { name, phoneNumber, appointmentDate, slot: selectedSlot });
    onSubmit({ name, phoneNumber, appointmentDate, slot: selectedSlot });
    
    console.log('Form submitted successfully');
    setName('');
    setPhoneNumber('');
    setAppointmentDate('');
    setSelectedSlot('');
    setErrors({});
    setDateInputError('');
    console.log('Form reset complete');
  };

  return (
    <div className="appointment-wrapper">
      <h3>{doctorName}</h3>
      <p>{doctorSpeciality}</p>
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            required
          />
          {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
        </div>
        <div className="form-group">
          <label>Date of Appointment:</label>
          <input
            type="date"
            id="appointmentDate"
            value={appointmentDate}
            onChange={handleDateChange}
            min={new Date().toISOString().split('T')[0]}
            className={`date-input ${dateInputError ? 'error' : ''}`}
            required
          />
          {errors.appointmentDate && <span className="error-text">{errors.appointmentDate}</span>}
          {dateInputError && <span className="error-text">{dateInputError}</span>}
          <div className="date-display">
            Current date value: {appointmentDate || 'Not selected'}
          </div>
        </div>
        <div className="form-group">
          <label>Book Time Slot:</label>
          <select
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
        <button className="book-btn" type="submit">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;