import { FaWindowClose } from "react-icons/fa";
import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import UserFunctionClass from "./functions/UserFunctionClass";
import AuthContext from "./AuthContext";

function Modal(props) {
  const { show, hide, tab, setActiveTab } = props;
  const {loginApiCall} = useContext(AuthContext)
  const [formData, setFormData] = useState({});

  const handleChangeForm = (event) => {
    let field = event.target.name;
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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const loginHandler = async () => {
    const formDataExistingUser = {
      email: formData.email,
      password: formData.password,
    };
    await loginApiCall(formDataExistingUser)
    .then((response) => {
      if (response.status === true) {
        console.log(response);
      } else {
        console.log(response);
      }
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      console.log("done");
    });
  }

  const onSubmit = () => {
    if (tab === "signin") {
     loginHandler()
    } else if (tab === "signup") {
      const formDataNewUser = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      };
      UserFunctionClass.SignUp(formDataNewUser)
        .then((response) => {
          if (response.status === true) {
            console.log(response);
          } else {
            console.log(response);
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          console.log("done");
        });
    }
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
                    value={formData.password}
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
                    value={formData.password}
                  ></input>
                </label>
              </div>
            )}

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
