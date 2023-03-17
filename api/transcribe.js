const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { audio } = req.files;
  const formData = new FormData();
  formData.append('audio', audio.data, audio.name);

  try {
    // Replace with the actual Whisper API endpoint and your API key
    const response = await fetch('https://api.openai.com/v1/audio/translations', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ${process.env.WHISPER_API_KEY}',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Transcription failed');
    }

    const result = await response.text();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
