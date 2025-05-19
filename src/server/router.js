const express = require('express');
const renderComponent = require('./renderComponent');

const router = express.Router();

router.get('/hello', async (_req, res) => {
  res.status(200).json({ message: 'Grace is Enough!' });
});

router.get('/dialog', async (req, res) => {
  try {
    const html = renderComponent('DialogBox');
    res.status(200).json({ html });
  } catch (e) {
    res.status(500).json({ error: 'Failed to render component' });
  }
});

module.exports = router;
