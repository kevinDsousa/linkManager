import api from "../services/api";
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
    <Space direction="vertical" size={16} className="flex flex-1 mx-5 my-5">
      {list.map((item) => {
        return (
          <Card key={item.id} bordered={true} className="border-slate-950 flex flex-1">
            <p className="text-center text-2xl text-slate-900">{item.name}</p>
            <img
              className="rounded-full w-40 h-40"
              src={item.gravatarUrl}
              alt={ImageBitmap.name}
            />
          </Card>
        );
      })}
    </Space>
  );
};
