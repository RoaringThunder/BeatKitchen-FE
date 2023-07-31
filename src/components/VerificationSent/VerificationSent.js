import React, { useEffect, useState, useContext } from "react";
import UserFunctionClassExport from "src/functions/User/userFunctionClass";
import "src/css/Verify/EmailSent.css";
import { useNavigate } from "react-router-dom";

function VerificationSent() {
  const email = sessionStorage.getItem("email");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const SendVerificationEmail = () => {
    UserFunctionClassExport.SendVerification()
      .then((response) => {
        if (response.status == true) {
          setSent(true);
        } else {
          console.log("failed");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const CheckVerified = () => {
    UserFunctionClassExport.CheckVerified()
      .then((response) => {
        if (response.status == true) {
          SendVerificationEmail();
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    console.log("here");
    CheckVerified();
  }, []);

  return (
    <div className="verify">
      {sent && (
        <>
          <div className="email-sent-container">
            <div className="email-sent-body">
              <div className="col-xs-10 col-md-6 col-lg-8 col-xl-4 email-sent-card">
                <h1>Email Sent</h1>
                <p>
                  An email has been sent to:{" "}
                  <span className="email">{email}</span> Please click the link
                  in the email to verify your account.
                  <br />
                  <br /> If you didn't recieve an email click{" "}
                  <span onClick={SendVerificationEmail}>here</span> to send
                  another.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default VerificationSent;
