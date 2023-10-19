import { Card, Input, Button, List, Space, Spin } from "antd";
import { useState, useEffect } from "react";
import api from "../services/api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const { Item } = List;

const Loading = () => (
  <Space
    direction="vertical"
    style={{
      width: "100%",
    }}
  >
    <Spin tip="Carregando..." size="large" />
  </Space>
);

export const CardUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTabKey, setActiveTabKey] = useState("profile");
  const [newLink, setNewLink] = useState("");
  const [editableLinkId, setEditableLinkId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.sub;

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
  };

  const handleEditLink = (linkId) => {
    setEditableLinkId(linkId);
  };

  const handleSaveLink = (linkId) => {
    setEditableLinkId(null);
  };

  const handleDeleteLink = async (linkId) => {
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
              <img className="rounded w-40 h-40" src={user.gravatarUrl} alt={user.name} />
              <span className="font-mono font-semibold">Name: {user.name}</span>
              <span className="font-mono font-semibold">Email: {user.email}</span>
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
              <Button className="mt-5" onClick={handleAddLink} loading={loading}>
                Adicionar
              </Button>

              {loading ? (
                <Loading />
              ) : (
                <List
                  dataSource={links}
                  renderItem={(link, index) => (
                    <Item>
                      {editableLinkId === index ? (
                        <>
                          <Input
                            value={link.url}
                            onChange={(e) => {
                              const updatedLinks = [...links];
                              updatedLinks[index].url = e.target.value;
                              setLinks(updatedLinks);
                            }}
                          />
                          <Button onClick={() => handleSaveLink(index)}>Salvar</Button>
                        </>
                      ) : (
                        <div className="flex gap-3">
                        <span className="truncate w-72">
                          {link.url}
                        </span>
                        <Button className="bg-orange-500 text-white flex items-center justify-center w-10" onClick={() => handleEditLink(index)}>
                          <EditOutlined />
                        </Button>
                        <Button className="bg-red-700 text-white flex items-center justify-center w-10" onClick={() => handleDeleteLink(index)}>
                          <DeleteOutlined />
                        </Button>
                      </div>
                      
                      )}
                    </Item>
                  )}
                />
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
