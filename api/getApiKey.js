module.exports = async (req, res) => {
  res.status(200).json({ apiKey: process.env.WHISPER_API_KEY });
};
