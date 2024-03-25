// THIRD-PARTY
import { Navigate } from "react-router-dom";

// PROJECT IMPORTS
import { GuardProps } from "types";
import useAuth from "hooks/useAuth";

const AuthGuard = ({ children }: GuardProps) => {
  const { isLoggedIn } = useAuth();
  //if you want protection app please uncomment below this line
  // if (!isLoggedIn) {
  //   return <Navigate to="/login" replace />;
  // }
  return children;
};

export default AuthGuard;
