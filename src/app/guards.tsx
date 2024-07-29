import { Navigate, NavigateProps, Outlet } from "react-router-dom";
import { useIsSingIn } from "../features/auth";

export const IsSignIn = (props: NavigateProps) => {
  const isSignIn = useIsSingIn();

  return isSignIn ? <Outlet /> : <Navigate {...props} />;
};
