import React, { useEffect, useState } from "react";
import UserFunctionClassExport from "src/functions/User/userFunctionClass";

function VerificationSent() {
  const email = sessionStorage.getItem("email");
  const [sent, setSent] = useState(false);

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

  useEffect(() => {
    SendVerificationEmail();
  }, []);

  return (
    <div className="VerificationSent">
      <p>Sending</p>
      {sent && (
        <>
          <h1>Verification Sent</h1>
          <p>
            A verification email has been sent to your email address. Please
            click the link in the email to verify your account.
          </p>
          <p>
            If you didn't recieve an email click{" "}
            <span onClick={SendVerificationEmail}>here</span> to recieve another
          </p>
        </>
      )}
    </div>
  );
}
export default VerificationSent;
