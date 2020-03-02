import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import HeaderIndex from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import RouterMain from "../../routers/mainRouter";
import { Layout, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;

class AppIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  onCollapse = collapsed => {
    this.setState({
      collapsed
    });
  };
  render() {
    const { collapsed } = this.state;
    const { location } = this.props;
    return (
      <div>
        <HeaderIndex />
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar onCollapse={collapsed => this.onCollapse(collapsed)} />
          <Layout
            style={{
              marginLeft: !collapsed ? 200 : 80,
              transition: "all 0.3s ease"
            }}
          >
            <Header style={{ background: "#fff", padding: 0 }} />
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                 <Breadcrumb.Item>Welcome {location.pathname.split("/")}</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                  {RouterMain}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              ©2020 Created by Duong Nguyen
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(AppIndex);