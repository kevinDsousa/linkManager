import { Card, Input, Button, List } from "antd";
import { useState } from "react";

const { Item } = List;

export const CardUser = ({ gravatarUrl, name, email, links }) => {
  const [activeTabKey, setActiveTabKey] = useState("profile");
  const [newLink, setNewLink] = useState("");
  const [editableLinkId, setEditableLinkId] = useState(null);

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const handleAddLink = () => {
  };

  const handleEditLink = (linkId) => {
    setEditableLinkId(linkId);
  };

  const handleSaveLink = (linkId) => {
    setEditableLinkId(null);
  };

  const handleDeleteLink = (linkId) => {
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
          <img className="rounded w-1/3 h-1/3" src={gravatarUrl} alt={name} />
          <span className="font-mono font-semibold">Name: {name}</span>
          <span className="font-mono font-semibold">Email: {email}</span>
        </div>
      )}

      {activeTabKey === "links" && (
        <div>
          <Input
            placeholder="Adicionar novo link"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
          />
          <Button onClick={handleAddLink}>Adicionar</Button>
          <List
            dataSource={links}
            renderItem={(link, index) => (
              <Item>
                {editableLinkId === index ? (
                  <>
                    <Input value={link} onChange={(e) => console.log(e)} />
                    <Button onClick={() => handleSaveLink(index)}>Salvar</Button>
                  </>
                ) : (
                  <>
                    {link}
                    <Button onClick={() => handleEditLink(index)}>Editar</Button>
                    <Button onClick={() => handleDeleteLink(index)}>Excluir</Button>
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
