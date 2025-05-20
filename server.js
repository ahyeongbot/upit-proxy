const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/upbit/ticker', async (req, res) => {
  const { markets } = req.query;
  if (!markets) {
    return res.status(400).json({ error: 'markets 파라미터가 필요합니다' });
  }

  try {
    const response = await axios.get('https://api.upbit.com/v1/ticker', {
      params: { markets },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: '업비트 API 호출 실패', detail: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ 업비트 프록시 서버 실행 중: http://localhost:${PORT}`);
});
