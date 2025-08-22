import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Purchases from "./pages/Purchases";
import Assignments from "./pages/Assignments";
import Reports from "./pages/Reports";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
