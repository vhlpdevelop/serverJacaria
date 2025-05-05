const sensor_model = require('../../models/sensor.model')
//const mongoose = require('mongoose');
function checkThresholds(sensorData) {
    const alerts = [];

    const temp = parseFloat(sensorData.temp);
    const humidity = parseFloat(sensorData.humidity);
    const amony = parseFloat(sensorData.amony);
    const pressure = parseFloat(sensorData.pressure);
    const level = sensorData.level?.toLowerCase();

    if (!isNaN(temp) && (temp < 25 || temp > 32)) {
        alerts.push(`Temperatura fora do ideal: ${temp}°C`);
    }

    if (!isNaN(humidity) && (humidity < 90)) {
        alerts.push(`Umidade fora do ideal: ${humidity}%`);
    }

    if (!isNaN(amony) && amony > 5) {
        alerts.push(`Alerta de amônia: ${amony} ppm`);
    }

    if (level && level !== 'normal') {
        alerts.push(`Nível de água crítico: ${level}`);
    }

    return alerts;
}


module.exports = {
    async Hello(req, res) {
        res.send('Hello World!');
    },
    async getStatus(req, res) {
        try {
            const quinzeMinAtras = new Date(agora.getTime() - 1 * 60 * 1000); // Subtrai 15 minutos
            const resultados = await sensor_model.find({
                created_at: { $gte: quinzeMinAtras }
            }).exec();
            res.send({ obj: resultados, msg: "Sensores nos ultimos 1 minuto", success: true })
            console.log("Sensores criados nos últimos 1 minuto:", resultados);
        } catch (e) {
            res.send({ msg: 'Ocorreu um erro!' + e.message, success: false });
        }

    },
    async updateSensor(req, res) {
        const data = req.body;

        if (!data.id_sensor) {
            throw new Error('ID do sensor é obrigatório.');
        }

        const alerts = checkThresholds(data);
        if (alerts.length > 0) {
            /*
            await sendAlert({
                id_sensor,
                alerts,
                timestamp: new Date(),
            });   
            */
        }
        try {
            const createdSensor = await sensor_model.create({
                ...data,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return res.status(200).json({ msg: "sensor salvo", success: true })
        } catch (e) {
            console.log(e)
            return res.send({ obj: null, msg: "Erro ocorrido", error_Msg: e.message, success: false })
        }
    }
}