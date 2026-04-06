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
      setHistory(prev => [newInsight, ...prev].slice(0, 6));
    } catch (err: any) {
      setError("Failed to connect to bridge. Is dev-start.sh running?");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-2">X Pulse Monitor</h1>
        <p className="text-gray-400 mb-8">Claude + AO Autonomous Monitoring</p>

        <button
          onClick={runMonitor}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-semibold disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "🔄 Run New Pulse"}
        </button>

        {error && <div className="mt-6 p-6 bg-red-950 rounded-2xl">{error}</div>}

        {insights && (
          <div className="mt-8 bg-gray-900 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Latest Pulse</h2>
            <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed">
              {insights.claude_report}
            </pre>
          </div>
        )}

        {history.length > 1 && (
          <div className="mt-12">
            <h3 className="text-lg font-medium mb-4">Recent Pulses</h3>
            <div className="grid gap-4">
              {history.slice(1).map((item, i) => (
                <div key={i} className="bg-gray-900/70 p-5 rounded-2xl text-sm border border-gray-800">
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
