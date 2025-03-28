// Authen
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// เพิ่ม CORS Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    return res.status(200).json({});
  }
  next();
});

// credentials 
const validClients = {
  'Kendall01': 'k2013l'
};

const JWT_SECRET = 'my-secure-key';

app.post('/auth', (req, res) => {
  const { client_id, client_secret } = req.body;

  if (!client_id || !client_secret) {
    return res.status(400).json({ error: 'Missing client_id or client_secret' });
  }

  if (validClients[client_id] !== client_secret) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const payload = {
    client_id: client_id,
    message: 'this is my credential'
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1m' });

  res.json({ access_token: token });
});

// process.env.PORT : Port: Render แทนที่ hardcode port
const PORT =  process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth Server running on port ${PORT}`);
});