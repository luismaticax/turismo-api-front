import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useAuthAdmin } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signIn } = useAuthAdmin();

  const handleLoginModal = async (values) => {
    setLoading(true);

    try {
      await signIn(values);

      onCancel();

      message.success("Logueo Exitoso");
    } catch (error) {
      message.error(error.message);
      // Puedes mostrar un mensaje de error al usuario si lo deseas
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Login"
      onCancel={onCancel}
      footer={[
        <Button
          key="back"
          onClick={onCancel}
          style={{
            color: "black",
            marginLeft: "8px",
          }}
        >
          Cancelar
        </Button>,
      ]}
    >
      <Form form={form} onFinish={handleLoginModal} layout="vertical">
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
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginLeft: "8px", backgroundColor: "#D85D86" }}
          loading={loading}
        >
          Iniciar sesión
        </Button>
      </Form>
    </Modal>
  );
};

export default LoginModal;
