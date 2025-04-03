const sensor_model = require('../../models/sensor.model')
//const mongoose = require('mongoose');

module.exports = {
    async Hello(req, res) {
        res.send('Hello World!');
    },
    async getStatus(req,res){
        res.send('getStatus!');
    },
    async updateSensor(req,res){
        res.send('updateSensor!');
    }
}