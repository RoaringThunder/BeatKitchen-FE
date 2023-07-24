import { React, useEffect, useState } from "react";
import "src/css/AlertHandler.css";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircleCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

function AlertHandler(props) {
  const { status, message } = props;
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("success");

  useEffect(() => {
    console.log(status, message);
    if (status == false) {
      setAlertStatus("danger");
    } else if (status == true) {
      setAlertStatus("danger");
    } else {
      setAlertStatus(message);
    }
    setAlertMessage(message);
    setShowAlert(true);
  }, [message, status]);

  useEffect(() => {
    const displayAlert = setTimeout(() => {
      setAlertMessage("");
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(displayAlert);
  }, [alertMessage]);

  // TO DO: After alert is hidden, reset the status and message to default values

  useEffect;
  return (
    <>
      {showAlert && (
        <div className="alert-container">
          <div className={"alert-body " + alertStatus}>
            {alertStatus === "success" && (
              <>
                <span className="alert-body-icon">
                  <FontAwesomeIcon icon={faCircleCheck} color="#39ff14" />
                </span>
                <span className="alert-bosy-message">{alertMessage}</span>
              </>
            )}
            {alertStatus === "danger" && (
              <>
                <span className="alert-body-icon">
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    color="#e74c3c"
                  />
                </span>
                <span className="alert-bosy-message">{alertMessage}</span>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default AlertHandler;
