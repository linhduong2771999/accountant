import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon, Avatar, Tooltip, Button } from "antd";

const { Sider } = Layout;
const { SubMenu } = Menu;

const settingIcon = (
  <span className="setting-icon">
    Setting <Icon type="setting" />
  </span>
);
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  onCollapse = collapsed => {
    this.setState(
      {
        collapsed
      },
      () => {
        this.props.onCollapse(this.state.collapsed);
      }
    );
  };
  render() {
    const { collapsed } = this.state;
    return (
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
              <Tooltip placement="right" title={settingIcon}>
                <p>
                  Jessica <Icon type="right" style={{ fontSize: "10px" }} />
                </p>
              </Tooltip>
            </div>
          )}
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <Link to="/">
              <Icon type="pie-chart" />
              <span>Bảng điều khiển</span>
            </Link>
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
            <Menu.Item key="2">
              <Link to="/accounting">Quản lý kế toán</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/user_manager">Quản lý người dùng</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/work_manager">Quản lý công việc</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="5">
            <Link to="/user_list">
              <Icon type="team" />
              <span>Danh sách nhân viên</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/notification">
              <Icon type="notification" />
              <span>Bảng thông báo</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
