const express = require("express");
const controller = require("../controllers/user_controllers");
const router = express.Router();
const middleware = require("../../middleware/auth.middleware")


router.post('/createUser', controller.createUser)
router.post('/login', controller.login)
router.get('/', controller.Hello)
// Exemplo de middleware router.post('/fetchStoreFromEmpresa',middleware, controller.fetchStoreFromEmpresa)



module.exports = router;