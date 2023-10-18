import { Card, Input, Button, List } from "antd";
import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode"; // Importe a biblioteca jwt-decode

const { Item } = List;

export const CardUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTabKey, setActiveTabKey] = useState("profile");
  const [newLink, setNewLink] = useState("");
  const [editableLinkId, setEditableLinkId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);
  const token = localStorage.getItem("token");
  // Decodifique o token para obter o ID do usuário
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.sub;

  useEffect(() => {
    if (!token) {
      navigate("/"); // Redirecione para a página inicial ou trate de forma apropriada
    } else {
      // Realize a solicitação para obter os detalhes do usuário com base no ID fornecido
      api.get(`/users/${userId}`, {
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
  };

  const handleAddLink = async () => {
    // Lógica para adicionar um novo link, similar à implementação anterior
  };

  const handleEditLink = (linkId) => {
    // Lógica para editar um link
  };

  const handleSaveLink = (linkId) => {
    // Lógica para salvar um link editado
  };

  const handleDeleteLink = async (linkId) => {
    // Lógica para excluir um link
  };

  const handleShareProfile = () => {
    navigate("/");
  };

  // Quando o botão "Ver Meus Links" é clicado, faça a solicitação e atualize os links
  const handleViewMyLinks = () => {
    api.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLinks(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar links do usuário:", error);
      });
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

              {/* Botão para ver os links do usuário */}
              <Button className="mt-5" onClick={handleViewMyLinks}>
                Ver Meus Links
              </Button>

              {/* Lista de links */}
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
                      <>
                        {link.url}
                        <Button onClick={() => handleEditLink(index)}>Editar</Button>
                        <Button onClick={() => handleDeleteLink(index)}>Excluir</Button>
                      </>
                    )}
                  </Item>
                )}
              />
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
