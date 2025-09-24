// services/ai.service.js
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateText(content) {
  if (!content || typeof content !== "string") {
    throw new Error("Prompt must be a non-empty string");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: content }],
        },
      ],
      temperature: 0.7,
      maxOutputTokens: 512,
    });

    // DEBUG: uncomment during development to see exact response
    // console.log("AI raw response:", JSON.stringify(response, null, 2));

    // Try multiple possible response shapes (robust extraction)
    const maybeText =
      response?.output_text ||
      response?.output?.[0]?.content?.[0]?.text ||
      response?.output?.[0]?.content?.parts?.[0]?.text ||
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      response?.candidates?.[0]?.content?.[0]?.text;

    if (!maybeText || typeof maybeText !== "string") {
      console.error("Unable to extract text from AI response:", JSON.stringify(response, null, 2));
      throw new Error("AI returned no usable text");
    }

    return maybeText;
  } catch (err) {
    console.error("Error generating text:", err);
    throw err; // re-throw so caller handles it (don't return undefined)
  }
}

module.exports = { generateText };
