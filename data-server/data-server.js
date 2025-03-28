const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

// Middleware เพื่ออ่าน JSON
app.use(express.json());

// เพิ่ม CORS
app.use(cors());

// Secret key จาก Environment Variable
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
    res.status(401).json({ error: `Invalid or expired token: ${error.message}` });
  }
});

// เริ่มเซิร์ฟเวอร์เลย 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Data Server running on port ${PORT}`);
});