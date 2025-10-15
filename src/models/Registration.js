const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  make: { type: mongoose.Schema.Types.ObjectId, ref: 'Make', required: true },
  model: { type: mongoose.Schema.Types.ObjectId, ref: 'ModelCar', required: true },
  variant: { type: mongoose.Schema.Types.ObjectId, ref: 'Variant', required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  registration_date: { type: Date, required: true },
  make_year: { type: Number, required: true },
  is_used: { type: Boolean, required: true },
  pyp_expiry: { type: Date },
  claims_in_pyp: { type: Number },
  previous_insurer: { type: mongoose.Schema.Types.ObjectId, ref: 'Insurer' },
  // Vehicle specs copied here for easy queries
  fuel_type: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], required: true },
  fuel_capacity: { type: Number, required: true },
  seating_capacity: { type: Number, required: true },
  transmission_type: { type: String, enum: ['Automatic', 'Manual'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);