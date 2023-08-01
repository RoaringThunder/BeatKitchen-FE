// import { FaWindowClose } from "react-icons/fa";
import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import UserFunctionClass from "../../functions/UserFunctionClass";
import AuthContext from "./AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
function Modal(props) {
  const { show, hide, tab, setActiveTab } = props;
  const { loginApiCall } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    signInEmail: "",
    signInPassword: "",
    signUpEmail: "",
    signUpPassword: "",
  });
  const { loading, setLoading } = useState(false);

  const handleChangeForm = (event) => {
    let field = event.target.id;
    let value = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const onClickLogin = () => {
    setActiveTab("signin");
  };

  const onClickSignUp = () => {
    setActiveTab("signup");
  };

  const loginHandler = async () => {
    const formDataExistingUser = {
      email: formData.signInEmail,
      password: formData.signInPassword,
    };
    await loginApiCall(formDataExistingUser)
      .then((response) => {
        if (response.status === true) {
          hide();
        } else {
        }
      })
      .catch((e) => {})
      .finally(() => {});
  };

  const signUpHandler = () => {
    const formDataNewUser = {
      email: formData.signUpEmail,
      password: formData.signUpPassword,
    };
    UserFunctionClass.SignUp(formDataNewUser)
      .then((response) => {
        if (response.status === true) {
          hide();
        } else {
        }
      })
      .catch((e) => {})
      .finally(() => {});
  };

  const onSubmit = () => {
    if (tab === "signin") {
      loginHandler();
    } else if (tab === "signup") {
      signUpHandler();
    }
  };

  return (
    <>
      {show && (
        <div className="Modal-container">
          <span className="Modal-header">
            <div className="modal-options">
              <div
                className={`${
                  tab === "signin"
                    ? "col-xs-5 col-md-9 col-lg-10 col-xl-10 text-active"
                    : "col-xs-7 col-md-3 col-lg-2 col-xl-2"
                }`}
                onClick={onClickLogin}
              >
                <span>LOGIN</span>
              </div>
              <div
                className={`${
                  tab === "signup"
                    ? "col-xs-5 col-md-9 col-lg-10 col-xl-10 text-active"
                    : "col-xs-7 col-md-3 col-lg-2 col-xl-2"
                }`}
                onClick={onClickSignUp}
              >
                <span>SIGN UP</span>
              </div>
            </div>
            {/* <FaWindowClose onClick={hide} /> */}
            {/* <span className="fa-stack-icon" onClick={() => hide()}> */}
            {/* <FontAwesomeIcon icon={faCircleXmark} color="black" /> */}
          </span>
          <div className="Modal-body">
            <div className="access-form">
              {tab === "signin" ? (
                <>
                  <input
                    type="email"
                    className="form-control"
                    id="signInEmail"
                    placeholder="Email"
                    onChange={(e) => handleChangeForm(e)}
                    value={formData.signInEmail}
                  />
                  <input
                    type="password"
                    className="form-control"
                    id="signInPassword"
                    placeholder="Password"
                    onChange={(e) => handleChangeForm(e)}
                    value={formData.signInPassword}
                  />
                </>
              ) : (
                <>
                  <input
                    type="email"
                    className="form-control"
                    id="signUpEmail"
                    placeholder="Email"
                    onChange={(e) => handleChangeForm(e)}
                    value={formData.signUpEmail}
                  />
                  <input
                    type="password"
                    className="form-control"
                    id="signUpPassword"
                    placeholder="Password"
                    onChange={(e) => handleChangeForm(e)}
                    value={formData.signUpPassword}
                  />
                </>
              )}
            </div>

            <div>
              <Button className="log-in-button">
                <span className="login-text" onClick={onSubmit}>
                  Submit
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Modal;
