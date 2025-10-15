const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: mongoose.Schema.Types.ObjectId, ref: 'ModelCar', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Variant', variantSchema);