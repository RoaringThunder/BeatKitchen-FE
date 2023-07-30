import React, { useEffect, useState, useContext } from "react";
import { useParams, redirect } from "react-router-dom"; // Add this line
import AuthContext from "../App/AuthContext";
import UserFunctionClassExport from "src/functions/User/userFunctionClass"; // Updated import statement

function Verify() {
  const { email, v_code } = useParams();
  const context = useContext(AuthContext);
  const [verified, setVerified] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const { CheckCookie } = useContext(AuthContext);
  const sessionEmail = sessionStorage.getItem("email");

  useEffect(() => {
    checkCookie();
  }, []);

  useEffect(() => {
    if (sessionActive) {
      if (sessionEmail === email) {
        verifyUser();
      } else {
        redirect("/");
      }
    }
  }, [sessionActive]);

  const checkCookie = () => {
    CheckCookie()
      .then((response) => {
        if (response.status == true) {
          setSessionActive(true);
        } else {
          console.log("failed");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        redirect("/");
      });
  };

  const verifyUser = () => {
    UserFunctionClassExport.VerifyUser({
      email: email,
      verification_code: v_code,
    })
      .then((response) => {
        if (response.status == true) {
          setVerified(true);
        } else {
          console.log("failed");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        redirect("/");
      });
  };

  return (
    <div className="Verify">
      {verified ? <h1>Verified</h1> : <h1>Verifyin</h1>}
    </div>
  );
}
export default Verify;
