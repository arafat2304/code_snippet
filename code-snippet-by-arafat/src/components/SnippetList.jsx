import React, { useEffect } from "react";
import axios from "axios";

const SnippetList = ({
  snippets,
  setSnippets,
  fetchSnippet,
  searchTerm,
  selectedLang,
  selectedTag,
  sortBy,
  setEditingSnippet, // ✅ NEW
}) => {
  useEffect(() => {
    fetchSnippet();
  }, [fetchSnippet]);

  const toggleFavorite = async (id, current) => {
    try {
      await axios.put(
        `http://localhost:5000/api/snippets/favorite/${id}`,
        { favorite: !current },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchSnippet();
    } catch (err) {
      console.log(err);
    }
  };

  const togglePublic = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/snippets/toggle-public/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchSnippet();
    } catch (err) {
      console.log(err);
    }
  };

  const softDelete = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/snippets/trash/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchSnippet();
    } catch (err) {
      console.log(err);
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert("📋 Code copied to clipboard!");
  };

  const copyShareLink = (id) => {
    const link = `${window.location.origin}/view/${id}`;
    navigator.clipboard.writeText(link);
    alert("🔗 Share link copied!");
  };

  // ✅ Apply filtering, hide trashed snippets
  let filtered = snippets
    .filter((s) => !s.trashed)
    .filter(
      (s) =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (selectedLang) {
    filtered = filtered.filter((s) => s.language === selectedLang);
  }

  if (selectedTag) {
    filtered = filtered.filter((s) => s.tags.includes(selectedTag));
  }

  if (sortBy === "language") {
    filtered.sort((a, b) => a.language.localeCompare(b.language));
  } else if (sortBy === "favorite") {
    filtered.sort((a, b) => (b.favorite ? 1 : -1));
  } else {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Your Snippets</h2>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No snippets available.</p>
      ) : (
        filtered.map((snippet) => (
          <div
            key={snippet._id}
            className="mb-4 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded"
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-bold">{snippet.title}</h3>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => toggleFavorite(snippet._id, snippet.favorite)}
                  className={`text-sm ${
                    snippet.favorite
                      ? "text-yellow-500"
                      : "text-gray-500 dark:text-gray-300"
                  }`}
                >
                  {snippet.favorite ? "⭐" : "☆"}
                </button>

                <button
                  onClick={() => togglePublic(snippet._id)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {snippet.public ? "🌐 Public" : "🔒 Private"}
                </button>

                {snippet.public && (
                  <button
                    onClick={() => copyShareLink(snippet._id)}
                    className="text-green-600 underline text-sm"
                  >
                    📋 Copy Link
                  </button>
                )}

                <button
                  onClick={() => setEditingSnippet(snippet)} // ✅ EDIT BUTTON
                  className="text-indigo-600 hover:underline text-sm"
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => softDelete(snippet._id)}
                  className="text-orange-600 hover:underline text-sm"
                >
                  🗑 Trash
                </button>
              </div>
            </div>

            {snippet.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                {snippet.description}
              </p>
            )}

            <pre className="bg-gray-100 dark:bg-gray-900 text-sm p-3 rounded overflow-x-auto whitespace-pre-wrap">
              {snippet.code}
            </pre>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                {snippet.language}
              </span>
              {snippet.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
              <button
                onClick={() => copyToClipboard(snippet.code)}
                className="ml-auto bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs hover:opacity-80"
              >
                📋 Copy
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SnippetList;
