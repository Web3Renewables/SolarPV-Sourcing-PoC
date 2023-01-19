import styled from "styled-components";
import { Button, Space, DatePicker } from "antd";

const Title = styled.h1`
  color: red;
`;

const Test = () => {
  const onChange = () => {};
  return (
    <div>
      <Title>My First Next.js Page</Title>
      <Space direction="vertical">
        <Button type="primary">Primary Button</Button>
        <Button type="ghost">Ghost Button</Button>
        <DatePicker onChange={onChange} />
      </Space>
    </div>
  );
};

export default Test;
