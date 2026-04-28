const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const AMFI_URL = 'https://portal.amfiindia.com/spages/NAVAll.txt';

app.use(express.static('.'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/nav', async (_req, res) => {
  try {
    const response = await fetch(AMFI_URL);

    if (!response.ok) {
      return res.status(502).json({
        error: `Failed to fetch AMFI NAV data (HTTP ${response.status})`
      });
    }

    const text = await response.text();

    res.setHeader('Cache-Control', 'public, max-age=300');
    res.type('text/plain').send(text);
  } catch (error) {
    res.status(500).json({
      error: 'Unable to fetch AMFI NAV data at the moment.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
