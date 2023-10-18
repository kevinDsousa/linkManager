import { useEffect, useState } from "react";
import { Table, Button, Space, Modal } from "antd";
import api from "../services/api";
import Menu from "../components/Menu";
import EditUserModal from "./EditUserModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ListUser = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const showModal = (userId) => {
    setIsModalVisible(true);
    setUserIdToDelete(userId);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setUserIdToDelete(null);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setUserToEdit(null);
  };

  const handleDeleteConfirm = () => {
    if (userIdToDelete) {
      api
        .delete(`/users/${userIdToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setIsModalVisible(false);
          setUserIdToDelete(null);
          loadUserData();
        })
        .catch((error) => {
          console.error("Erro ao excluir o usuário:", error);
        });
    }
  };

  const loadUserData = () => {
    api
      .get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const usersWithKeys = response.data.map((user) => ({
          ...user,
          key: user.id,
        }));
        setData(usersWithKeys);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  };

  useEffect(() => {
    loadUserData();
  }, [token]);

  const columns = [
    {
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gravatar URL",
      dataIndex: "gravatarUrl",
      key: "gravatarUrl",
      render: (gravatarUrl) => (
        <img
          src={gravatarUrl}
          alt="Gravatar"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      id: "actions",
      title: "Ações",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="link"
            className="bg-orange-500 text-white flex items-center justify-center w-10"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
          </Button>
          <Button
            type="link"
            className="bg-red-700 text-white flex items-center justify-center w-10"
            onClick={() => showModal(record.id)}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setUserToEdit(record);
    setIsEditModalVisible(true);
  };

  return (
    <>
      <Menu />
      <h2 className="text-center font-mono text-2xl font-bold mt-5">
        Usuários
      </h2>
      <Table className="mx-10 my-5" dataSource={data} columns={columns} />
      <Modal
        title="Confirmar Exclusão"
        open={isModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleCancel}
        okText="Confirmar"
        cancelText="Cancelar"
        okButtonProps={{
          className: "custom-ok-button",
          style: { background: "green", color: "white" },
        }}
        cancelButtonProps={{
          className: "custom-cancel-button",
          style: { background: "red", color: "white" },
        }}
      >
        Tem certeza de que deseja excluir este usuário?
      </Modal>
      <EditUserModal
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        userToEdit={userToEdit}
        token={token}
        onUserUpdated={loadUserData}
      />
    </>
  );
};

export default ListUser;
