import React,{ useState }  from "react";
import Modal from "./Modal";

function Home()  {

  
    const [showSignUp, setShowSignUp] = useState(true);
    const [showSignIn, setShowSignIn] = useState(true);



    const [showAccessModal, setShowAccessModal] = useState(false)
  const [activeTab, setActiveTab]= useState("signin")

  
  const onHideModal = () =>{
    setShowSignIn(true)
    setShowSignUp(true)
    setShowAccessModal(false)
  }

  const onClickSignIn = () =>{
    setActiveTab("signin")
    setShowSignIn(false)
    setShowSignUp(false)
    setShowAccessModal(true)
  }

  const onClickSignUp = () =>{
    setActiveTab("signup")
    setShowSignIn(false)
    setShowSignUp(false)
    setShowAccessModal(true)
  }

    return(
      <>
        <div className="App-header">
        <Modal show={showAccessModal} hide={onHideModal} tab={activeTab} setActiveTab={setActiveTab}></Modal>

        <div className="App-Header-bar">
          <span
            className={`Login ${showSignIn ? "" : "hidden"}`}
            onClick={onClickSignIn}
          >
            LOG IN
          </span>
          <span
            className={`Sign-Up ${showSignUp ? "" : "hidden"}`}
            onClick={onClickSignUp}
          >
            SIGN UP
          </span>
        </div>

      </div>

      </>
    )
} export default Home