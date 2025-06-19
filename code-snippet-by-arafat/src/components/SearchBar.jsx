import React from "react";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  selectedTag,
  setSelectedTag,
  selectedLang,
  setSelectedLang,
  sortBy,
  setSortBy,
  availableTags,
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <input
        type="text"
        placeholder="🔍 Search title, description, or code..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded w-full"
      />

      <select
        className="p-2 border rounded"
        value={selectedLang}
        onChange={(e) => setSelectedLang(e.target.value)}
      >
        <option value="">All Languages</option>
        <option value="javascript">JavaScript</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>

      <select
        className="p-2 border rounded"
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
      >
        <option value="">All Tags</option>
        {availableTags.map((tag, i) => (
          <option key={i} value={tag}>
            #{tag}
          </option>
        ))}
      </select>

      <select
        className="p-2 border rounded"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="newest">🕒 Newest</option>
        <option value="language">🌐 Language</option>
        <option value="favorite">⭐ Favorites First</option>
      </select>
    </div>
  );
};

export default SearchBar;
