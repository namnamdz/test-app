// PROJECT IMPORTS

import { InitialLoginContextProps } from "../types/auth";
import { LOGIN, LOGOUT } from "./action";

interface AccountReducerActionProps {
  type: String;
  payload: InitialLoginContextProps;
}
const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  user: null,
  isInitialized: true,
};

const accountReducer = (
  state = initialState,
  action: AccountReducerActionProps
) => {
  switch (action.type) {
    case LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        user,
        isInitialized: false,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isInitialized: false,
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default accountReducer;
