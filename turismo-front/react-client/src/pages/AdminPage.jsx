import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout, message, Button } from "antd";

import { useAuthAdmin } from "../context/AuthContext.jsx";
import { getUserRequest, deleteUserRequest } from "../api/users";

import CustomMenu from "../components/CustomMenu";
import GetUserModal from "../components/GetUserModal";
import RegisterModal from "../components/RegisterModal.jsx";
import DeleteUserModal from "../components/GetUserModal.jsx";
import UpdateUserModal from "../components/UpdateUserModal.jsx";

const AdminPage = () => {
  const { Sider, Content } = Layout;
  const { user, isAdmin, isAuthenticated, userDataGlobal } = useAuthAdmin();

  const [getUserModalVisible, setGetUserModalVisible] = useState(false);
  const [getDeleteModalVisible, setDeleteUserModalVisible] = useState(false);
  const [getRegisterModalVisible, setGetRegisterModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const adminMenuItems = [
    { key: "home", label: "Home" },
    { key: "create", label: "Crear usuario" },
    { key: "find", label: "Buscar usuario" },
    { key: "delete", label: "Eliminar usuario" },
  ];

  const handleMenuItemClick = (key) => {
    setSelectedMenuItem(key);

    // Abrir el modal específico al hacer clic en "Buscar usuario por DNI"
    if (key === "find") {
      setGetUserModalVisible(true);
    }
    if (key === "home") {
      setUserData(null);
      navigate("/admin");
    }
    if (key === "create") {
      showRegisterModal();
    }
    if (key === "delete") {
      setDeleteUserModalVisible(true);
    }
    if (key === "update") {
      setGetUserModalVisible(true);
    }
  };

  const handleGetUserConfirm = async (documentNumber) => {
    const response = await getUserRequest(documentNumber);

    setUserData(response.data);

    // Cierra el modal después de manejar el número de documento
    setGetUserModalVisible(false);
  };

  const handleDeleteUserConfirm = async (documentNumber) => {
    try {
      const response = await deleteUserRequest(documentNumber);
      message.success("Usuario eliminado exitosamente.");
    } catch (error) {
      message.error("Error para buscar usuario.");
    }

    // Cierra el modal después de manejar el número de documento
    setDeleteUserModalVisible(false);
  };

  const handleGetUserCancel = () => {
    // Cierra el modal sin hacer nada
    setGetUserModalVisible(false);
  };

  const handleDeleteUserCancel = () => {
    // Cierra el modal sin hacer nada
    setDeleteUserModalVisible(false);
  };

  const showRegisterModal = () => {
    setGetRegisterModalVisible(true);
  };

  const handleRegisterCancel = () => {
    setGetRegisterModalVisible(false);
  };

  const handleUpdateUserCancel = () => {
    setUpdateModalVisible(false);
  };

  const handleUpdateUser = (userData) => {
    setUpdateModalVisible(true);
  };

  const handleUpdateUserConfirm = () => {};

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={160}>
        <CustomMenu items={adminMenuItems} onClick={handleMenuItemClick} />
      </Sider>
      <Layout>
        <Content style={{ padding: "24px", minHeight: 280 }}>
          {/* Contenido de la página de administrador */}
          <h1>Admin Page Content</h1>
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

              <Button type="primary" onClick={() => handleUpdateUser(userData)}>
                Modificar usuario
              </Button>
            </>
          )}
        </Content>
      </Layout>

      <GetUserModal
        visible={getUserModalVisible}
        onCancel={handleGetUserCancel}
        onConfirm={handleGetUserConfirm}
      />
      <RegisterModal
        visible={getRegisterModalVisible}
        onCancel={handleRegisterCancel}
      />
      <DeleteUserModal
        visible={getDeleteModalVisible}
        onCancel={handleDeleteUserCancel}
        onConfirm={handleDeleteUserConfirm}
      />
      <UpdateUserModal
        visible={updateModalVisible}
        onCancel={handleUpdateUserCancel}
        onConfirm={handleUpdateUserConfirm}
        user={userData}
      />
    </Layout>
  );
};

export default AdminPage;
