//REQUIRES
const user_model = require('../../models/users.model')
const sensor_model = require('../../models/sensor.model')
const bcrypt = require("bcrypt");
const authConfig = require("../../config/auth");
const jwt = require("jsonwebtoken");


//const mongoose = require('mongoose');
const permissionsModel = require('../../models/permissions.model');
function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
module.exports = {
  async Hello(req, res) {
    res.send('Hello World!');

  },
  async createUser(req, res) {
    console.log(req.body)
    //CRIANDO JSON USER
    let user_form = {
      password: req.body.password,
      email: req.body.email,
      name: req.body.name,
      cnpj: req.body.cnpj,
    }
    try {
      const response = await user_model.create(user_form)
      console.log(response)
      return res.status(200).json({ obj: response, msg: "Usuário criado com sucesso", ok: true })

    } catch (e) {
      console.log(e)
      return res.send({ obj: null, msg: "Erro ocorrido", error_Msg: e.message, ok: false })
    }

  },
  async login(req, res) {
    const { email, password } = req.body;
    try {
      if (!validateEmail(email)) {
        return res.send({ ok: false, msg: "Email inválido" });
      }

      const response = await user_model.findOne({ email: email }).select("+password");

      if (!response) {
        return res.send({ error: "Usuário não encontrado", ok: false });
      }

      if (!response.isActive) {
        return res.send({ error: "Usuário está desativado", ok: false });
      }

      if (!(await bcrypt.compare(password, response.password))) {
        return res.send({ msg: "Email ou Senha inválida", ok: false });
      }

      const permissions = await permissionsModel.findById({_id:response.permission});

      if(!permissions){
        return res.send({error:"Usuário sem Permissão", ok:false})
      }

      const sensors = await sensor_model.find();

      const datatoken = jwt.sign(
        {
          id: response._id,
          
          user_name: response.name,
          time: Date.now(),
        },
        authConfig.secret,
        {
          expiresIn: "12 hour",
        }
      );

      return res.send({
        ok: true,
        token: datatoken,
        sensors: sensors,
        user: {
          name: response.name,
          user: response.email,
          cpf: response.cpf,
          createdAt: response.createdAt,
        },
        userRoutes:permissions.routes,
        msg: "Sucesso! Estamos redirecionando",
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        error: "Não foi possível realizar o login",
        msg: error,
        ok: false,
      });
    }
  },
}
