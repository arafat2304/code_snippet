import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import boilerPlate from './boilerPlate';

const SnippetForm = ({ onSnippetAdded, editingSnippet, setEditingSnippet,  darkMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');

  // this useEffect is used for Edit Snippet
  useEffect(() => {
    if (editingSnippet) {
      setTitle(editingSnippet.title || '');
      setDescription(editingSnippet.description || '');
      setTags((editingSnippet.tags || []).join(', '));
      setLanguage(editingSnippet.language || 'javascript');
      setCode(editingSnippet.code || '');
    }
  }, [editingSnippet]);

  // this is handlesubmit which will trigger when user add new snippet
  const handleSubmit = async () => {

    //this is ensure that title and code is must be other wise give alert message
    if (!title || !code) {
      alert("Title and code required");
      return;
    }

    const snippetData = {
      title,
      description,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      language,
      code,
    };

    try {
      //here is editing snippet is exist so axios called put method for edit
      if (editingSnippet) {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/snippets/${editingSnippet._id}`,
          snippetData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Snippet updated ✅");
        setEditingSnippet(null);
      } else {
        // if editing snippet is not exist so axios called post method for new snippet
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/snippets/add`,
          snippetData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 201) {
          alert("New snippet added ✅");
        }
      }

      // Reset the form
      setTitle('');
      setDescription('');
      setTags('');
      setLanguage('javascript');
      setCode('');

      // Refresh the list
      if (onSnippetAdded) onSnippetAdded();
    } catch (err) {
      console.error("Failed to submit snippet:", err);
      alert("Something went wrong.");
    }
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setTags('');
    setLanguage('javascript');
    setCode('');
    setEditingSnippet(null); // also clear edit mode
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">
        {editingSnippet ? '✏️ Edit Snippet' : '➕ Add New Snippet'}
      </h2>

      <input
        type="text"
        placeholder="Title"
        className="p-2 w-full mb-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="p-2 w-full mb-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="p-2 w-full mb-2 border rounded"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <select
       className="p-2 w-full mb-2 border rounded"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {Object.keys(boilerPlate).map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>

      
      {!code.trim() && boilerPlate[language] && (
        <div className="mb-2 text-sm text-blue-700 bg-blue-100 p-2 rounded">
          💡 Need help?{" "}
          <button
            onClick={() => setCode(boilerPlate[language])}
            className="underline font-medium"
          >
            Insert {language.toUpperCase()} boilerplate
          </button>
        </div>
      )}

      <Editor
        height="250px"
        language={language}
        theme={darkMode ?  "light" : "hc-black"}
        value={code}
        onChange={(value) => setCode(value || '')}
      />

      <div className="flex justify-between mt-3 gap-2">
        <button
          onClick={handleSubmit}
          id="save-snippet-btn"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingSnippet ? '💾 Update Snippet' : '➕ Add Snippet'}
        </button>
        <button
          onClick={handleReset}
          id="reset-form-btn"
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          ♻️ Reset
        </button>
      </div>
    </div>
  );
};

export default SnippetForm;
