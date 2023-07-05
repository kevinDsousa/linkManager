import api from "../services/api";
import { Link } from "react-router-dom";
import { Card, Space } from "antd";
import { Loading } from "./Loading";

import { useEffect, useState } from "react";

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
      className={`mx-6 my-6 ${!loading ? "flex flex-1" : "grid grid-cols-2"}`}
    >
      {!loading ? (
        <Loading /> // Renderizar o componente Loading se loading for true
      ) : (
        list.map((item) => (
          <Card
            key={item.id}
            bordered={true}
            className="border-[#aaa9a9] flex flex-1 items-center bg-slate-200 transition hover:scale-105 delay-200 duration-200"
          >
            <p className="text-center text-2xl text-[#001529]">{item.name}</p>
            <Link to={`/users/${item.id}`}>
              <img
                className="rounded-full w-20 h-20"
                src={item.gravatarUrl}
                alt={item.name} // Corrigir o valor do atributo alt
              />
            </Link>
          </Card>
        ))
      )}
    </Space>
  );
};
