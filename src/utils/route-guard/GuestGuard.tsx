// THIRD-PARTY

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// PROJECT IMPORTS
import useAuth from "hooks/useAuth";
import { GuardProps } from "types";

const GuestGuard = ({ children }: GuardProps) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
    
  }, [isLoggedIn,navigate]);
  return children;
};

export default GuestGuard;
