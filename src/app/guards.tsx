import { Navigate, NavigateProps, Outlet } from "react-router-dom";

export const HasUser = (props: NavigateProps) => {
  const hasUser = true;

  return hasUser ? <Outlet /> : <Navigate {...props} />;
};
