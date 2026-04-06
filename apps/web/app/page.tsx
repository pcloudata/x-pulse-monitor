'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState("Checking...");

  const checkBackend = async () => {
    try {
      await axios.get('http://127.0.0.1:8001', { timeout: 3000 });
      setBackendStatus("✅ Backend is running");
      return true;
    } catch {
      setBackendStatus("❌ Backend not reachable");
      return false;
    }
  };

  const runMonitor = async () => {
    setLoading(true);
    setError(null);

    const isAlive = await checkBackend();
    if (!isAlive) {
      setError("Backend not reachable. Run ./scripts/dev-start.sh");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://127.0.0.1:8001/ao-to-claude', {
        task: "Monitor AO Arweave ecosystem on X right now",
        voice: false
      }, { timeout: 15000 });

      setInsights(res.data);
      console.log("Success:", res.data);
    } catch (err: any) {
      console.error(err);
      setError(`Request failed: ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-1">X Pulse Monitor</h1>
        <p className="text-gray-400 mb-8">Claude + AO Autonomous Monitoring</p>

        <div className="mb-4 text-sm text-gray-400">Backend: {backendStatus}</div>

        <button
          onClick={runMonitor}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-medium disabled:opacity-50 text-lg"
        >
          {loading ? "Running Analysis..." : "Run New Monitoring Cycle"}
        </button>

        {error && (
          <div className="mt-6 p-6 bg-red-950 border border-red-800 rounded-2xl text-red-300">
            {error}
          </div>
        )}

        {insights && (
          <div className="mt-8 bg-gray-900 rounded-3xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">Latest Insights</h2>
            <div className="prose prose-invert">
              <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed">
                {insights.claude_report || insights.claude_thought}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
