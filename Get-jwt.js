const axios = require('axios');

// ฟังก์ชันขอ JWT
async function getJWT() {
  try {
    const credentials = {
      client_id: 'Kendall01',
      client_secret: 'k2013l'
    };
    const response = await axios.post('http://localhost:3000/auth', credentials);
    return response.data.access_token;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : error.message);
  }
}

// ฟังก์ชันขอข้อมูล
async function getData(token) {
  try {
    const response = await axios.get('http://localhost:4000/data', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('ได้รับข้อมูล:', response.data);
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error.response ? error.response.data : error.message);
  }
}

// รันทั้งสองฟังก์ชันต่อเนื่อง
async function main() {
  try {
    // ขอ JWT
    const token = await getJWT();
    console.log('ได้รับ JWT:', token);

    // ใช้ JWT ขอข้อมูล
    await getData(token);
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error.message);
  }
}

main();