import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSummarize = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setSummary("");
    setError("");

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      if (res.ok) {
        setSummary(data.summary);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to connect to server");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-2xl">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6">
          Text Summarizer
        </h1>

        {/* Input */}
        <textarea
          className="w-full border border-gray-300 rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="6"
          placeholder="Paste your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleSummarize}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {/* Output */}
        {summary && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
            <h2 className="font-semibold mb-2 text-lg">Summary:</h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;