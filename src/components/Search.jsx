import { Input, Space } from "antd";
const { Search } = Input;

const onSearch = (value) => console.log(value);

export const SearchInput = () => (
  <Space className="mt-6" direction="vertical">
    <Search placeholder="Pesquisar usuário" onSearch={onSearch} enterButton />
  </Space>
);
