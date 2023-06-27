import "./App.css";
import Header from "./Header";
import React from "react";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Access from "./Access";


function App() {


  return (
    <div className="App">
      <Header />
      <BrowserRouter>
      <Routes>
        <Route path="/"element={<Home/>}/>
        <Route path="/access"element={<Access/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
