import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/dashboard";
import Login from "./Components/login";
import Signup from "./Components/signup";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
    </Router>
  );
}

export default App;
