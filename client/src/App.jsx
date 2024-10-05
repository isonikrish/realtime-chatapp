import React from 'react'
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:3001");
  return (
    <div>App</div>
  )
}

export default App