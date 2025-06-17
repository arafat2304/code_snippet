import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const SnippetForm = ({ snippets, setSnippets }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');

 // Props: onAdd(snippet)
const handleAdd = () => {
  if (!title || !code) return alert("Title and code required");

  const newSnippet = {
    title,
    description,
    tags: tags.split(",").map(t => t.trim()),
    language,
    code,
  };

  

  // reset
  setTitle('');
  setDescription('');
  setTags('');
  setLanguage('javascript');
  setCode('');
};


  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Add New Snippet</h2>
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
        <option value="javascript">JavaScript</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>

      <Editor
        height="250px"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || '')}
      />

      <button
        onClick={handleAdd}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ➕ Add Snippet
      </button>
    </div>
  );
};

export default SnippetForm;
