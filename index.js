const express = require("express");
const bodyParser = require("body-parser");
const GoogleGenerativeAI = require("@google/generative-ai").GoogleGenerativeAI;
require("dotenv").config();
const cors = require('cors');

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/generateDetails", async (req, res) => {
  const paragraph = req.body.paragraph;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  let prompt = `Extract the following details from the provided paragraph: name, email, phone number, college name, and skills. The result should be in the following JSON structure: {
    "name": "Full name extracted from the paragraph",
    "email": "Email address extracted from the paragraph",
    "phone": "Phone number extracted from the paragraph",
    "college_name": "College name extracted from the paragraph",
    "skills": ["Skill 1", "Skill 2", "Skill 3", "..."]
  } 
  Paragraph: ${paragraph}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const cleanText = text.replace(/```json\n|\n```|\\/g, "");

  let details;
  try {
    details = JSON.parse(cleanText);
  } catch (error) {
    return res.status(500).json({ error: "Error parsing generated JSON" });
  }

  res.json({ details });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
