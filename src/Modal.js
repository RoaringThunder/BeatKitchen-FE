import { FaWindowClose } from "react-icons/fa";
import React, {  useState } from "react";
import { Button } from "react-bootstrap";

function Modal(props) {
  const { show, hide, tab, setActiveTab } = props;

  const [formData, setFormData] = useState({});

  
  const handleChangeForm = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    if (field === "password") {
      setFormData((prevState) => ({
        ...prevState,
        [field]: value,
        pw_display: "*".repeat(value.length),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    }
  };

  const onClickLogin = () => {
    setActiveTab("signin");
  };

  const onClickSignUp = () => {
    setActiveTab("signup");
  };

  return (
    <>
      {show && (
        <div className="Modal-container">
          <span className="Modal-header">
            <div className="modal-options">
              <span
                className={`${tab === "signin" ? "text-active" : ""}`}
                onClick={onClickLogin}
              >
                LOG IN
              </span>
              <span>/</span>
              <span
                className={`${tab === "signup" ? "text-active" : ""}`}
                onClick={onClickSignUp}
              >
                SIGN UP
              </span>
            </div>
            <FaWindowClose onClick={hide} />
          </span>
          <div className="Modal-body">
            {tab === "signin" ? (
              <div className="access-form">
                <label className="form-input">
                  Username:
                  <input
                    className="text-field"
                    type="text"
                    name="username"
                    onChange={(e) => handleChangeForm(e)}
                    value={formData.username}
                  ></input>
                </label>
                <label className="form-input">
                  Password:
                  <input
                    className="text-field"
                    type="text"
                    name="password"
                    onChange={(e) => handleChangeForm(e)}
                    value={formData.pw_display}
                  ></input>
                </label>
              </div>
            ) : (
              <div className="access-form">
                <label className="form-input">
                  Username:
                  <input
                    className="text-field"
                    type="text"
                    name="username"
                    onChange={(e) => handleChangeForm(e)}
                    value={formData.username}
                  ></input>
                </label>
                <label className="form-input">
                  Email:
                  <input
                    className="text-field"
                    type="text"
                    name="email"
                    onChange={(e) => handleChangeForm(e)}
                    value={formData.email}
                  ></input>
                </label>
                <label className="form-input">
                  Password:
                  <input
                    className="text-field"
                    type="text"
                    name="password"
                    onChange={(e) => handleChangeForm(e)}
                    value={formData.pw_display}
                  ></input>
                </label>
              </div>
            )}

            <div>
              <Button className="log-in-button">
                <span className="login-text">Submit</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Modal;
