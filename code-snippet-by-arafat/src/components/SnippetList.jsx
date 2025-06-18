import { useEffect } from "react";
import React from "react";
import axios from "axios";

const SnippetList = ({ snippets,fetchSnippet }) => {

  fetchSnippet();

  const onDelete = async (id)=>{
    try{
      await axios.delete(`http://localhost:5000/api/snippets/${id}`,{
        headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }
      })
    }catch(err){
      console.log(err)
    }
  }

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert("📋 Code copied to clipboard!");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Your Snippets</h2>

      {snippets.length === 0 ? (
        <p className="text-gray-500">No snippets available.</p>
      ) : (
        snippets.map((snippet) => (
          <div
            key={snippet._id}
            className="mb-4 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded"
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-bold">{snippet.title}</h3>
              <button
                onClick={() => onDelete(snippet._id)}
                className="text-red-500 hover:underline text-sm"
              >
                🗑 Delete
              </button>
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
