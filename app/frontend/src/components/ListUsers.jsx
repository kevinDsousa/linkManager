import api from "../services/api";
import { Space } from "antd";
import { Loading } from "./Loading";

import { useEffect, useState } from "react";
import { CardUser } from "./CardUser";

export const ListUsers = () => {


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
      className={`mx-6 my-6 ${!loading ? "flex flex-1" : "grid grid-cols-3 gap-2"}`}
    >
      {!loading ? (
        <Loading /> // Renderizar o componente Loading se loading for true
      ) : (
        list.map((item) => (
          <CardUser key={item.id} name={item.name} gravatarUrl={item.gravatarUrl}/>
        ))
      )}
    </Space>
  );
};
