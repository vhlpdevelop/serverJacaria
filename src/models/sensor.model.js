const { Schema, model } = require('mongoose');

const Sensors = new Schema({
  id_sensor:{type:String, required:true},
  sensor_type:{type:String, required:true},
  message:{type:String, default: "empty"},
  level: {type:String, default:"empty"},
  temp: {type:String, default: "empty"},
  activations:{type:String, default: "empty"},
  humidity:{type:String, default: "empty"},
  createdAt:{ type: Date, default: Date.now },
  updatedAt:{ type: Date, default: Date.now }
},{collection: 'Sensors'});

Sensors.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = model('Sensors', Sensors);