import React from 'react'
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/c/:id" element={<Chat />} />

      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default App