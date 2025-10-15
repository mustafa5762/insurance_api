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
    const { make, city, startDate, endDate, isUsed } = filters;
    
    let whereClause = {};
    
    // Filter by Make
    if (make) {
      whereClause.makeId = make;
    }
    
    // Filter by City  
    if (city) {
      whereClause.cityId = city;
    }
    
    // Filter by Date Range
    if (startDate || endDate) {
      whereClause.registration_date = {};
      if (startDate) whereClause.registration_date[Op.gte] = startDate;
      if (endDate) whereClause.registration_date[Op.lte] = endDate;
    }
    
    // Filter by Used/New
    if (isUsed !== undefined) {
      whereClause.is_used = isUsed;
    }
    
    // Include related data (Make, Model, City names)
    const registrations = await Registration.findAll({
      where: whereClause,
      include: [
        { model: Make, attributes: ['name'] },
        { model: ModelCar, attributes: ['name'] },
        { model: Variant, attributes: ['name'] },
        { model: City, attributes: ['name'] },
        { model: Insurer, attributes: ['name'] }
      ],
      order: [['registration_date', 'DESC']]
    });
    
    return registrations;
  }
}

module.exports = CarService;