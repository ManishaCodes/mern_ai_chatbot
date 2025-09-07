const express = require('express');
const router = express.Router();
const { getHuggingFaceResponse } = require('../services/huggingface');
const Message = require('../models/Message');

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    // Save user message
    await Message.create({ sender: 'user', text: message });

    const reply = await getHuggingFaceResponse(message);

    // Save bot reply
    await Message.create({ sender: 'bot', text: reply });

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get response from Hugging Face' });
  }
});

module.exports = router;
