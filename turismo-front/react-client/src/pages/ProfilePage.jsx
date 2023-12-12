import { useState, useEffect } from "react";
import { useAuthAdmin } from "../context/AuthContext";
import { userProfileRequest } from "../api/users";
import { useNavigate } from "react-router-dom";
import { message, Button } from "antd";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuthAdmin();

  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const findProfile = async (user) => {
    try {
      const response = await userProfileRequest(user.documentId);
      console.log(userData);
      setUserData(response.data);
    } catch (error) {
      message.error;
    }
  };

  const handleCatalogClick = () => {
    navigate("/catalog");
  };

  useEffect(() => {
    if (isAuthenticated) {
      findProfile(user);
    }
  }, [isAuthenticated]);

  return (
    <div>
      <h1>Datos de Usuario</h1>
      {userData && (
        <>
          <ul>
            <li>documentId: {userData.documentId}</li>
            <li>email: {userData.email}</li>
            <li>firstName: {userData.firstName}</li>
            <li>lastName: {userData.lastName}</li>
            <li>phone: {userData.phone}</li>
            <li>role: {userData.role}</li>
          </ul>

          <Button type="primary" onClick={() => handleCatalogClick()}>
            Ver Catálogo
          </Button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
