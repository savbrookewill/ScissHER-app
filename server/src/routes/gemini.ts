import { Router } from 'express';
import { GoogleGenAI } from '@google/genai';

const router = Router();

// Initialize Gemini AI
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

router.post('/generate', async (req, res, next) => {
  try {
    const { prompt, model = 'gemini-2.0-flash-exp' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const result = await genAI.models.generateContent({
      model,
      contents: prompt
    });
    
    const text = result.text || '';

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

    // Format messages for the API
    const lastMessage = messages[messages.length - 1];
    const prompt = `${messages.map(m => `${m.role}: ${m.parts}`).join('\n')}\n`;

    const result = await genAI.models.generateContent({
      model,
      contents: prompt
    });

    const text = result.text || '';

    res.json({ text });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    next(error);
  }
});

export { router as geminiRouter };
