// ✅ components/Analytics.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Analytics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/snippets/stats/overview", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p className="text-gray-500">Loading analytics...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📊 Snippet Analytics Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <h2 className="text-lg font-semibold">🧾 Total Snippets</h2>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <h2 className="text-lg font-semibold">❤️ Favorites</h2>
          <p className="text-3xl font-bold">{stats.favorites}</p>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-6">
        <h2 className="text-lg font-semibold mb-2">🧠 Snippets by Language</h2>
        <ul className="list-disc pl-5">
          {Object.entries(stats.languages).map(([lang, count]) => (
            <li key={lang}>{lang.toUpperCase()}: {count}</li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">🕘 Most Recent Snippets</h2>
        <ul className="space-y-2">
          {stats.recent.map((s) => (
            <li key={s._id} className="border-b border-gray-300 pb-2">
              <p className="font-bold">{s.title}</p>
              <p className="text-sm text-gray-500">{new Date(s.createdAt).toLocaleString()}</p>
              <p className="text-sm">{s.language}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Analytics;
