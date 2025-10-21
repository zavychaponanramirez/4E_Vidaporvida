const mongoose = require('mongoose');

const discipleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'El teléfono es obligatorio'],
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  district: {
    type: String,
    trim: true
  },
  birthDate: {
    type: Date
  },
  reachSource: {
    type: String,
    enum: ['friend', 'family', 'event', 'social_media', 'other'],
    required: true
  },
  reachDescription: {
    type: String, // Más detalles del medio de alcance
    trim: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['new', 'established', 'reconnected'],
    default: 'new'
  },
  // RELACIONES
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  groupLife: {
    type: String, // Horario del grupo para fácil acceso
    required: true
  },
  // SEGUIMIENTO DE MATERIALES
  completedMaterials: [{
    materialName: String, // ej: "one_to_one", "purple_book"
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  // EVANGELISMO
  isEvangelizing: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Disciple', discipleSchema);