import React from "react";
import axios from "axios";

const TrashList = ({ snippets, setSnippets, fetchSnippet }) => {
  const trashed = snippets.filter((s) => s.trashed);

  //this function is used to restore trash snippet
  const restoreSnippet = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/snippets/restore/${id}`,
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

  // this function is used to delete permanent trash snippet
  const deleteForever = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/snippets/permanent/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchSnippet();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">🗑 Trash</h2>

      {trashed.length === 0 ? (
        <p className="text-gray-500">Trash is empty.</p>
      ) : (
        trashed.map((s) => (
          <div
            key={s._id}
            className="mb-4 p-4 bg-red-50 dark:bg-gray-800 border border-red-300 dark:border-red-600 rounded"
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-bold line-through">{s.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => restoreSnippet(s._id)}
                  className="text-green-600 hover:underline text-sm"
                >
                  ♻️ Restore
                </button>
                <button
                  onClick={() => deleteForever(s._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  ❌ Delete Forever
                </button>
              </div>
            </div>
            <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded">
              {s.code}
            </pre>
          </div>
        ))
      )}
    </div>
  );
};

export default TrashList;
