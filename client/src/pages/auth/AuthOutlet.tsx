import React, { CSSProperties } from "react";
import { Outlet } from "react-router-dom";
import { Divider, Flex, Layout, Typography, Col, Row } from "antd";
import { AppFooter } from "../../shared/components/footer/AppFooter";

const { Content } = Layout;
const { Title } = Typography;

const boxStyle: CSSProperties = {
  margin: 0,
  width: "100%",
  height: "100%",
};

export const AuthOutlet = () => {
  return (
    <Layout style={{ width: "100vw", height: "100vh", margin: 0 }}>
      <Content className="auth-outlet" style={boxStyle}>
        <Row align="middle" justify="space-around" style={boxStyle}>
          <Col
            style={{
              backgroundColor: "lightgrey",
            }}>
            <Title>WELCOME</Title>
          </Col>
          <Divider
            type="vertical"
            style={{ height: "90%", backgroundColor: "darkgrey" }}
          />
          <Col>
            <Outlet />
          </Col>
        </Row>
      </Content>
      <AppFooter />
    </Layout>
  );
};
