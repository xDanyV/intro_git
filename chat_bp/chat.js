const OpenAI = require("openai");
require('dotenv').config();


const openai = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY
});

/*
const openai = new OpenAI({
  apiKey: "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"
});*/


async function consultar(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [{
      role: "system",
      content: "You are a helpful assistant."
    }, {
      role: "user",
      content: prompt
    }
    ],
    model: "gpt-3.5-turbo",
  });


  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}

module.exports = { consultar };
