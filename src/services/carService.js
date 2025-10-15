const Make = require('../models/Make');
const ModelCar = require('../models/ModelCar');
const Variant = require('../models/Variant');
const VehicleSpec = require('../models/VehicleSpec');
const RTOCode = require('../models/RTOCode');
const City = require('../models/City');
const Insurer = require('../models/Insurer');
const Registration = require('../models/Registration');

class CarService {
  static async getMakes() {
    return await Make.find({}, 'name');
  }

  static async getModelsByMake(makeId) {
    return await ModelCar.find({ make: makeId }, 'name');
  }

  // FIXED: Variants ONLY
  static async getVariants(modelId) {
    return await Variant.find({ model: modelId }, 'name');
  }

  // NEW: Specs ONLY for selected variant
  static async getVariantSpec(variantId) {
    return await VehicleSpec.findOne({ variant: variantId });
  }

  static async getRTOCodes() {
    return await RTOCode.find({}, 'code');
  }

  static async getCitiesByRTO(rtoCodeId) {
    return await City.find({ rtoCode: rtoCodeId }, 'name');
  }

  static async getInsurers() {
    return await Insurer.find({}, 'name');
  }

  static async registerCar(data) {
    const variantSpecs = await VehicleSpec.findOne({ variant: data.variant });
    
    const registration = new Registration({
      ...data,
      rtoCode: data.rtoCode,
      fuel_type: data.fuel_type,
      fuel_capacity: data.fuel_capacity,
      seating_capacity: data.seating_capacity,
      transmission_type: data.transmission_type
    });

    return await registration.save();
  }

  static async getRegistrations(filters = {}) {
    const { make, rtoCode, city, startDate, endDate, isUsed } = filters;
    
    let whereClause = {};
    
    // Filter by Make
    if (make) whereClause.make = make;
    
    // Filter by RTO Code  
    if (rtoCode) whereClause.rtoCode = rtoCode;
    
    // Filter by City
    if (city) whereClause.city = city;
    
    // Filter by Date Range
    if (startDate || endDate) {
      whereClause.registration_date = {};
      if (startDate) whereClause.registration_date.$gte = new Date(startDate);
      if (endDate) whereClause.registration_date.$lte = new Date(endDate);
    }
    
    // Filter by Used/New
    if (isUsed !== undefined) {
      whereClause.is_used = isUsed;
    }
    
    // MONGODB: find() + populate()
    const registrations = await Registration.find(whereClause)
      .populate('make', 'name')
      .populate('model', 'name')
      .populate('variant', 'name')
      .populate('rtoCode', 'code')
      .populate('city', 'name')
      .populate('previous_insurer', 'name')
      .sort({ registration_date: -1 });
      
    return registrations;
  }
}

module.exports = CarService;