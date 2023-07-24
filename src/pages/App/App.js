import "src/css/App.css";
import React from "react";
import Home from "../Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./AuthContext";
function App() {
  return (
    <AuthContextProvider>
      {/* <div className="Main"> */}
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      {/* </div> */}
    </AuthContextProvider>
  );
}

export default App;
