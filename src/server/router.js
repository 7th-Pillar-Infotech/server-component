require('@babel/register')({
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic', importSource: 'React' }],
  ],
  extensions: ['.js', '.jsx'],
});

const express = require('express');
const renderComponent = require('./renderComponent');

const router = express.Router();

router.get('/hello', async (_req, res) => {
  res.status(200).json({ message: 'Grace is Enough!' });
});

router.get('/dialog', async (req, res) => {
  try {
    const html = await renderComponent('DialogBox');
    console.log({ html });
    res.json({
      html,
      componentName: 'DialogBox',
    });
  } catch (e) {
    console.error('Render failed:', e.message);
    res.status(500).json({ error: 'Failed to render component' });
  }
});

module.exports = router;
