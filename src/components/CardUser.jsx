import { Card } from "antd";
import { useState } from "react";

const tabListNoTitle = [
  {
    key: "profile",
    label: "Perfil",
  },
  {
    key: "links",
    label: "Links",
  },
];

// eslint-disable-next-line react/prop-types
export const CardUser = ({ gravatarUrl, name }) => {
  const [activeTabKey2, setActiveTabKey2] = useState("profile");

  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  
  return (
    <Card
      bordered={true}
      style={{
        width: "70%",
      }}
      tabList={tabListNoTitle}
      activeTabKey={activeTabKey2}
      onTabChange={onTab2Change}
      defaultActiveTabKey="profile"
    >
      <img className="rounded w-20 h-20" src={gravatarUrl} alt={name} />
      <span className="font-mono font-semibold">{name}</span>
    </Card>
  );
};
