import { isAuthenticatedVar } from "@/apollo/apolloVars";
import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const isAuthenticated = useReactiveVar(isAuthenticatedVar);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
