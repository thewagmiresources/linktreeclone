import React from "react";
import "./App.css";
import "./mobile.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LinkTreePage from "./components/LinkTreePage";
import CreatePage from "./components/CreatePage";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreatePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/u/:username" element={<LinkTreePage />} />
          <Route path="/preview" element={<LinkTreePage isPreview={true} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;