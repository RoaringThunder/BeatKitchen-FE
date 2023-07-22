import React, { useEffect, useState, useContext } from "react";
import Modal from "./Modal";
import Login from "./Login.css";
import AuthContext from "./AuthContext";

function Home() {
  const { CheckCookie } = useContext(AuthContext);

  const [showSignUp, setShowSignUp] = useState(true);
  const [showSignIn, setShowSignIn] = useState(true);

  const [showAccessModal, setShowAccessModal] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(true);

  const onHideModal = () => {
    setShowSignIn(true);
    setShowSignUp(true);
    setShowAccessModal(false);
  };

  const onClickSignIn = () => {
    setActiveTab("signin");
    // setShowSignIn(false);
    // setShowSignUp(false);
    setShowAccessModal(true);
  };

  const onClickSignUp = () => {
    setActiveTab("signup");
    // setShowSignIn(false);
    // setShowSignUp(false);
    setShowAccessModal(true);
  };

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

  showAccessModal
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "unset");

  return (
    <>
      <Modal
        show={showAccessModal}
        hide={onHideModal}
        tab={activeTab}
        setActiveTab={setActiveTab}
      ></Modal>

      <div className="App-Header-bar">
        {!animating && (
          <>
            {!loading ? (
              <>
                <span
                  className={`Login ${showSignIn ? "" : "hidden"}`}
                  onClick={onClickSignIn}
                >
                  LOGIN
                </span>
                <span
                  className={`Sign-Up ${showSignUp ? "" : "hidden"}`}
                  onClick={onClickSignUp}
                >
                  SIGN UP
                </span>
              </>
            ) : (
              <>{<span>Loading</span>}</>
            )}
          </>
        )}
      </div>

      {/* <div className="vinyl-container"> */}
      <div
        className={"vinyl-record" + `${showAccessModal ? " expand-vinyl" : ""}`}
      >
        <div className="vinyl-label">
          <div className="vinyl-hole" />
        </div>
      </div>
    </>
  );
}
export default Home;
