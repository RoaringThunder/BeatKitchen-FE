import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
function Access() {
  const [formData, setFormData] = useState({});
  // const [open, setOpen] = useState(true)

  // const handleClose = () => {
  //   setOpen(false)
  // }
  const apiUrl = process.env.ADDRESS;
const getUser =() => {
  axios({
    method: 'post',
    url: apiUrl + '/login',
    data: {
      firstName: 'Finn',
      lastName: 'Williams'
    }
  });
}
  const handleChangeForm = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    if (field === "password") {
      console.log()
      setFormData((prevState) => ({
        ...prevState,
        [field]: value,
        "pw_display": "*".repeat(value.length),
        }));
    }   else {
      setFormData((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="App-Main">
      <div className="access-form">
        <label className="form-input">
          Username/Email:
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
      <span onClick={getUser}><Button >Log In</Button></span>
      
    </div>
  );
}
export default Access;
