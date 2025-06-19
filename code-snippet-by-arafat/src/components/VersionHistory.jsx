// ✅ components/VersionHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const VersionHistory = ({ snippetId, onClose, onRevert }) => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/snippets/${snippetId}/versions`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setVersions(res.data);
      } catch (err) {
        console.error("Error fetching versions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVersions();
  }, [snippetId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">🕘 Version History</h2>
        <button onClick={onClose} className="absolute top-4 right-6 text-gray-600 dark:text-white text-xl">✖️</button>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : versions.length === 0 ? (
          <p className="text-gray-500">No version history available.</p>
        ) : (
          versions
            .slice() // clone array to reverse safely
            .reverse()
            .map((v, index) => (
              <div
                key={v._id || index}
                className="mb-4 p-4 border border-gray-300 dark:border-gray-600 rounded"
              >
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <strong>Title:</strong> {v.title} | <strong>Language:</strong> {v.language} <br />
                  <strong>Updated:</strong> {new Date(v.updatedAt).toLocaleString()}
                </p>
                <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded text-sm whitespace-pre-wrap overflow-auto">
                  {v.code}
                </pre>
                <button
                  onClick={() => onRevert(v._id)}
                  className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  🔁 Revert to this version
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default VersionHistory;
