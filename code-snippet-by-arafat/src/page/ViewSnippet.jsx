import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

const ViewSnippet = () => {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/snippets/public/${id}`)
      .then(res => setSnippet(res.data))
      .catch(() => setSnippet(null));
  }, [id]);

  if (!snippet) return <p className="text-center mt-10 text-gray-500">Snippet not found or private.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{snippet.title}</h1>
      <p className="mb-2 text-gray-600">{snippet.description}</p>
      <Editor
        height="300px"
        language={snippet.language}
        value={snippet.code}
        theme="vs-dark"
        options={{ readOnly: true }}
      />
    </div>
  );
};

export default ViewSnippet;
