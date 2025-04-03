const express = require("express");
const controller = require("../controllers/sensor_controllers");
const router = express.Router();
//const middleware = require("../../middleware/auth.admin.middleware")


router.post('/updateSensor', controller.updateSensor)

router.get('/status', controller.getStatus)


module.exports = router;