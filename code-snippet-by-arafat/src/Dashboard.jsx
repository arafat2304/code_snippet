import React, { useState, useEffect } from "react";
import SnippetForm from "./components/SnippetForm";
import SnippetList from "./components/SnippetList";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import SearchBar from "./components/SearchBar"; // optional if Phase 2

const Dashboard = () => {
  const [snippets, setSnippets] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/login");
    }
  })
   
  const logout = async () => {
   const response = await axios.get('http://localhost:5000/api/auth/logout',{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
  })

  if(response.status==200){
    navigate("/login");
    localStorage.removeItem("token");
  }
}

      const fetchSnippet = async()=>{
        try{
            const response = await axios.get('http://localhost:5000/api/snippets/all',{
              headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
              }
              })
              setSnippets(response.data)
            }catch(err){
            console.log(err);
            }
      }
    

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🧠 Code Snippet by Arafat</h1>
          <p onClick={logout}>Click me</p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Optional search bar */}
        {/* <SearchBar ... /> */}

        <SnippetForm snippets={snippets} setSnippets={setSnippets} />
        <SnippetList snippets={snippets} setSnippets={setSnippets} fetchSnippet={fetchSnippet}/>
      </div>
    </div>
  );
};

export default Dashboard;
