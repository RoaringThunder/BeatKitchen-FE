import { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const API_HOST = process.env.REACT_APP_API_HOST;
  const [authData, setAuthData] = useState(null); // State to store authentication data

  axios.interceptors.request.use(
    (config) => {
      config.withCredentials = true;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const Login = async (payload) => {
    const apiURL = API_HOST + "/login";
    const result = axios
      .post(apiURL, payload)
      .then((response) => {
        if (response.status === 200) {
          sessionStorage.setItem("email", payload.email);
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
          sessionStorage.setItem("email", response.data.email);
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
        return { status: false, message: statusMsg, statusCode: statusCode };
      });
    return result;
  };

  const SignUp = async (payload) => {
    const apiURL = API_HOST + "/create";
    const result = axios
      .post(apiURL, payload)
      .then((response) => {
        if (response.status === 200) {
          sessionStorage.setItem("email", payload.email);
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

  return (
    <AuthContext.Provider value={{ Login, CheckCookie, SignUp, authData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
