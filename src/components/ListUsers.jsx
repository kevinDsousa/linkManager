import api from "../services/api";
import { Link } from "react-router-dom";
import { Card, Space } from "antd";

import { useEffect, useState } from "react";

export const ListUsers = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const getUsers = async () => {
    try {
      setLoading(true);
      const resp = await api.get("/users");
      const data = resp.data;
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Space
      direction="vertical"
      size={32}
      className="grid grid-cols-2 mx-5 my-5"
    >
      {list.map((item) => {
        return (
          <Card
            key={item.id}
            bordered={true}
            className="border-[#ccc] flex flex-1 items-center bg-slate-100 transition hover:scale-105"
          >
            <p className="text-center text-2xl text-[#001529]">{item.name}</p>
            <Link to={`/user/:${item.id}`}>
              <img
                className="rounded-full w-20 h-20"
                src={item.gravatarUrl}
                alt={ImageBitmap.name}
              />
            </Link>
          </Card>
        );
      })}
    </Space>
  );
};
