import { Space, Spin } from "antd";

export const Loading = () => (
  <Space
    direction="vertical"
    style={{
      width: "100%",
    }}
  >
    <Spin tip="Loading" size="large">
      <div className="content" />
    </Spin>
  </Space>
);
