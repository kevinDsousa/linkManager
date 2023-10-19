import { Card, Input, Button, List, Modal } from "antd";
import { useState, useEffect } from "react";
import api from "../services/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Loading } from './Loading'
import jwtDecode from "jwt-decode";

const { Item } = List;

export const CardUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTabKey, setActiveTabKey] = useState("profile");
  const [newLink, setNewLink] = useState("");
  const [editableLinkId, setEditableLinkId] = useState(null);
  const [editableLink, setEditableLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.sub;

  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [linkToDeleteId, setLinkToDeleteId] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      api
        .get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar detalhes do usuário:", error);
        });
    }
  }, [userId, token, navigate]);

  const onTabChange = (key) => {
    setActiveTabKey(key);
    if (key === "links") {
      setLoading(true);
      api
        .get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setLinks(response.data.links);
        })
        .catch((error) => {
          console.error("Erro ao buscar links do usuário:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleAddLink = async () => {
    try {
      setLoading(true);
      const response = await api.post(
        `/links`,
        { url: newLink, isActive: false, user: user.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setLinks([...links, response.data]);
        setNewLink("");
      } else {
        console.error("Erro ao adicionar o link. Resposta inesperada:", response);
      }
    } catch (error) {
      console.error("Erro ao adicionar o link:", error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };
  

  const handleEditLink = (link) => {
    setEditableLinkId(link.id);
    setEditableLink(link);
  };

  const handleSaveLink = async () => {
    try {
      setLoading(true);
      const response = await api.patch(
        `/links/${editableLink.id}`,
        { url: editableLink.url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedLinks = [...links];
        const linkIndex = updatedLinks.findIndex((l) => l.id === editableLink.id);
        if (linkIndex !== -1) {
          updatedLinks[linkIndex].url = editableLink.url;
          setLinks(updatedLinks);
        }
      } else {
        console.error("Erro ao atualizar o link. Resposta inesperada:", response);
      }
    } catch (error) {
      console.error("Erro ao atualizar o link:", error);
    } finally {
      setEditableLinkId(null);
      setEditableLink(null);
      setLoading(false);
      window.location.reload();
    }
  };

  const handleDeleteLink = (linkId) => {
    setLinkToDeleteId(linkId);
    setDeleteConfirmationVisible(true);
  };
  const confirmDeleteLink = () => {
    try {
      setLoading(true);
      const linkToDelete = links[linkToDeleteId];
      api
        .delete(`/links/${linkToDelete.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 204) {
            const updatedLinks = [...links];
            updatedLinks.splice(linkToDeleteId, 1);
            setLinks(updatedLinks);
          } else {
            console.error("Erro ao excluir o link. Resposta inesperada:", response);
          }
        })
        .catch((error) => {
          console.error("Erro ao excluir o link:", error);
        })
        .finally(() => {
          setLinkToDeleteId(null);
          setDeleteConfirmationVisible(false);
          setLoading(false);
          window.location.reload();
        });
    } catch (error) {
      console.error("Erro ao excluir o link:", error);
    }
  };

  const cancelDeleteLink = () => {
    setLinkToDeleteId(null);
    setDeleteConfirmationVisible(false);
  };

  const handleShareProfile = () => {
    navigate("/");
  };

  return (
    <Card
      bordered={true}
      tabList={[
        {
          key: "profile",
          tab: "Perfil",
        },
        {
          key: "links",
          tab: "Links",
        },
      ]}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
    >
      {user && (
        <div>
          {activeTabKey === "profile" && (
            <div className="flex flex-col items-center justify-center gap-5">
              <img
                className="rounded w-40 h-40"
                src={user.gravatarUrl}
                alt={user.name}
              />
              <span className="font-mono font-semibold">Name: {user.name}</span>
              <span className="font-mono font-semibold">
                Email: {user.email}
              </span>
              <Button type="link" onClick={handleShareProfile}>
                Compartilhar Perfil
              </Button>
            </div>
          )}

          {activeTabKey === "links" && (
            <div>
              <Input
                placeholder="Adicionar novo link"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
              />
              <Button
                className="mt-5"
                onClick={handleAddLink}
                loading={loading}
              >
                Adicionar
              </Button>

              {loading ? (
                <Loading />
              ) : (
                <List
                  dataSource={links}
                  renderItem={(link, index) => (
                    <Item>
                      {editableLinkId === link.id ? (
                        <>
                          <Input
                            value={editableLink.url}
                            onChange={(e) => {
                              const updatedLink = { ...editableLink };
                              updatedLink.url = e.target.value;
                              setEditableLink(updatedLink);
                            }}
                          />
                          <Button
                            className="ml-2"
                            onClick={handleSaveLink}
                          >
                            Salvar
                          </Button>
                        </>
                      ) : (
                        <div className="gap-3">
                          <span className="">{link.url}</span>
                          <div className="flex items-center">
                            <Button
                              className="bg-orange-500 text-white flex items-center justify-center w-10"
                              onClick={() => handleEditLink(link)}
                            >
                              <EditOutlined />
                            </Button>
                            <Button
                              className="bg-red-700 text-white flex items-center justify-center w-10"
                              onClick={() => handleDeleteLink(index)}
                            >
                              <DeleteOutlined />
                            </Button>
                          </div>
                        </div>
                      )}
                    </Item>
                  )}
                />
              )}
              <Modal
                title="Confirmar exclusão"
                open={deleteConfirmationVisible}
                onOk={confirmDeleteLink}
                onCancel={cancelDeleteLink}
                okButtonProps={{
                  className: "custom-ok-button",
                  style: { background: "green", color: "white" },
                }}
                cancelButtonProps={{
                  className: "custom-cancel-button",
                  style: { background: "red", color: "white" },
                }}
              >
                Tem certeza de que deseja excluir este link?
              </Modal>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
