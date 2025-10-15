const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Make = require('../models/Make');
const ModelCar = require('../models/ModelCar');
const Variant = require('../models/Variant');
const VehicleSpec = require('../models/VehicleSpec');
const RTOCode = require('../models/RTOCode');
const City = require('../models/City');
const Insurer = require('../models/Insurer');

dotenv.config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing data
    await Make.deleteMany({});
    await ModelCar.deleteMany({});
    await Variant.deleteMany({});
    await VehicleSpec.deleteMany({});
    await RTOCode.deleteMany({});
    await City.deleteMany({});
    await Insurer.deleteMany({});
    console.log('🧹 Cleared collections');

    // Seed Makes
    const makes = await Make.insertMany([
      { name: 'Maruti Suzuki' },
      { name: 'Tata' },
      { name: 'Mahindra' },
      { name: 'Hyundai' },
      { name: 'Toyota' }
    ]);
    console.log('🚗 Added Makes');

    // Seed Models (linked to Makes)
    const models = await ModelCar.insertMany([
      { name: 'Swift', make: makes[0]._id },
      { name: 'Nexon', make: makes[1]._id },
      { name: 'Thar', make: makes[2]._id },
      { name: 'Creta', make: makes[3]._id },
      { name: 'Innova', make: makes[4]._id }
    ]);
    console.log('🚙 Added Models');

    // Seed Variants (linked to Models)
    const variants = await Variant.insertMany([
      { name: 'Swift LXi', model: models[0]._id },
      { name: 'Swift ZXi', model: models[0]._id },
      { name: 'Nexon XE', model: models[1]._id },
      { name: 'Thar LX', model: models[2]._id },
      { name: 'Creta EX', model: models[3]._id },
      { name: 'Innova Crysta', model: models[4]._id }
    ]);
    console.log('🔧 Added Variants');

    // Seed VehicleSpecs (separate, linked to Variants)
    await VehicleSpec.insertMany([
      { variant: variants[0]._id, fuel_type: 'Petrol', fuel_capacity: 37, seating_capacity: 5, transmission_type: 'Manual' },
      { variant: variants[1]._id, fuel_type: 'Petrol', fuel_capacity: 37, seating_capacity: 5, transmission_type: 'Automatic' },
      { variant: variants[2]._id, fuel_type: 'Diesel', fuel_capacity: 44, seating_capacity: 5, transmission_type: 'Manual' },
      { variant: variants[3]._id, fuel_type: 'Diesel', fuel_capacity: 57, seating_capacity: 4, transmission_type: 'Manual' },
      { variant: variants[4]._id, fuel_type: 'Diesel', fuel_capacity: 50, seating_capacity: 5, transmission_type: 'Automatic' },
      { variant: variants[5]._id, fuel_type: 'Diesel', fuel_capacity: 55, seating_capacity: 7, transmission_type: 'Manual' }
    ]);
    console.log('📊 Added Vehicle Specs');

    // Seed RTOCodes
    const rtoCodes = await RTOCode.insertMany([
      { code: 'DL-01' }, // Delhi
      { code: 'MH-02' }, // Mumbai
      { code: 'KA-01' }, // Bangalore
      { code: 'TN-01' }, // Chennai
      { code: 'GJ-01' }  // Ahmedabad
    ]);
    console.log('📍 Added RTO Codes');

    // Seed Cities (multiple per RTOCode)
    await City.insertMany([
      // DL-01 (Delhi)
      { name: 'Delhi North', rtoCode: rtoCodes[0]._id },
      { name: 'Delhi Central', rtoCode: rtoCodes[0]._id },
      { name: 'Delhi South', rtoCode: rtoCodes[0]._id },
      // MH-02 (Mumbai)
      { name: 'Mumbai Andheri', rtoCode: rtoCodes[1]._id },
      { name: 'Mumbai Tardeo', rtoCode: rtoCodes[1]._id },
      // KA-01 (Bangalore)
      { name: 'Bangalore Central', rtoCode: rtoCodes[2]._id },
      { name: 'Bangalore East', rtoCode: rtoCodes[2]._id },
      // TN-01 (Chennai)
      { name: 'Chennai North', rtoCode: rtoCodes[3]._id },
      // GJ-01 (Ahmedabad)
      { name: 'Ahmedabad Central', rtoCode: rtoCodes[4]._id }
    ]);
    console.log('🏙️ Added Cities');

    // Seed Insurers
    await Insurer.insertMany([
      { name: 'ICICI Lombard' },
      { name: 'HDFC ERGO' },
      { name: 'Bajaj Allianz' },
      { name: 'TATA AIG' },
      { name: 'New India Assurance' }
    ]);
    console.log('🛡️ Added Insurers');

    console.log('🌱 Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();