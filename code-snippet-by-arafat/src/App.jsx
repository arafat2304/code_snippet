import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./page/LoginPage.jsx";
import Signup from "./page/Signup";
import Dashboard from "./Dashboard";
import ViewSnippet from "./page/ViewSnippet.jsx";
import Analytics from "./components/Analytics.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/analytics" element={<Analytics/>} />
        <Route path="/view/:id" element={<ViewSnippet/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
