const openAI = require("openai");

require("dotenv").config();

exports.postChat = async (req, res) => {
  try {
    const newInput = req.body.chat;
    
    const openai = new openAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: newInput }],
      max_tokens: 200,
    });
    res.status(200).json({ message: chatCompletion.choices[0].message});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};
