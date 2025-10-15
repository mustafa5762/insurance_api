const express = require('express');
const CarController = require('../controllers/carController');
const { validate, schemas } = require('../middlewares/validator');

const router = express.Router();

router.get('/makes', CarController.getMakes);
router.get('/models/:makeId', CarController.getModels);
router.get('/variants/:modelId', CarController.getVariants);
router.get('/variant-spec/:variantId', CarController.getVariantSpec);
router.get('/rto-codes', CarController.getRTOCodes);
router.get('/cities/:rtoCodeId', CarController.getCities);
router.get('/insurers', CarController.getInsurers);
router.get('/registrations', CarController.getRegistrations);

router.post('/register', validate(schemas.register), CarController.registerCar);

module.exports = router;