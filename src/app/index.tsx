import { Button, ConfigProvider, Space } from "antd";

function App() {
  return (
    <ConfigProvider>
      <Space>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
      </Space>
    </ConfigProvider>
  );
}

export default App;
