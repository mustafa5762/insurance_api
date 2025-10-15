const mongoose = require('mongoose');

const vehicleSpecSchema = new mongoose.Schema({
  variant: { type: mongoose.Schema.Types.ObjectId, ref: 'Variant', required: true },
  fuel_type: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], required: true },
  fuel_capacity: { type: Number, required: true }, // in liters
  seating_capacity: { type: Number, required: true },
  transmission_type: { type: String, enum: ['Automatic', 'Manual'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('VehicleSpec', vehicleSpecSchema);