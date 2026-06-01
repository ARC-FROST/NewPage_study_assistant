const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function generateText(prompt) {
  const completion = await client.chat.completions.create({
    model: process.env.OPENROUTER_MODEL,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content;
}

module.exports = {
  generateText,
};