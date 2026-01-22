import { Router } from 'express';
import { GoogleGenerativeAI } from '@google/genai';

const router = Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

router.post('/generate', async (req, res, next) => {
  try {
    const { prompt, model = 'gemini-2.0-flash-exp' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const geminiModel = genAI.getGenerativeModel({ model });
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    res.json({ text });
  } catch (error: any) {
    console.error('Gemini API error:', error);
    next(error);
  }
});

router.post('/chat', async (req, res, next) => {
  try {
    const { messages, model = 'gemini-2.0-flash-exp' } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const geminiModel = genAI.getGenerativeModel({ model });
    const chat = geminiModel.startChat({
      history: messages.slice(0, -1),
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.parts);
    const response = result.response;
    const text = response.text();

    res.json({ text });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    next(error);
  }
});

export { router as geminiRouter };
