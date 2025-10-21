const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  disciple: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disciple',
    required: true
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  meetingDate: {
    type: Date,
    required: true
  },
  attendanceType: {
    type: String,
    enum: ['in_person', 'virtual', 'absent'],
    required: true
  },
  observations: {
    type: String,
    trim: true
  },
  // Para reportar si la reunión se movió de fecha
  wasRescheduled: {
    type: Boolean,
    default: false
  },
  rescheduleReason: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Índice para búsquedas eficientes
attendanceSchema.index({ disciple: 1, meetingDate: 1 });
attendanceSchema.index({ leader: 1, meetingDate: 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);