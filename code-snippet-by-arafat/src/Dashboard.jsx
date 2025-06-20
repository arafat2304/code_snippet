import React, { useState, useEffect, useCallback } from "react";
import SnippetForm from "./components/SnippetForm";
import SnippetList from "./components/SnippetList";
import SearchBar from "./components/SearchBar";
import TrashList from "./components/TrashList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [snippets, setSnippets] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [viewTrash, setViewTrash] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        document.getElementById("save-snippet-btn")?.click();
      }
      if (e.key === "Escape") {
        document.getElementById("reset-form-btn")?.click();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedLang: "",
    selectedTag: "",
    sortBy: "",
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  const logout = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.status === 200) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const fetchSnippet = useCallback(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/snippets/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSnippets(response.data);
    } catch (err) {
      console.error("Error fetching snippets:", err);
    }
  }, []);

  useEffect(() => {
    fetchSnippet();
  }, [fetchSnippet]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const availableTags = Array.from(new Set(snippets.flatMap((s) => s.tags || [])));

  const hasSearch =
    appliedFilters.searchTerm || appliedFilters.selectedLang || appliedFilters.selectedTag || appliedFilters.sortBy;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🧠 Code Snippet by Arafat</h1>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setViewTrash(!viewTrash)}
              className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
            >
              {viewTrash ? "Back to Snippets" : "🗑 Trash"}
            </button>
            <button
              onClick={() => navigate("/analytics")}
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm text-white"
            >
              📊 Analytics
            </button>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 text-white rounded text-sm"
            >
              🚪 Logout
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded text-sm"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>

        {!viewTrash && (
          <>
            <SearchBar
              searchTerm={filters.searchTerm}
              setSearchTerm={(val) => setFilters({ ...filters, searchTerm: val })}
              selectedTag={filters.selectedTag}
              setSelectedTag={(val) => setFilters({ ...filters, selectedTag: val })}
              selectedLang={filters.selectedLang}
              setSelectedLang={(val) => setFilters({ ...filters, selectedLang: val })}
              sortBy={filters.sortBy}
              setSortBy={(val) => setFilters({ ...filters, sortBy: val })}
              availableTags={availableTags}
              onApply={() => setAppliedFilters(filters)}
            />

            {hasSearch && (
              <SnippetList
                snippets={snippets}
                setSnippets={setSnippets}
                searchTerm={appliedFilters.searchTerm}
                selectedTag={appliedFilters.selectedTag}
                selectedLang={appliedFilters.selectedLang}
                sortBy={appliedFilters.sortBy}
                fetchSnippet={fetchSnippet}
                setEditingSnippet={setEditingSnippet}
              />
            )}

            <SnippetForm
              onSnippetAdded={fetchSnippet}
              editingSnippet={editingSnippet}
              setEditingSnippet={setEditingSnippet}
              darkMode={darkMode}
            />

            {!hasSearch && (
              <SnippetList
                snippets={snippets}
                setSnippets={setSnippets}
                searchTerm={appliedFilters.searchTerm}
                selectedTag={appliedFilters.selectedTag}
                selectedLang={appliedFilters.selectedLang}
                sortBy={appliedFilters.sortBy}
                fetchSnippet={fetchSnippet}
                setEditingSnippet={setEditingSnippet}
              />
            )}
          </>
        )}

        {viewTrash && (
          <TrashList
            snippets={snippets}
            setSnippets={setSnippets}
            fetchSnippet={fetchSnippet}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
