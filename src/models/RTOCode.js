const mongoose = require('mongoose');

const rtoCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('RTOCode', rtoCodeSchema);