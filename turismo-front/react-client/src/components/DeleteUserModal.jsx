import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

const DeleteUserModal = ({ visible, onCancel, onConfirm }) => {
  const [form] = Form.useForm();

  const handleConfirm = () => {
    form.validateFields().then((values) => {
      // Lógica para manejar el número de documento
      onConfirm(values.documentNumber);
      form.resetFields();
    });
  };

  return (
    <Modal
      visible={visible}
      title="Ingresar Número de Documento"
      onCancel={onCancel}
      onOk={handleConfirm}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="documentNumber"
          label="Número de Documento"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese el número de documento",
            },
            { pattern: /^\d+$/, message: "Solo se permiten números" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DeleteUserModal;
