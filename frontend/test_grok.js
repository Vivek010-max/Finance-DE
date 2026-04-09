import fs from 'fs';
const envFile = fs.readFileSync('.env', 'utf8');
const apiKey = envFile.split('\n').find(line => line.startsWith('VITE_GROK_API_KEY=')).split('=')[1].trim();

async function testGroq() {
  const payload = {
    messages: [
      { role: 'system', content: 'You are OnlyFinance IQ, a highly intelligent financial assistant.' },
      { role: 'user', content: 'hello' }
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    stream: false
  };

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload)
  });

  const text = await response.text();
  console.log('Status:', response.status);
  console.log('Body:', text);
}
testGroq();
