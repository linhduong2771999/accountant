import React, { Component } from "react";
import {withRouter, Link } from "react-router-dom";
import { Layout, Menu, Icon, Avatar, Tooltip } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
const { Sider } = Layout;
const { SubMenu } = Menu;

const settingIcon = (
  <span className="setting-icon">
    Hồ sơ cá nhân <Icon type="setting" />
  </span>
)
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      isOpenTooltip: true
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.hideTooltip();
  }

  componentWillUnmount() {
    this._isMounted = false;
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
    

  hideTooltip = () => {
    setTimeout(() => {
      if(this._isMounted){
        this.setState({
          isOpenTooltip: false
        })
      }
    }, 3000)
  }

  onVisibleChange = (visible) => {
    this.setState({
      isOpenTooltip: visible
    })
  }
  render() {
    const { collapsed, isOpenTooltip } = this.state;
    const {location} = this.props;
    const { currentUser } = this.props.stateOfAuthReducer;
  //   <div
  //   className="logo-user"
  //   style={{ justifyContent: collapsed ? "center" : "" }}
  // >
  //   <Avatar icon="user" size="large" />
  //   {collapsed ? (
  //     ""
  //   ) : (
  //     <div className="user-name">
  //       <span>Welcome,</span>
  //       <Tooltip style={{position: "fixed", zIndex: "10"}} onVisibleChange={this.onVisibleChange} visible={isOpenTooltip} placement="right" title={settingIcon}>
  //         <p className="font-size-14 d-flex align-items-center">
  //           Chào 
  //           {userInfo ? <span className="text-overflow-custom ml-1"> {userInfo.name}</span> : "..."} 
  //           <Icon type="right" style={{ fontSize: "10px", marginLeft: ".25rem" }} />
  //         </p>
  //       </Tooltip>
  //     </div>
  //   )}  
  // </div>
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
        breakpoint={"md"}
        onCollapse={this.onCollapse}
      >
      {collapsed ? (
        ""
      ) : (
        <div className="user-intro">
          <div className="user-intro_logo">
            <Avatar icon="user" size="large" />
          </div>
          <div className="user-intro_info">
              <div className="user-intro_info_welcome">
                  <span>Welcome,</span>
              </div>
              <div className="user-intro_info_name">
                  <span>Chào {currentUser.name || "mừng"}</span>
              </div>
          </div>
        </div>
      )}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={
            (
              location.pathname === "/accounting" ||
              location.pathname === "/user_manager" ||  
              location.pathname === "/work_manager" ||
              location.pathname === "/notification_manager" 
            )
              ? ["sub1"]
              : ""
          }
        >
          <Menu.Item key="/">
            <Link to="/">
              <Icon type="pie-chart" />
              <span>Bảng điều khiển  </span>
            </Link>
          </Menu.Item>
            {
              currentUser.role === "admin" &&
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    <span>Quản trị viên</span>
                  </span>
                }
              >
                <Menu.Item key="/accounting">
                  <Link to="/accounting">Quản lý kế toán</Link>
                </Menu.Item>
                <Menu.Item key="/user_manager">
                  <Link to="/user_manager">Quản lý người dùng</Link>
                </Menu.Item>
                <Menu.Item key="/work_manager">
                  <Link to="/work_manager">Quản lý công việc</Link>
                </Menu.Item>
                <Menu.Item key="/notification_manager">
                  <Link to="/notification_manager">Quản lý thông báo</Link>
                </Menu.Item>
              </SubMenu>
            }
          <Menu.Item key="/user_common">
            <Link to="/user_common">
              <Icon type="team" />
              <span>Danh sách nhân viên</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/notification">
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

const mapStateToProps = (state) => {
  return {
    stateOfAuthReducer: state.authReducers
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(Sidebar)