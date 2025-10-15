const mongoose = require('mongoose');

const modelCarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  make: { type: mongoose.Schema.Types.ObjectId, ref: 'Make', required: true }
}, { timestamps: true });

module.exports = mongoose.model('ModelCar', modelCarSchema);