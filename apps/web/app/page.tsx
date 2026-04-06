'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [insights, setInsights] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runMonitor = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('http://127.0.0.1:8001/ao-to-claude', {
        task: "Monitor AO Arweave ecosystem on X right now",
        voice: false
      }, { timeout: 15000 });

      const newInsight = res.data;
      setInsights(newInsight);
      setHistory(prev => [newInsight, ...prev].slice(0, 5)); // Keep last 5
    } catch (err: any) {
      setError(err.message || "Failed to connect to bridge");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold">X Pulse Monitor</h1>
            <p className="text-gray-400 mt-1">Claude + AO Autonomous Social Intelligence</p>
          </div>
          <button
            onClick={runMonitor}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-semibold disabled:opacity-50 transition"
          >
            {loading ? "Analyzing X..." : "🔄 Run New Pulse"}
          </button>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 p-6 rounded-2xl mb-8">
            {error}
          </div>
        )}

        {insights && (
          <div className="bg-gray-900 rounded-3xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">Latest Pulse</h2>
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-200">
                {insights.claude_report || insights.claude_thought}
              </pre>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-4">Recent Pulses</h3>
            <div className="grid gap-4">
              {history.slice(1).map((item, i) => (
                <div key={i} className="bg-gray-900/50 p-5 rounded-2xl border border-gray-800 text-sm">
                  {item.claude_report?.substring(0, 180)}...
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
