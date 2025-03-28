const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// credentials 
const validClients = {
  client_id: 'Kendall01',
  client_secret: 'k2013l'
};

app.post('/auth', (req, res) => {
  const { client_id, client_secret } = req.body;
  // เปลี่ยนการตรวจสอบให้ใช้ validClients.client_id และ validClients.client_secret
  if (client_id === validClients.client_id && client_secret === validClients.client_secret) {
    const token = jwt.sign({ client_id }, process.env.JWT_SECRET || 'my-secure-key', { expiresIn: '1h' });
    res.json({ access_token: token });
  } else {
    res.status(401).json({ error: 'Invalid client credentials' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth Server running on port ${PORT}`);
});