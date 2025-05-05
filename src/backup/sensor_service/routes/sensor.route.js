const express = require("express");
const controller = require("../controllers/sensor_controllers");
const validation_middleware = require("../middleware/validation.middleware")
const router = express.Router();
//const middleware = require("../../middleware/auth.admin.middleware")


router.post('/updateSensor',validation_middleware, controller.updateSensor)

router.get('/status', controller.getStatus)


module.exports = router;