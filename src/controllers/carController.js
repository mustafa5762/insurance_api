const Registration = require('../models/Registration');
const CarService = require('../services/carService');

class CarController {
  static async getMakes(req, res) {
    try {
      const makes = await CarService.getMakes();
      res.json({ success: true, data: makes });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getModels(req, res) {
    try {
      const { makeId } = req.params;
      const models = await CarService.getModelsByMake(makeId);
      res.json({ success: true, data: models });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // FIXED: Variants ONLY
  static async getVariants(req, res) {
    try {
      const { modelId } = req.params;
      const variants = await CarService.getVariants(modelId);
      res.json({ success: true, data: variants });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // NEW: Specs for selected variant
  static async getVariantSpec(req, res) {
    try {
      const { variantId } = req.params;
      const specs = await CarService.getVariantSpec(variantId);
      res.json({ success: true, data: specs });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getRTOCodes(req, res) {
    try {
      const rtoCodes = await CarService.getRTOCodes();
      res.json({ success: true, data: rtoCodes });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getCities(req, res) {
    try {
      const { rtoCodeId } = req.params;
      const cities = await CarService.getCitiesByRTO(rtoCodeId);
      res.json({ success: true, data: cities });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getInsurers(req, res) {
    try {
      const insurers = await CarService.getInsurers();
      res.json({ success: true, data: insurers });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async registerCar(req, res) {
    try {
      const registration = await CarService.registerCar(req.body);
      const populated = await Registration.findById(registration._id)
        .populate('make model variant rtoCode city previous_insurer'); // ✅ rtoCode!
      res.status(201).json({ 
        success: true, 
        message: 'Car registered successfully!', 
        data: populated 
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getRegistrations(req, res) {
    try {
      const filters = req.query; // ?make=1&city=2&startDate=2023-01-01
      const registrations = await CarService.getRegistrations(filters);
      res.json({ 
        success: true, 
        count: registrations.length,
        data: registrations 
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = CarController;