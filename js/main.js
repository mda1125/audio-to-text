const audioFile = document.getElementById('audioFile');
const errorMsg = document.getElementById('errorMsg');
const transcribeBtn = document.getElementById('transcribeBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const transcriptionResult = document.getElementById('transcriptionResult');
const transcriptionText = document.getElementById('transcriptionText');
const downloadBtn = document.getElementById('downloadBtn');

audioFile.addEventListener('change', handleFile);
transcribeBtn.addEventListener('click', transcribeAudio);
downloadBtn.addEventListener('click', downloadTranscription);

function handleFile() {
  const file = this.files[0];
  if (file.size > 25 * 1024 * 1024) {
    showError("File size exceeds 25 MB");
    return;
  }
  if (!['audio/mp3', 'audio/mp4', 'audio/mpeg', 'audio/mpga', 'audio/m4a', 'audio/wav', 'audio/x-m4a'].includes(file.type)) {
  showError("Unsupported file format");
  return;
}

  errorMsg.textContent = "";
  transcribeBtn.disabled = false;
}

function showError(message) {
  errorMsg.textContent = message;
  transcribeBtn.disabled = true;
}

async function transcribeAudio() {
  const file = audioFile.files[0];
  if (!file) return;

  transcribeBtn.disabled = true;
  loadingIndicator.classList.remove('hidden');

  try {
    const formData = new FormData();
    formData.append('audio', file);
    formData.append('model', 'whisper-1');


    // Fetch the API key from the serverless function
    const apiKeyResponse = await fetch('/api/getApiKey');
    const apiKeyData = await apiKeyResponse.json();
    const apiKey = apiKeyData.apiKey;

    // Replace with the actual Whisper API endpoint
    const response = await fetch("https://api.openai.com/v1/audio/translations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`
      },
      body: formData
    });

    if (!response.ok) {
  console.error("Transcription failed:", response.status, response.statusText, await response.text());
  throw new Error("Transcription failed");
}

    const result = await response.text();
    transcriptionText.textContent = result;
    transcriptionResult.classList.remove('hidden');
    downloadBtn.classList.remove('hidden');
  } catch (error) {
    showError(error.message);
  } finally {
    loadingIndicator.classList.add('hidden');
  }
}

function downloadTranscription() {
  const text = transcriptionText.textContent;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transcription.txt';
  a.click();
  URL.revokeObjectURL(url);
}
