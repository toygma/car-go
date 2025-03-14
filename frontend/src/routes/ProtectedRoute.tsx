import { isAuthenticatedVar, userVar } from "@/apollo/apolloVars";
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

export const AdminProtectedRoute = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string[] | string;
}) => {
  const currentUser = useReactiveVar(userVar);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !currentUser ||
      ![role].flat().some((r) => currentUser.role?.includes(r))
    ) {
      navigate("/");
    }
  }, [currentUser]);

  return <>{children}</>;
};
