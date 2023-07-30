import React from "react";
import axios from "axios";

const API_HOST = process.env.REACT_APP_API_SMTP_HOST;

class UserFunctionClass {
  async VerifyUser(userData) {
    const api_url = API_HOST + "/verify";
    console.log(api_url);

    // send post requst to check the verification code
    const result = await axios({
      method: "post",
      url: api_url,
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

  async SendVerification() {
    const api_url = API_HOST + "/verify/send-verification";
    const result = await axios({
      method: "get",
      url: api_url,
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
}
export const UserFunctionClassExport = new UserFunctionClass();

export default UserFunctionClassExport;
