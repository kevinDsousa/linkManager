import api from "../services/api";
// import { Link } from "react-router-dom";
import { Card, Space } from "antd";
import { Loading } from "./Loading";

import { useEffect, useState } from "react";

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

export const ListUsers = () => {
  const [activeTabKey2, setActiveTabKey2] = useState("app");

  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };

  const [loading, setLoading] = useState(false); // Inicia com loading como true
  const [list, setList] = useState([]);

  const getUsers = async () => {
    try {
      const resp = await api.get("/users");
      const data = resp.data;
      setList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true); // Define loading como false após a conclusão do carregamento
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Space
      direction="vertical"
      size={8}
      className={`mx-6 my-6 ${!loading ? "flex flex-1" : "grid grid-cols-3"}`}
    >
      {!loading ? (
        <Loading /> // Renderizar o componente Loading se loading for true
      ) : (
        list.map((item) => (
          <>
            <Card
              key={item.id}
              bordered={true}
              style={{
                width: "70%",
              }}
              tabList={tabListNoTitle}
              activeTabKey={activeTabKey2}
              onTabChange={onTab2Change}
            >
              <img className="rounded w-20 h-20" src={item.gravatarUrl} />
              <span className="font-mono font-semibold">{item.name}</span>
            </Card>
          </>
        ))
      )}
    </Space>
  );
};

