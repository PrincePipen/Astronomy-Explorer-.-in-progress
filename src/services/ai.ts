import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyC8d3slcL0wdnXi3yJ7RR8YbcausVQ5NbQ";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Updated model name

export async function getAstronomyAnswer(question: string): Promise<string> {
  try {
    const prompt = `As an astronomy expert, please answer this question: ${question}
    Please provide a clear, concise, and accurate answer based on current scientific understanding.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting AI response:', error);
    throw new Error('Failed to get an answer. Please try again.');
  }
}
