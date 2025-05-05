// src/sensor_service/middleware/validateSensor.js
const sensorSchema = require('../validation/sensorSchema');

function validateSensor(req, res, next) {
  const result = sensorSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.format();
    return res.status(400).json({
      error: 'Payload incorreto',
      details: errors,
    });
  }

  // Se quiser: req.validatedData = result.data;
  next();
}

module.exports = validateSensor;
