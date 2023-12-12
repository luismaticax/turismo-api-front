import { useEffect } from "react";
import { useAuthAdmin } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { user, isAuthenticated, logOut, isAdmin } = useAuthAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && isAdmin) navigate("/admin");
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && !isAdmin) navigate("/profile");
  }, [isAuthenticated]);

  return (
    <div>
      <h1>BIENVENIDO</h1>
    </div>
  );
};

export default HomePage;
