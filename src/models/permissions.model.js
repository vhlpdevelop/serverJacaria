const { Schema, model } = require('mongoose');

const Permissions = new Schema({
  routes:[],
  type:{type:String, default: "teste"},
  createdAt:{ type: Date, default: Date.now },
  updatedAt:{ type: Date, default: Date.now }
},{collection: 'Permissions'});

Permissions.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = model('Permissions', Permissions);