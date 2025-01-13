import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../features/user/useUser";
import SpinnerFullPage from "../components/SmallComponents/SpinnerFullPage";

function PrivateRoute() {
  const { user, isAuthenticated, isLoading } = useUser();

  if (isLoading) return <SpinnerFullPage />;
  if (!user || !isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default PrivateRoute;
