import { createContext } from "react";
import axios from "axios";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const API_HOST = process.env.REACT_APP_API_HOST;
  const loginApiCall = async (payload) => {
    const apiURL = API_HOST + "/login";
    const result = axios
      .post(apiURL, payload)
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
          statusMsg = err.response.data.message;
          statusCode = err.response.status;
        }
        return { status: false, message: statusMsg, statusCode: statusCode };
      });
    return result;
  };

  const CheckCookie = async () => {
    const apiURL = API_HOST + "/api/login/check-cookie";
    const result = axios
      .get(apiURL)
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
  };

  return (
    <AuthContext.Provider value={{ loginApiCall, CheckCookie }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
