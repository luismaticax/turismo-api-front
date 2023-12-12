import React, { useState } from "react";
import RegisterModal from "../components/RegisterModal";
import LoginModal from "../components/LogInModal";
import { Layout, Menu, Button, message } from "antd";
import { useAuthAdmin } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

const { Header } = Layout;

const NavBar = () => {
  const { user, isAuthenticated, logOut, isAdmin } = useAuthAdmin();

  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);

  const navigate = useNavigate();

  const showRegisterModal = () => {
    setRegisterModalVisible(true);
  };

  const handleRegisterCancel = () => {
    setRegisterModalVisible(false);
  };

  const showLoginModal = () => {
    setLoginModalVisible(true);
  };

  const handleLoginCancel = () => {
    setLoginModalVisible(false);
  };

  const handleLogout = () => {
    logOut();
    navigate("/");
    message.success("Logged out successfully");
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#880d1e", // Change the background color
        padding: "16px 50px",
      }}
    >
      <Link
        to="/"
        style={{ color: "#ffffff", fontSize: "1.5rem", textDecoration: "none" }}
      >
        Oficina de Turismo
      </Link>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ lineHeight: "64px" }}
      ></Menu>
      <div>
        {isAuthenticated ? (
          <>
            <span style={{ color: "#ffeedd", marginRight: "8px" }}>
              Bienvenido,{" "}
            </span>
            <span style={{ color: "#ffeedd", marginRight: "8px" }}>
              {user.email}
            </span>
            <Button
              type="primary"
              onClick={handleLogout}
              style={{ marginLeft: "8px", backgroundColor: "#D85D86" }}
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Button
              type="primary"
              onClick={showRegisterModal}
              style={{ marginLeft: "8px", backgroundColor: "#D85D86" }}
            >
              Registrar
            </Button>
            <Button
              type="primary"
              onClick={showLoginModal}
              style={{ marginLeft: "8px", backgroundColor: "#D85D86" }}
            >
              Iniciar sesión
            </Button>
          </>
        )}
      </div>
      <RegisterModal
        visible={isRegisterModalVisible}
        onCancel={handleRegisterCancel}
      />
      <LoginModal visible={isLoginModalVisible} onCancel={handleLoginCancel} />
    </Header>
  );
};

export default NavBar;
