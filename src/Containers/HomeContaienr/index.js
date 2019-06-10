import React from "react";
import { Row, Col, Layout, Typography } from "antd";
import ChartContainer from "../ChartContainer";
import Header from "../../Components/Header";
import DummyLinks from "../../Components/DummyLinks";
import "./HomeContainer.css";
import ResizeObserver from "../../Common/ResizeObserver";
const { Title, Paragraph } = Typography;

function HomeContainer(props) {
  return (
    <Layout className="layout">
      <Layout.Header className="page-header">
        <Header />
      </Layout.Header>
      <Layout.Content className="page-layout">
        <Row>
          <Col span={19}>
            <Row>
              <Title>
                <i className="fa fa-bookmark" /> System Overview
              </Title>
              <Paragraph>Overview of the key system metrics</Paragraph>
            </Row>
            <Row>
              <ChartContainer />
            </Row>
          </Col>
          <Col span={5}>
            <DummyLinks />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}

export default ResizeObserver(HomeContainer);
