import React, { useEffect, useState, useContext } from "react";
import Login from "./Login.css";
import AuthContext from "./AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  const { CheckCookie } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(true);
  const [showBadPassword, setShowBadPassword] = useState(false);

  const [formData, setFormData] = useState({
    loginEmail: "",
    loginPassword: "",
    registerFirstname: "",
    registerEmail: "",
    registerPassword: "",
    registerConfirmPassword: "",
  });

  const checkCookie = () => {
    setLoading(true);
    CheckCookie()
      .then((response) => {
        if (response.status == true) {
          console.log(response.message);
        } else {
          console.log(response.message);
        }
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const clearTimeouts = () => {
      clearTimeout(timerAnimation);
      clearTimeout(timerCookie);
    };
    const timerAnimation = setTimeout(() => {
      setAnimating(false);
    }, 1500);
    const timerCookie = setTimeout(() => {
      checkCookie();
    }, 2500);

    return () => clearTimeouts();
  }, []);

  const loginHandler = async () => {
    const formDataExistingUser = {
      email: formData.loginEmail,
      password: formData.loginPassword,
    };
    await loginApiCall(formDataExistingUser)
      .then((response) => {
        if (response.status === true) {
        } else {
        }
      })
      .catch((e) => {})
      .finally(() => {});
  };

  const signUpHandler = () => {
    if (formData.registerPassword !== formData.registerConfirmPassword) {
      setShowBadPassword(true);
      return;
    }
    const formDataNewUser = {
      email: formData.registerEmail,
      password: formData.registerPassword,
      firstname: formData.registerFirstname,
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

  const onChangeFormData = (e) => {
    let field = e.target.id;
    setFormData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const onChangeTab = (e) => {
    setActiveTab(e.target.id);
  };

  document.body.style.overflow = "hidden";

  return (
    <>
      <div className="login">
        {!animating && (
          <>
            {loading && (
              <>
                <div className="App-Header-bar">{<span>Loading</span>}</div>
              </>
            )}
            {!loading && (
              <>
                <div className="login-body">
                  <div className="col-xs-12 col-sm-6 col-m-12 col-l-12 login-form">
                    <div className="login-form-header">
                      <h3>Salamander.io</h3>
                      <br />
                      <p>
                        Allow family and friends to take control of the party
                        today, with Salamander.io!
                      </p>
                    </div>
                    <div className="login-panel">
                      <div className="login-panel-options">
                        <span
                          className={`${activeTab === "login" ? "active" : ""}`}
                          id="login"
                          onClick={(e) => onChangeTab(e)}
                        >
                          Login
                        </span>
                        <span
                          className={`${
                            activeTab === "register" ? "active" : ""
                          }`}
                          id="register"
                          onClick={(e) => onChangeTab(e)}
                        >
                          Register
                        </span>
                      </div>
                      <form>
                        <div className="form-group">
                          {activeTab === "login" ? (
                            <>
                              <span>Email:</span>
                              <input
                                type="text"
                                id="loginEmail"
                                name="loginEmail"
                                placeholder="Email"
                                onChange={(e) => onChangeFormData(e)}
                              />
                              <span>Password:</span>

                              <input
                                type="text"
                                id="loginPassword"
                                name="loginPassword"
                                placeholder="Password"
                                value={
                                  formData.loginPassword.length > 0
                                    ? "*".repeat(formData.loginPassword.length)
                                    : ""
                                }
                                onChange={(e) => onChangeFormData(e)}
                              />
                            </>
                          ) : (
                            <>
                              <span>Firstname:</span>
                              <input
                                type="text"
                                id="registerFirstname"
                                name="registerFirstname"
                                placeholder="Firstname"
                                onChange={(e) => onChangeFormData(e)}
                              />

                              <span>Email:</span>
                              <input
                                type="text"
                                id="registerEmail"
                                name="registerEmail"
                                placeholder="Email"
                                onChange={(e) => onChangeFormData(e)}
                              />
                              <span>Password:</span>

                              <input
                                type="text"
                                id="registerPassword"
                                name="registerPassword"
                                placeholder="Password"
                                value={
                                  formData.registerPassword.length > 0
                                    ? "*".repeat(
                                        formData.registerPassword.length
                                      )
                                    : ""
                                }
                                onChange={(e) => onChangeFormData(e)}
                              />

                              <span>Confirm Password:</span>
                              <input
                                type="text"
                                id="registerConfirmPassword"
                                name="registerConfrimPassword"
                                placeholder="Confirm Password"
                                value={
                                  formData.registerConfirmPassword.length > 0
                                    ? "*".repeat(
                                        formData.registerConfirmPassword.length
                                      )
                                    : ""
                                }
                                onChange={(e) => onChangeFormData(e)}
                              />
                            </>
                          )}
                        </div>
                      </form>
                      <div className="login-panel-footer">
                        <span>
                          <FontAwesomeIcon icon={faCheckCircle} color="white" />
                        </span>
                        <span>
                          {" "}
                          <FontAwesomeIcon icon={faTimesCircle} color="white" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        <div className={"vinyl-record" + `${!loading ? " expand-vinyl" : ""}`}>
          <div className="vinyl-record-texture">
            <div className="vinyl-label">
              <div className="vinyl-hole" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
