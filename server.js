const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const cors = require('cors')

const corsOptions = {
    origin: ['http://192.168.88.22:5173', '*'], // Adicione o domínio do seu frontend
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
    credentials: true,
    enablePreflight: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.post('/login', async (req, res) => {
    try {
      const response = await axios.post('http://192.168.88.1/login', req.body);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao autenticar' });
    }
});


app.post('/hotspot-redirect', (req, res) => {
    const { username, 'link-login-only': linkLoginOnly, 'link-login': linkLogin, 'link-orig': linkOrig, mac, ip, error } = req.body;

    console.log('Dados recebidos:', {
        username,
        linkLoginOnly,
        linkLogin,
        linkOrig
    });

  // Redirecionar para a página hotspot-redirect no frontend
  res.redirect(`http://192.168.88.22:5173/hotspot-redirect?mac=${mac}&ip=${ip}&username=${username}&link-login=${linkLogin}&link-login-only=${linkLoginOnly}&link-orig=${linkOrig}&error=${error}`);
});

app.post('/liberar-acesso', async (req, res) => {
  console.log("TESTANDO")
    console.log(req.body)
    //const { username, redirect } = req.body;

    try {
        // Envia uma requisição POST para o MikroTik
        
        await fetch('http://192.168.88.1/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: {
                username: 'usuario',
                ip:req.body.ip,
                mac:req.body.mac,
                password: '', // Se aplicável
                dst: 'http://www.google.com',
            },
        });
        
        res.status(200).send('Acesso liberado!');
    } catch (error) {
        res.status(500).send('Erro ao liberar acesso.');
    }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});