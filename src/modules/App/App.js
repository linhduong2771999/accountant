import React, { Component } from "react";
import {compose, bindActionCreators } from "redux";
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
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
    // this.props.actions.fetchSpecificUserProfileRequest(JSON.parse(userUID));
  }

  onCollapse = collapsed => {
    this.setState({
      collapsed
    });
  };

  renderBreadcrum = (pathnames) => (
    pathnames.length <= 0 ? <Breadcrumb.Item ><Link to="/">Dashboard</Link></Breadcrumb.Item> :
    pathnames.map((item, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
      const isLast = index === pathnames.length;
      return isLast ? 
      <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item> :
      <Breadcrumb.Item key={index}><Link to={routeTo} style={{textTransform: "capitalize"}}>{item.replace("_", " ")}</Link></Breadcrumb.Item>
     })
  )
  render() {
    const { collapsed } = this.state;
    const { location, userProfile } = this.props;    
    const pathnames = location.pathname.split("/").filter(x => x);
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
                 {this.renderBreadcrum(pathnames)}
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