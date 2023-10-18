import { useState } from "react";
import { Modal, Input } from "antd";
import api from "../services/api";

// eslint-disable-next-line react/prop-types
const EditUserModal = ({ visible, onCancel, userToEdit, token, onUserUpdated }) => {
  const [editedUser, setEditedUser] = useState({ ...userToEdit });

  const handleCancel = () => {
    onCancel();
  };

  const handleUpdateUser = () => {
    api
      // eslint-disable-next-line react/prop-types
      .patch(`/users/${userToEdit.id}`, editedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        onUserUpdated();
        onCancel();
      })
      .catch((error) => {
        console.error("Erro ao atualizar o usuário:", error);
      });
  };

  return (
    <Modal
      title="Editar Usuário"
      open={visible}
      onOk={handleUpdateUser}
      onCancel={handleCancel}
      okButtonProps={{
        className: "custom-ok-button",
        style: { background: "green", color: "white" },
      }}
      cancelButtonProps={{
        className: "custom-cancel-button",
        style: { background: "red", color: "white" },
      }}
    >
      <div>
        <label>Name:</label>
        <Input
          value={editedUser.name}
          onChange={(e) =>
            setEditedUser({ ...editedUser, name: e.target.value })
          }
        />
      </div>
      <div>
        <label>Gravatar URL:</label>
        <Input
          value={editedUser.gravatarUrl}
          onChange={(e) =>
            setEditedUser({ ...editedUser, gravatarUrl: e.target.value })
          }
        />
      </div>
    </Modal>
  );
};

export default EditUserModal;
