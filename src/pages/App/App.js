import "src/css/App.css";
import React from "react";
import Home from "../Home/Home";
import Verify from "../Verify/Verify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./AuthContext";
import VerificationSent from "src/components/VerificationSent/VerificationSent";
function App() {
  return (
    <AuthContextProvider>
      <div className="bg-smdr-main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/verify/email/:email/v_code/:v_code"
              element={<Verify />}
            />
            <Route path="/verify/email-sent" element={<VerificationSent />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  );
}

export default App;
