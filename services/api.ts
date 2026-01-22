// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface GeminiResponse {
  text: string;
}

export interface ChatMessage {
  role: string;
  parts: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Gemini API methods
  async generateContent(prompt: string, model?: string): Promise<GeminiResponse> {
    return this.request<GeminiResponse>('/api/gemini/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt, model }),
    });
  }

  async chat(messages: ChatMessage[], model?: string): Promise<GeminiResponse> {
    return this.request<GeminiResponse>('/api/gemini/chat', {
      method: 'POST',
      body: JSON.stringify({ messages, model }),
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
