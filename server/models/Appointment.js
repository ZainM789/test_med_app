const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  doctorName: { type: String, required: true },
  doctorSpeciality: { type: String },
  appointmentDate: { type: Date, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
