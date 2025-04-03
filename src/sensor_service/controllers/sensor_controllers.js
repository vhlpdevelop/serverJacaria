const sensor_model = require('../../models/sensor.model')
//const mongoose = require('mongoose');

module.exports = {
    async Hello(req, res) {
        res.send('Hello World!');
    },
    async getStatus(req,res){
        try{
            const quinzeMinAtras = new Date(agora.getTime() - 1 * 60 * 1000); // Subtrai 15 minutos
            const resultados = await sensor_model.find({ 
                created_at: { $gte: quinzeMinAtras }
            }).exec();
            res.send({obj:resultados, msg:"Sensores nos ultimos 1 minuto", success:true})
            console.log("Sensores criados nos últimos 1 minuto:", resultados);
        }catch(e){
            res.send({msg:'Ocorreu um erro!'+e.message, success:false});
        }
        
    },
    async updateSensor(req,res){
        const {humidity, temperature_ds18b20, id_sensor, sensor_type, level} = req.body;
        var activations = 0;
        if(temperature_ds18b20 > 32 && id_sensor==="RBIncubadora"){ //ATIVOU RELE-01
            activations++;
        }
        if(humidity < 40 && humidity !== null && id_sensor==="RBIncubadora"){ //ATIVOU RELE-02
            activations++;
        }
        let sensor_form = {
            id_sensor: id_sensor,
            temp: temperature_ds18b20,
            activations: activations,
            sensor_type:sensor_type,
            level:level,
            humidity: humidity,
            message: ""

        }
        try{
            const response = await sensor_model.create(sensor_form)
            return res.status(200).json({ msg: "sensor salvo", success: true })
        }catch(e){
            console.log(e)
            return res.send({ obj: null, msg: "Erro ocorrido", error_Msg: e.message, success: false })
        }
    }
}