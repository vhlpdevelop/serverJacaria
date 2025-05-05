// src/sensor_service/validation/sensorSchema.js
const { z } = require('zod');

const sensorSchema = z.object({
  id_sensor: z.string().min(1),
  sensor_type: z.string().min(1),
  location: z.string().min(1),
  message: z.string().optional(),
  level: z.string().optional(),
  temp: z.string().optional(),
  amony: z.string().optional(),
  pressure: z.string().optional(),
  activations: z.string().optional(),
  humidity: z.string().optional()
});

module.exports = sensorSchema;
