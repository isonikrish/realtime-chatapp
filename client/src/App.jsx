// App.jsx
import React, { useEffect, useState } from 'react';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { io } from 'socket.io-client';

function App() {
  const socket = io("http://localhost:3001")

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Pass the socket instance to the Chat component */}
      <Route path="/c/:id" element={<Chat socket={socket} />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
