const express = require("express");
const bodyParser = require("body-parser");
const GoogleGenerativeAI = require("@google/generative-ai").GoogleGenerativeAI;
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

const detailSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  college_name: String,
  skills: [String],
});

const Detail = mongoose.model("Detail", detailSchema);

app.post("/postdetails", async (req, res) => {
  const details = req.body.details;

  try {
    const newDetail = new Detail(details);
    await newDetail.save();

    res.status(201).json({ message: "Details saved successfully" });
  } catch (error) {
    console.error("Error saving details:", error);
    res.status(500).json({ error: "Error saving details" });
  }
});

app.get("/getdetails", async (req, res) => {
  try {
    const details = await Detail.find();
    res.json({ details });
  } catch (error) {
    console.error("Error retrieving details:", error);
    res.status(500).json({ error: "Error retrieving details" });
  }
});

app.post("/generateDetails", async (req, res) => {
  const paragraph = req.body.paragraph;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  let prompt = `Extract the following details from the provided paragraph: name, email, phone number, college name, and skills. 
  Please return **only** a valid JSON object without any extra text, comments, or formatting like code blocks. The result should be in the following JSON structure:
  {
    "name": "Full name extracted from the paragraph",
    "email": "Email address extracted from the paragraph",
    "phone": "Phone number extracted from the paragraph",
    "college_name": "College name extracted from the paragraph",
    "skills": ["Skill 1", "Skill 2", "Skill 3", "..."]
  } 
  Paragraph: ${paragraph}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    console.log("Generated text:", text);

    const cleanText = text.replace(/```json\n|\n```|\\/g, "").trim();

    let details;
    try {
      details = JSON.parse(cleanText);
    } catch (error) {
      console.error("Error parsing JSON:", error, "Generated text:", cleanText);
      return res.status(500).json({ error: "Error parsing generated JSON" });
    }

    res.json({ details });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Error generating content" });
  }
});

app.post("/postdetails", async (req, res) => {});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
