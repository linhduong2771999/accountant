import React, { Component } from "react";
import "./Sidebar.scss";
import { Layout, Menu, Icon, Breadcrumb, Avatar } from "antd";

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            zIndex: "999",
            marginTop: "65px"
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <div
            className="logo-user"
            style={{ justifyContent: collapsed ? "center" : "" }}
          >
            <Avatar icon="user" size="large" />
            {collapsed ? (
              ""
            ) : (
              <div className="user-name">
                <span>Welcome,</span>
                <p>Jessica</p>
              </div>
            )}
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Bảng điều khiển</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>Quản trị viên</span>
                </span>
              }
            >
              <Menu.Item key="2">Kế toán</Menu.Item>
              <Menu.Item key="3">Quản lý người dùng</Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
              <Icon type="team" />
              <span>Danh sách nhân viên</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          style={{
            marginLeft: collapsed ? 100 : 200,
            transition: "all 0.3s ease"
          }}
        >
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©2020 Created by Duong Nguyen
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Sidebar;
