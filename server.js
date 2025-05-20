// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS 허용
app.use(cors());

// 업비트 API 프록시 엔드포인트
app.get('/upbit/ticker', async (req, res) => {
  const { markets } = req.query;

  if (!markets) {
    return res.status(400).json({ error: 'markets 쿼리 파라미터가 필요합니다' });
  }

  try {
    const response = await axios.get('https://api.upbit.com/v1/ticker', {
      params: { markets },
      headers: { Accept: 'application/json' }
    });
    res.json(response.data);
  } catch (error) {
    console.error('업비트 API 호출 실패:', error.message);
    res.status(500).json({ error: '업비트 API 호출 실패', detail: error.message });
  }
});

// 서버 실행
app.get('/', (req, res) => {
  res.send('🟢 Upbit Proxy 서버가 작동 중입니다.');
});

app.listen(PORT, () => {
  console.log(`✅ 프록시 서버가 실행 중입니다: http://localhost:${PORT}`);
});
