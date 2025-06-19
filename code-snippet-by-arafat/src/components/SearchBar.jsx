// import React from "react";

// const SearchBar = ({
//   searchTerm,
//   setSearchTerm,
//   selectedTag,
//   setSelectedTag,
//   selectedLang,
//   setSelectedLang,
//   sortBy,
//   setSortBy,
//   availableTags,
//   darkMode
// }) => {
//   return (
//     <div className="grid md:grid-cols-2 gap-4 mb-4">
//       <input
//         type="text"
//         placeholder="🔍 Search title, description, or code..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="p-2 border rounded w-full "
//       />

//       <select
//         className="p-2 border rounded text-black-500"
//         value={selectedLang}
//         onChange={(e) => setSelectedLang(e.target.value)}
//       >
//         <option value="">All Languages</option>
//         <option value="javascript">JavaScript</option>
//         <option value="html">HTML</option>
//         <option value="css">CSS</option>
//         <option value="python">Python</option>
//         <option value="java">Java</option>
//       </select>

//       <select
//         className="p-2 border rounded"
//         value={selectedTag}
//         onChange={(e) => setSelectedTag(e.target.value)}
//       >
//         <option value="">All Tags</option>
//         {availableTags.map((tag, i) => (
//           <option key={i} value={tag}>
//             #{tag}
//           </option>
//         ))}
//       </select>

//       <select
//         className="p-2 border rounded"
//         value={sortBy}
//         onChange={(e) => setSortBy(e.target.value)}
//       >
//         <option value="newest">🕒 Newest</option>
//         <option value="language">🌐 Language</option>
//         <option value="favorite">⭐ Favorites First</option>
//       </select>
//     </div>
//   );
// };

// export default SearchBar;

// ✅ SearchBar.jsx
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
  onApply
}) => {
  return (
    <div className="mb-6 bg-gray-100 dark:bg-gray-800 p-4 rounded">
      <h2 className="text-lg font-semibold mb-3">🔍 Filter Your Snippets</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Search title, description or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full bg-white text-black dark:bg-gray-700 dark:text-white"
        />

        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="p-2 border rounded w-full bg-white text-black dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Languages</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="csharp">C#</option>
          <option value="php">PHP</option>
        </select>

        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="p-2 border rounded w-full bg-white text-black dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Tags</option>
          {availableTags.map((tag, i) => (
            <option key={i} value={tag}>{tag}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded w-full bg-white text-black dark:bg-gray-700 dark:text-white"
        >
          <option value="newest">Newest</option>
          <option value="language">Language</option>
          <option value="favorite">Favorites</option>
        </select>
      </div>

      <button
        onClick={onApply}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
      >
        🔍 Apply Filters
      </button>
    </div>
  );
};

export default SearchBar;

