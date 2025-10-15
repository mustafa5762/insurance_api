const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  rtoCode: { type: mongoose.Schema.Types.ObjectId, ref: 'RTOCode', required: true }
}, { timestamps: true });

module.exports = mongoose.model('City', citySchema);