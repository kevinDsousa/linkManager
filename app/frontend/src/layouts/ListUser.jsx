import { useEffect, useState } from "react";
import { Table, Button, Space, Modal } from "antd";
import api from "../services/api";
import Menu from "../components/Menu";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ListUser = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const showModal = (userId) => {
    setIsModalVisible(true);
    setUserIdToDelete(userId);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setUserIdToDelete(null);
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
          api
            .get("/users", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setData(response.data);
            })
            .catch((error) => {
              console.error("Erro ao buscar os dados:", error);
            });
        })
        .catch((error) => {
          console.error("Erro ao excluir o usuário:", error);
        });
    }
  };

  useEffect(() => {
    api
      .get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, [token]);

  const columns = [
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
      title: "Ações",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="link"
            className="bg-orange-500  text-white flex items-center justify-center w-10"
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
    console.log(`Editar: ${record.name}`);
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
        visible={isModalVisible}
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
    </>
  );
};

export default ListUser;
