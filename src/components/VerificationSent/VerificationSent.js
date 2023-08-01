import React, { useEffect, useState, useContext } from "react";
import UserFunctionClassExport from "src/functions/User/userFunctionClass";
import "src/css/Verify/EmailSent.css";
import { useNavigate } from "react-router-dom";

function VerificationSent() {
  const email = sessionStorage.getItem("email");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const SendVerificationEmail = (force) => {
    setSending(true);
    UserFunctionClassExport.SendVerification(force)
      .then((response) => {
        if (response.status == true) {
          setSent(true);
        } else {
        }
      })
      .catch((err) => {})
      .finally(() => {
        setSending(false);
      });
  };

  const CheckVerified = () => {
    setLoading(true);
    UserFunctionClassExport.CheckVerified()
      .then((response) => {
        if (response.status == true) {
          SendVerificationEmail(false);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {})
      .then(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (email != null && email != undefined && email != "") {
      CheckVerified();
    } else {
      navigate("/");
    }
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
                  <span onClick={() => SendVerificationEmail(true)}>
                    here
                  </span>{" "}
                  to send another.
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
