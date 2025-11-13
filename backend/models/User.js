const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'leader'],
    default: 'leader'
  },
  phone: {
    type: String,
    trim: true
  },
  groupLife: {
    name: String,
    schedule: String, // ej: "Lunes 19:00"
    gender: {
      type: String,
      enum: ['male', 'female', 'mixed'],
      default: 'mixed'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Crea createdAt y updatedAt automáticamente
});
//Aqui agregue lo necesario para bcrypt para guardar la contraseña y para comparar.

// HASH PASSWORD ANTES DE GUARDAR
userSchema.pre('save', async function(next) {
  // Solo hashear si el password fue modificado
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// MÉTODO PARA COMPARAR PASSWORDS
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

//Lo de abajo es necesario revisar antes de editar.
// Método para devolver datos públicos del usuario (sin password)
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);