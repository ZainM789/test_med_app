import React, { useState } from 'react'

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);

    // Example time slots
    const slots = [
      "09:00 AM - 09:30 AM",
      "10:00 AM - 10:30 AM",
      "11:00 AM - 11:30 AM",
      "12:00 PM - 12:30 PM",
      "02:00 PM - 02:30 PM",
      "03:00 PM - 03:30 PM"
    ];

    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };

    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, phoneNumber, slot: selectedSlot });
      setName('');
      setPhoneNumber('');
      setSelectedSlot(null);
    };

    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Choose a Time Slot:</label>
          <div className="slot-list">
            {slots.map(slot => (
              <button
                type="button"
                key={slot}
                className={`slot-btn${selectedSlot === slot ? ' selected' : ''}`}
                onClick={() => handleSlotSelection(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
        <button type="submit" disabled={!selectedSlot}>
          Book Now
        </button>
      </form>
    );
  };

export default AppointmentFormIC