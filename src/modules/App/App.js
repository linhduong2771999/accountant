import React, { Component } from "react";
import {compose, bindActionCreators } from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {AuthActions} from "../../actions/index";
import HeaderIndex from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { Layout, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;

class AppIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  componentDidMount = () => {
    const userUID = localStorage.getItem("userUID");
    this.props.actions.fetchSpecificUserProfileRequest(JSON.parse(userUID));
  }

  onCollapse = collapsed => {
    this.setState({
      collapsed
    });
  };
  render() {
    const { collapsed } = this.state;
    const { location, userProfile } = this.props;    
    return (
      <div>
        <HeaderIndex userProfile={userProfile}/>
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar userProfile={userProfile ? userProfile : ""} onCollapse={collapsed => this.onCollapse(collapsed)} />
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
                  {this.props.children}
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

const mapStateToProps = (state) => {
  return {
    userProfile: state.authReducers.userProfile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AppIndex);