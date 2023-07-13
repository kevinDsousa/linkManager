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
      className="flex flex-col"
      tabList={tabListNoTitle}
      activeTabKey={activeTabKey2}
      onTabChange={onTab2Change}
      defaultActiveTabKey="profile"
    >
      <div className="flex flex-col items-center justify-center gap-5">
        <img className="rounded w-1/3 h-1/3" src={gravatarUrl} alt={name} />
        <span className="font-mono font-semibold">{name}</span>
      </div>
    </Card>
  );
};
