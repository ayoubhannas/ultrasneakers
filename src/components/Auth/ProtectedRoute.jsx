import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "@/Redux/Auth/authSlice";
import api from "@/Api/authApi";

const ProtectedRoute = ({ children }) => {
  const { isLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/api/check-auth");
        if (response.status !== 200) {
          throw new Error("Échec de la vérification d'authentification");
        }
      } catch (error) {
        console.error("Erreur check-auth:", error);
        if (error.response?.status === 401) {
          dispatch(logout());
          localStorage.removeItem("isLogged");
          localStorage.removeItem("token");
        } else if (error.response?.status === 404) {
          console.warn(
            "Route /check-auth non trouvée. Vérifiez routes/api.php."
          );
        }
      }
    };
    if (isLogged) {
      checkAuth();
    }
  }, [isLogged, dispatch]);

  if (!isLogged && localStorage.getItem("isLogged") !== "true") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
