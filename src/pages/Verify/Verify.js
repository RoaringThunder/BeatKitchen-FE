import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../App/AuthContext";
import UserFunctionClassExport from "src/functions/User/userFunctionClass";
import "src/css/Verify/Verify.css";

function Verify() {
  const { email, v_code } = useParams();
  const navigate = useNavigate();

  const [verified, setVerified] = useState(false);
  const [awaiting, setAwaiting] = useState(true);
  const { CheckCookie } = useContext(AuthContext);
  const sessionEmail = sessionStorage.getItem("email");
  const [errorMsg, setErrorMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkCookie();
  }, []);

  useEffect(() => {
    if (loggedIn && sessionEmail == email) {
      verifyUser();
    }
  }, [loggedIn]);

  const handleError = () => {
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 3000);
    return;
  };

  const checkCookie = () => {
    CheckCookie()
      .then((response) => {
        if (response.status == true && response.message != "Not Logged In") {
          setLoggedIn(true);
        } else {
          //   handleError();
        }
      })
      .catch((err) => {
        handleError();
      })
      .finally(() => {});
  };

  const verifyUser = () => {
    UserFunctionClassExport.VerifyUser({
      email: email,
      verification_code: v_code,
    })
      .then((response) => {
        setAwaiting(false);
        if (response.status == true) {
          setVerified(true);
        } else {
          setErrorMsg(response.message);
          //   handleError();
        }
      })
      .catch((err) => {
        // handleError();
      })
      .finally(() => {});
  };

  return (
    <div className="verify">
      {!awaiting ? (
        <>
          <div className="email-sent-container">
            <div className="email-sent-body">
              <div className="col-xs-10 col-md-6 col-lg-8 col-xl-4 email-sent-card">
                {verified ? (
                  <>
                    <h1>Account Activated</h1>
                    <p>
                      Welcome to Salamander.io! Your account has been activated.
                      Redirecting to home page...
                    </p>
                  </>
                ) : (
                  <>
                    <h1>Error Verifying</h1>
                    <p>{errorMsg}</p>
                    {errorMsg !== "" && <p>Redirecting to login page</p>}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={"vinyl-record-lg-loader"}>
            <div className="vinyl-record-texture">
              <div className="vinyl-label">
                <div className="vinyl-hole" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Verify;
