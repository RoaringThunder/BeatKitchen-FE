import React, { useEffect, useState, useContext } from "react";
import "src/css/Login.css";
import Loader from "../../components/Loader/Loader";
import AuthContext from "../App/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faCircleExclamation,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import AlertHandler from "src/components/Alerts/AlertHandler";
import { useNavigate } from "react-router-dom";

function Home() {
  const { CheckCookie, Login, SignUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(true);
  const [showBadRegisterPassword, setShowBadRegisterPassword] = useState(false);
  const [showBadRegisterEmail, setShowBadRegisterEmail] = useState(false);
  const [alertStatus, setAlertStatus] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const [awaiting, setAwaiting] = useState(false);

  const [formData, setFormData] = useState({
    loginEmail: "",
    loginPassword: "",
    registerFirstname: "",
    registerEmail: "",
    registerPassword: "",
    registerConfirmPassword: "",
  });

  const handleAlert = (status, message) => {
    setAlertStatus(status);
    setAlertMessage(message);
  };

  const checkCookie = () => {
    setLoading(true);
    CheckCookie()
      .then((response) => {
        if (response.status == true) {
        } else {
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
    setAwaiting(true);
    await Login(formDataExistingUser)
      .then((response) => {
        if (response.status === true) {
          handleAlert(response.status, response.message);
        } else {
          handleAlert(response.status, response.message);
        }
      })
      .catch((e) => {})
      .finally(() => {
        setAwaiting(false);
      });
  };

  const signUpHandler = async () => {
    setShowBadRegisterPassword(false);
    setShowBadRegisterEmail(false);
    if (formData.registerPassword !== formData.registerConfirmPassword) {
      setShowBadRegisterPassword(true);
      return;
    }
    if (formData.registerEmail.includes("@") == false) {
      setShowBadRegisterEmail(true);
      return;
    }
    const formDataNewUser = {
      email: formData.registerEmail,
      password: formData.registerPassword,
    };
    setAwaiting(true);
    await SignUp(formDataNewUser)
      .then((response) => {
        if (response.status === true) {
          handleAlert(response.status, response.message);
          navigate("/verify/email-sent");
        } else {
          handleAlert(response.status, response.message);
        }
      })
      .catch((e) => {})
      .finally(() => {
        setAwaiting(false);
      });
  };

  const onChangeFormData = (e) => {
    let field = e.target.id;
    setFormData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const onClickSubmit = () => {
    if (activeTab === "login") {
      loginHandler();
    } else {
      signUpHandler();
    }
  };

  const onClear = () => {
    setFormData({
      loginEmail: "",
      loginPassword: "",
      registerEmail: "",
      registerPassword: "",
      registerConfirmPassword: "",
    });
  };

  const onChangeTab = (e) => {
    setActiveTab(e.target.id);
  };

  document.body.style.overflow = "hidden";

  return (
    <>
      <AlertHandler status={alertStatus} message={alertMessage} />

      <div className="login">
        {!animating && (
          <>
            {!loading && (
              <>
                <div className="login-body">
                  <div className="col-xs-12 col-sm-6 col-m-12 col-l-12 login-form">
                    <div className="login-header">
                      <p>
                        Allow family and friends to take control of the party
                        today, with <b>Salamander.io!</b>
                      </p>
                    </div>
                    <div className="login-panel">
                      <div className="login-panel-header">
                        <div className="login-panel-options">
                          <span
                            className={`${
                              activeTab === "login" ? "active" : ""
                            }`}
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
                        <div className="login-panel-loader">
                          {awaiting && <Loader />}
                        </div>
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
                                value={formData.loginEmail}
                                maxLength={320}
                                onChange={(e) => onChangeFormData(e)}
                              />
                              <span>Password:</span>

                              <input
                                type="password"
                                id="loginPassword"
                                name="loginPassword"
                                placeholder="Password"
                                maxLength={32}
                                value={formData.loginPassword}
                                onChange={(e) => onChangeFormData(e)}
                              />
                            </>
                          ) : (
                            <>
                              <span>
                                Email:
                                {showBadRegisterEmail && (
                                  <Tippy content="Invalid email address">
                                    <span className="login-info-icon">
                                      <FontAwesomeIcon
                                        icon={faCircleExclamation}
                                        color="#e74c3c"
                                      />
                                    </span>
                                  </Tippy>
                                )}
                              </span>
                              <input
                                type="text"
                                id="registerEmail"
                                name="registerEmail"
                                placeholder="Email"
                                maxLength={320}
                                value={formData.registerEmail}
                                onChange={(e) => onChangeFormData(e)}
                              />
                              <span>
                                Password:
                                <Tippy content="Passwords can contain any character. Maximum length: 64 characters">
                                  <span className="login-info-icon">
                                    <FontAwesomeIcon
                                      icon={faCircleInfo}
                                      color="white"
                                    />
                                  </span>
                                </Tippy>
                              </span>

                              <input
                                type="password"
                                id="registerPassword"
                                name="registerPassword"
                                placeholder="Password"
                                maxLength={32}
                                value={formData.registerPassword}
                                onChange={(e) => onChangeFormData(e)}
                              />

                              <span>
                                Confirm Password:
                                {showBadRegisterPassword && (
                                  <Tippy content="Doesn't match password">
                                    <span className="login-info-icon">
                                      <FontAwesomeIcon
                                        icon={faCircleExclamation}
                                        color="#e74c3c"
                                      />
                                    </span>
                                  </Tippy>
                                )}
                              </span>
                              <input
                                type="password"
                                id="registerConfirmPassword"
                                name="registerConfrimPassword"
                                placeholder="Confirm Password"
                                maxLength={32}
                                value={formData.registerConfirmPassword}
                                onChange={(e) => onChangeFormData(e)}
                              />
                            </>
                          )}
                        </div>
                      </form>
                      <div className="login-panel-footer">
                        <Tippy content="Submit">
                          <span onClick={onClickSubmit}>
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              color="white"
                            />
                          </span>
                        </Tippy>
                        <Tippy content="Clear all">
                          <span onClick={onClear}>
                            {" "}
                            <FontAwesomeIcon
                              icon={faTimesCircle}
                              color="white"
                            />
                          </span>
                        </Tippy>
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
