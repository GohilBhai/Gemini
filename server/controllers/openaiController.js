const dotenv = require("dotenv");
dotenv.config();

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.summerizeController = async (req, res) => {
  try {
    const { text } = req.body;
    const { response } = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `Summerize This \n ${text}`,
      temperature: 1,
      max_tokens: 256, // 512
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    if (response) {
      if (response.choices[0].text) {
        return res.status(200).json(response.choices[0].text);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
