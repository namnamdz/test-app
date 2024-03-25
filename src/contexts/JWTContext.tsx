// THIRD-PARTY
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { createContext, useEffect, useReducer } from "react";

// PROJECT IMPORTS
import axiosService from "../utils/axios";
import accountReducer from "../store/accountReducer";
import { LOGIN, LOGOUT } from "../store/action";
import { InitialLoginContextProps, JWTContextType } from "../types/auth";
import { KeyedObject } from "../types";
import Loader from "components/loader/Loader";

const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  user: null,
  isInitialized: true,
};

const verifyToken: (st: string) => boolean = (serviceToken: string) => {
  if (!serviceToken) return false;
  const decoded: KeyedObject = jwtDecode(serviceToken as any);
  return decoded.exp > Date.now() / 1000;
};
const setCookie = (serviceToken: string | null) => {
  if (serviceToken) {
    const decoded: KeyedObject = jwtDecode(serviceToken as any);
    const expirationTime: number = decoded.exp * 1000;

    const currentTime: number = Date.now();
    const timeLeft: number = expirationTime - currentTime;

    Cookies.set("token", serviceToken, {
      expires: new Date(currentTime + timeLeft),
    });

    axiosService.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    Cookies.remove("token");
    delete axiosService.defaults.headers.common.Authorization;
  }
};
export const JWTContext = createContext<JWTContextType | null>(null);
export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);
  const mockUser = {
    name: "John Doe",
    img: "https://res.cloudinary.com/du5trgchf/image/upload/v1705571233/images-product/download.jpg",
  };
  const mockUserString = JSON.stringify(mockUser);
  localStorage.setItem("user", mockUserString);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token && verifyToken(token)) {
      setCookie(token);
      // Call API to get user info if needed
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          //user: {},
        },
      });
    } else {
      setCookie(null);
      dispatch({
        type: LOGOUT,
        payload: {
          isLoggedIn: false,
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (state.isInitialized !== undefined && state.isInitialized) {
    return <Loader />;
  }
  const login = async (username: string, password: string) => {
    // const res = await loginApi(username, password);
    // if (res.status === 200) {
    //   setCookie(res.data.token);
    //   dispatch({
    //     type: LOGIN,
    //     payload: {
    //       isLoggedIn: true,
    //     },
    //   });
    // }
  };
  const logout = async () => {
    setCookie(null);
    dispatch({
      type: "LOGOUT",
      payload: {
        isLoggedIn: false,
      },
    });
  };
  return (
    <JWTContext.Provider value={{ ...state, login, logout }}>
      {children}
    </JWTContext.Provider>
  );
};
export default JWTContext;
