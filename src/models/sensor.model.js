const { Schema, model } = require('mongoose');

const Sensors = new Schema({
  id_sensor:{type:String, required:true},
  sensor_type:{type:String, required:true},
  location: {type:String, required:true},
  message:{type:String, default: "empty"},
  level: {type:String, default:"empty"},
  temp: {type:String, default: "empty"}, //bme280
  amony: {type:String, default: "empty"},
  pressure: {type:String, default:"empty"}, //pressão atmosferica bme280
  activations:{type:String, default: "empty"},
  humidity:{type:String, default: "empty"}, //bme280
  createdAt:{ type: Date, default: Date.now },
  updatedAt:{ type: Date, default: Date.now }
},{collection: 'Sensors'});

Sensors.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = model('Sensors', Sensors);