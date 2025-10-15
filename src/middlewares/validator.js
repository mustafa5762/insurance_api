const Joi = require('joi');

const schemas = {
  register: Joi.object({
    make: Joi.string().required(),
    model: Joi.string().required(),
    variant: Joi.string().required(),
    rtoCode: Joi.string().required(), // ✅ NEW!
    city: Joi.string().required(),
    registration_date: Joi.date().required(),
    make_year: Joi.number().integer().min(1900).max(2025).required(),
    is_used: Joi.boolean().required(),
    pyp_expiry: Joi.date().optional(),
    claims_in_pyp: Joi.number().integer().min(0).optional(),
    previous_insurer: Joi.string().optional()
  })
};

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }
  next();
};

module.exports = { validate, schemas };