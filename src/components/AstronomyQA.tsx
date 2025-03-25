import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { getAstronomyAnswer } from '../services/ai';

export const AstronomyQA: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAnswer('');

    try {
      const response = await getAstronomyAnswer(question);
      setAnswer(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="text-blue-500" />
        <h2 className="text-xl font-semibold">Ask About Astronomy</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything about astronomy..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
        />
        
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} />
          {loading ? 'Thinking...' : 'Ask Question'}
        </button>

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {answer && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">Answer:</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </form>
    </div>
  );
};
