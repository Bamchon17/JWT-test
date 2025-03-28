
JSON Web Token
 ใช้ Authorization Server และ Resource Server เพื่อให้ Client เข้าถึงทรัพยากร (เช่น API)

Authorization Server:
เซิร์ฟเวอร์ที่ออก Access Token (JWT) ให้กับ Client
ในโจทย์ของเรา: คือ auth-server.js (port 3000)

Resource Server:
เซิร์ฟเวอร์ที่เก็บทรัพยากร (เช่น API หรือข้อมูล) และต้องการ token เพื่อให้ Client เข้าถึง
ในโจทย์ของเรา: คือ data-server.js (port 4000)
------------------------------------------------

JWK (JSON Web Key):
ชุดกุญแจ (key) ที่ใช้ในการเข้ารหัสและถอดรหัส JWT
มี kid (Key ID) เพื่อระบุว่ากุญแจตัวไหนถูกใช้

1. Authen Server: หน้าที่: รับ client_id และ client_secret → ตรวจสอบ → ออก JWT (token) ถ้าถูกต้อง

2. ถ้า client_id และ client_secret ถูกต้อง Authen Server จะส่ง JWT กลับมาให้ get-jwt.js

Workflow จริง ๆ
1.เริ่มที่ get-jwt.js:
    ส่ง client_id และ client_secret ไป http://localhost:3000/auth
    ได้ JWT กลับมา (คุณบอกว่าได้แล้ว)

2.Authen Server:
    รับคำขอ → ตรวจสอบ → ส่ง JWT ให้ get-jwt.js

3.Data Service (ยังไม่ถึงขั้นนี้):
    รอ client (เช่น สคริปต์ข้อ 4 หรือ Postman) ส่ง JWT มา
    ตรวจ JWT → ส่งข้อมูลกลับ

express → ใช้สร้าง API
jsonwebtoken → ใช้สร้างและตรวจสอบ JWT
dotenv → ใช้จัดการตัวแปรลับ (Secret Key)
cors → รองรับการเรียก API ข้ามโดเมน

----------------------------------------
เปรียบเทียบกับโรงหนัง (เหมือนตัวอย่างก่อนหน้า)
Client: คุณที่อยากดูหนัง
Authorization Server: ตู้ขายตั๋ว (ให้ตั๋ว = JWT)
Resource Server: พนักงานหน้าโรง (เช็คตั๋วแล้วให้เข้า)
JWK: รหัสลับที่ตู้และพนักงานใช้ตรวจตั๋ว (ในรูป พนักงานต้องไปขอรหัสจากตู้)
ขั้นตอน:
คุณไปขอตั๋วจากตู้
เอาตั๋วไปให้พนักงาน
พนักงานไปขอรหัสจากตู้ (เพื่อเช็คว่าตั๋วจริง)
พนักงานเช็คว่าตั๋วถูกต้อง
ตรวจว่าตั๋วนี้ดูโรงนี้ได้ไหม (permissions)