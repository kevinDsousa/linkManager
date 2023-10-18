import { useState, useEffect } from "react";
import { Modal, Input, Checkbox } from "antd";
import api from "../services/api";

// eslint-disable-next-line react/prop-types
const EditUserModal = ({ visible, onCancel, userToEdit, token, onUserUpdated }) => {
  const [editedUser, setEditedUser] = useState({ name: "", gravatarUrl: "", admin: false });

  useEffect(() => {
    if (userToEdit) {
      setEditedUser({
        // eslint-disable-next-line react/prop-types
        name: userToEdit.name || "",
        // eslint-disable-next-line react/prop-types
        gravatarUrl: userToEdit.gravatarUrl || "",
        // eslint-disable-next-line react/prop-types
        admin: userToEdit.admin || false,
      });
    }
  }, [userToEdit]);

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
      visible={visible}
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
          onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
        />
      </div>
      <div>
        <label>Gravatar URL:</label>
        <Input
          value={editedUser.gravatarUrl}
          onChange={(e) => setEditedUser({ ...editedUser, gravatarUrl: e.target.value })}
        />
      </div>
      <div>
        <label>Admin:</label>
        <Checkbox
          checked={editedUser.admin}
          onChange={(e) => setEditedUser({ ...editedUser, admin: e.target.checked })}
        />
      </div>
    </Modal>
  );
};

export default EditUserModal;
