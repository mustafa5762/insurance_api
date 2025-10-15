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
      fuel_type: variantSpecs.fuel_type,
      fuel_capacity: variantSpecs.fuel_capacity,
      seating_capacity: variantSpecs.seating_capacity,
      transmission_type: variantSpecs.transmission_type
    });

    return await registration.save();
  }
}

module.exports = CarService;