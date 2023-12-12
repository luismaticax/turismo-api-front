import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthAdmin } from "../context/AuthContext.jsx";
import { createUserRequest, updateUserRequest } from "../api/users.js";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Input, Button, message } from "antd";

const UpdateUserModal = ({ visible, onCancel, user }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signUp, isAuthenticated, isAdmin } = useAuthAdmin();

  const handleRegister = async (values) => {
    setLoading(true);

    try {
      console.log(values);
      await updateUserRequest(values.documentId, values);

      // Cerrar el modal después del registro exitoso
      onCancel();
      form.resetFields();
      message.success("Actualización exitosa.");
    } catch (error) {
      console.error("Error al actualizar:", error);
      message.error("Error al actualizar, por favor intenta de nuevo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !isAdmin) navigate("/profile");
  }, [isAuthenticated]);

  return (
    <Modal
      open={visible}
      title="Actualización"
      okText="Registrar"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
          style={{ backgroundColor: "#D85D86" }}
        >
          Actualizar
        </Button>,
      ]}
    >
      <Form
        form={form}
        onFinish={handleRegister}
        layout="vertical"
        initialValues={user}
      >
        <Form.Item
          name="email"
          label="Correo electrónico"
          rules={[
            {
              required: true,
              message: "Por favor, ingresa tu correo electrónico",
            },
            {
              type: "email",
              message: "Por favor, ingresa un correo electrónico válido",
            },
          ]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          name="firstName"
          label="Nombre"
          rules={[{ required: true, message: "Por favor, ingresa tu nombre" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Apellido"
          rules={[
            { required: true, message: "Por favor, ingresa tu apellido" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Teléfono"
          rules={[
            {
              required: true,
              message: "Por favor, ingresa tu número de teléfono",
            },
            { pattern: /^[0-9]+$/, message: "Ingresa solo números" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            { required: true, message: "Por favor, ingresa tu contraseña" },
            {
              min: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="documentId"
          label="Documento de identidad"
          rules={[
            {
              required: true,
              message: "Por favor, ingresa tu documento de identidad",
            },
          ]}
        >
          <Input readOnly />
        </Form.Item>
        {isAdmin && (
          <Form.Item
            name="role"
            label="Rol de usuario (user/admin)"
            rules={[
              {
                required: true,
                message: "Por favor, ingresa el rol del usuario",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default UpdateUserModal;
