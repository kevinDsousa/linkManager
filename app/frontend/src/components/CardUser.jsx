import { Card, Input, Button, List } from "antd";
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const { Item } = List;

// eslint-disable-next-line react/prop-types
export const CardUser = ({ gravatarUrl, name, email, links }) => {
  const navigate = useNavigate();
  const [activeTabKey, setActiveTabKey] = useState("profile");
  const [newLink, setNewLink] = useState("");
  const [editableLinkId, setEditableLinkId] = useState(null);
  const [loading, setLoading] = useState(false);

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const handleAddLink = async () => {
    try {
      setLoading(true);
      await api.post("/links", { url: newLink });
      setNewLink("");
    } catch (error) {
      console.error("Erro ao adicionar o link:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditLink = (linkId) => {
    setEditableLinkId(linkId);
  };

  const handleSaveLink = (linkId) => {
    setEditableLinkId(null);
  };

  const handleDeleteLink = (linkId) => {};

  const handleShareProfile = () => {
    navigate("/")
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
      {activeTabKey === "profile" && (
        <div className="flex flex-col items-center justify-center gap-5">
          <img className="rounded w-40 h-40" src={gravatarUrl} alt={name} />
          <span className="font-mono font-semibold">Name: {name}</span>
          <span className="font-mono font-semibold">Email: {email}</span>
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
          <Button onClick={handleAddLink} loading={loading}>
            Adicionar
          </Button>
          <List
            dataSource={links}
            renderItem={(link, index) => (
              <Item>
                {editableLinkId === index ? (
                  <>
                    <Input value={link} onChange={(e) => console.log(e)} />
                    <Button onClick={() => handleSaveLink(index)}>
                      Salvar
                    </Button>
                  </>
                ) : (
                  <>
                    {link}
                    <Button onClick={() => handleEditLink(index)}>
                      Editar
                    </Button>
                    <Button onClick={() => handleDeleteLink(index)}>
                      Excluir
                    </Button>
                  </>
                )}
              </Item>
            )}
          />
        </div>
      )}
    </Card>
  );
};
