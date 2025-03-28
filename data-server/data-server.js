/// express → ใช้สร้าง API, jsonwebtoken → ใช้สร้างและตรวจสอบ JWT
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware เพื่ออ่าน JSON (ถ้ามี body)
app.use(express.json());

// เพิ่ม CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    return res.status(200).json({});
  }
  next();
});

// Secret key เดียวกับ Auth Server (ต้องตรงกัน) ใช้ Symmetric Key
const JWT_SECRET = 'my-secure-key';

// Endpoint รับ JWT และส่งข้อมูลกลับ
app.get('/data', (req, res) => {
  // ดึง JWT จาก header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // ดึง token จาก "Bearer <token>"

  try {
    // ตรวจสอบ JWT
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // ถ้า JWT ถูกต้อง ส่งข้อมูลกลับ
    res.json({
      success: true,
      data: 'Done!!'
    });
  } catch (error) {
    // ถ้า JWT ผิดหรือหมดอายุ
    res.status(401).json({ error: 'Invalid or expired token' });
  }

});

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 4000; // ใช้ port ต่างจาก Auth Server
app.listen(PORT, () => {
  console.log(`Data Server running on port ${PORT}`);
});