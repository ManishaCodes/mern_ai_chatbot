const axios = require('axios');

const HF_API_KEY = process.env.HF_API_KEY; // From backend .env

const getHuggingFaceResponse = async (message) => {
  const response = await axios.post(
    'https://api-inference.huggingface.co/models/gpt2',
    { inputs: message },
    {
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data[0]?.generated_text || 'No response';
};

module.exports = { getHuggingFaceResponse };
