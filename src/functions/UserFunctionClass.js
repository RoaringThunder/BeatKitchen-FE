import React from "react";
import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST;
axios.defaults.withCredentials = true;


class UserFunctionClass extends React.Component {
  async SignIn(userData) {
    const apiURL = API_HOST + "/login";
    const result = await axios({
      method: "post",
      url: apiURL,
      data: userData,
      withCredentials: true,
    })
      .then((response) => {
        if (response.status === 200) {
          return { status: true, data: response, statusCode: response.status };
        } else {
          return {
            status: false,
            data: response.message,
            statusCode: response.status,
          };
        }
      })
      .catch((err) => {
        let statusCode = 500;
        let statusMsg = "Connection Refused";
        if (err.response) {
          statusMsg = err.response.data.error;
          statusCode = err.response.status;
        }
        return { ststus: false, message: statusMsg, statusCode: statusCode };
      });
    return result;
  }

  async SignUp(userData) {
    const apiURL = API_HOST + "/create";
    const result = await axios({
      method: "post",
      url: apiURL,
      data: userData,
    })
      .then((response) => {
        if (response.status === 200) {
          return { status: true, data: response, statusCode: response.status };
        } else {
          return {
            status: false,
            data: response.message,
            statusCode: response.status,
          };
        }
      })
      .catch((err) => {
        let statusCode = 500;
        let statusMsg = "Connection Refused";
        if (err.response) {
          statusMsg = err.response.data.error;
          statusCode = err.response.status;
        }
        return { ststus: false, message: statusMsg, statusCode: statusCode };
      });
    return result;
  }
}

const UserFunctionClassExport = new UserFunctionClass();
export default UserFunctionClassExport;
