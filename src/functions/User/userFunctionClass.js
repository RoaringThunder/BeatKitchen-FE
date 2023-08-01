import React from "react";
import axios from "axios";

const SMTP_HOST = process.env.REACT_APP_API_SMTP_HOST;
const API_HOST = process.env.REACT_APP_API_HOST;

class UserFunctionClass {
  async VerifyUser(userData) {
    const api_url = SMTP_HOST + "/verify";

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
            data: response.data.message,
            statusCode: response.status,
          };
        }
      })
      .catch((err) => {
        let statusCode = 500;
        let statusMsg = "Connection Refused";
        if (err.response.data.message && err.response.status) {
          statusMsg = err.response.data.message;
          statusCode = err.response.status;
        }
        return { ststus: false, message: statusMsg, statusCode: statusCode };
      });
    return result;
  }

  async SendVerification(forceSend) {
    const api_url = SMTP_HOST + "/verify/send-verification/" + forceSend;
    const result = await axios({
      method: "post",
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
        if (err.response.data.message && err.response.status) {
          statusMsg = err.response.data.message;
          statusCode = err.response.status;
        }
        return { ststus: false, message: statusMsg, statusCode: statusCode };
      });
    return result;
  }
  async CheckVerified() {
    const api_url = API_HOST + "/verify/check-verified";
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
        if (err.response.data.message && err.response.status) {
          statusMsg = err.response.data.message;
          statusCode = err.response.status;
        }
        return { ststus: false, message: statusMsg, statusCode: statusCode };
      });
    return result;
  }
}
export const UserFunctionClassExport = new UserFunctionClass();

export default UserFunctionClassExport;
