import React, { Component, Fragment } from "react";
import { Row, Col, Button, Tooltip, Tag } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reduxForm } from "redux-form";
import { UserManagerActions } from "../../actions/index";
import { ModalPopupActions } from "../../actions/index";
import { filterText } from "../../helpers/return";
import * as Notifies from "../../components/Notifies/Notifies";
import Table from "../../components/Table/Index";
import UserManagerForm from "./UserManagerForm/UserManagerForm";
import SearchControl from "../../components/SearchControl/SearchControl";
import CSVDownload from "../../components/CSVDownload/CSVDownload";
import UserImage from "../../assets/img/userImage.png";

class UserManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {},
    };
  }
  componentDidMount = () => {
    this.props.actions.fetchUserManagerRequest();
  };

  onHandleTableChange = (pagination, filters, sorter, extra) => {
    // console.log(sorter.field);
    // console.log(filters, sorter)
    // const pager = { ...this.state.pagination };
    // pager.current = pagination.current;
    // this.setState({
    //   pagination: pager,
    //   // extrassss: extra.currentDataSource
    // });
    this.fetchUser({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      extra: extra.currentDataSource,
      ...filters,
    });
  };

  fetchUser = (params = {}) => {
    // const { extra } = params;
    // var {userList} = this.props;
    // console.log(params);
    this.props.actions.fetchUserManagerRequest({ ...params });
    // const pagination = { ...this.state.pagination };
    // pagination.total = extra.length;

    // this.setState({
    //   pagination
    // });
  };

  onHandleOpenModal = (type, userUID) => {
    const {
      openModal,
      isAddModal,
      getUserByIdUserManager,
    } = this.props.actions;
    openModal(true);
    if (type === "add") {
      isAddModal(true);
      getUserByIdUserManager("");
    } else {
      isAddModal(false);
      getUserByIdUserManager(userUID);
    }
  };

  deleteUserAPI = () => {
    const { oneUser } = this.props;
    this.props.actions.deleteUserManagerRequest(oneUser);
  };

  onHandleOpenDeleteBox = (id) => {
  //   admin.auth().deleteUser()
  // .then(function() {
  //   console.log('Successfully deleted user');
  // })
  // .catch(function(error) {
  //   console.log('Error deleting user:', error);
  // });
    
    // this.props.actions.fetchOneUserManagerRequest(id);
    // Notifies.deleteSuccess(this.deleteUserAPI);
  };

  render() {
    var { searchText, userById } = this.props;
    var { userList } = this.props.stateOfUserManagerReducer;
    const suggestionValue = userList; 
    const actionsColumns = (userUID) => (
      <Row>
        <Tooltip placement="top" title="Sửa">
          <Button
            style={{ marginRight: "1rem" }}
            icon="edit"
            type="default"
            onClick={() => this.onHandleOpenModal("edit", userUID)}
          ></Button>
        </Tooltip>
        <Tooltip placement="top" title="Xóa">
          <Button
            icon="delete"
            type="danger"
            onClick={() => this.onHandleOpenDeleteBox(userUID)}
          ></Button>
        </Tooltip>
      </Row>
    );

    const columns = [
      {
        title: "Avatar",
        dataIndex: "userInfo",
        key: "avatarURL",
        align: "center",
        width: 100,
        render: (userInfo) => {
          return <img className="avatar-user-table" alt="..." src={userInfo.avatarURL ? userInfo.avatarURL : UserImage} />;
        },
      },
      {
        title: "Tên",
        dataIndex: "userInfo",
        key: "name",
        render: (userInfo) => {
          return <span className="text-primary text-capitalize">{userInfo.name ? userInfo.name : "Chưa có"}</span>;
        },
        sorter: (a, b) => {
            return a. userInfo.name.toLowerCase().localeCompare(b.userInfo.name.toLowerCase());
        },
      },
      {
        title: "Email",
        dataIndex: "userInfo.email",
        key: "email",
        width: 250, 
        sorter: (a, b) => {
          if(a.userInfo.email && b.userInfo.email)
          return a.userInfo.email.toLowerCase().localeCompare(b.userInfo.email.toLowerCase());
        },
      },
      {
        title: "Vị trí",
        dataIndex: "userInfo",
        key: "position",
        render: (userInfo) => {
          return (
              userInfo.position ? 
                <span className="text-capitalize">{userInfo.position}</span>
              : <span className="text-warning">Chưa có</span>
            
          );
        },
        sorter: (a, b) => {
          if(a.userInfo.position && b.userInfo.position) 
          return a.userInfo.position.toLowerCase().localeCompare(b.userInfo.position.toLowerCase());
        },
      },
      {
        title: "Chuyên môn",
        dataIndex: "userInfo",
        key: "major",
        render: (userInfo) => {
          return (
                userInfo.major ? 
                <span className="text-capitalize">{userInfo.major}</span>
              : <span className="text-warning">Chưa có</span>
          )
        },
        sorter: (a, b) => {
          if(a.userInfo.major && b.userInfo.major)
          return a.userInfo.major.toLowerCase().localeCompare(b.userInfo.major.toLowerCase());
        },
      },
      {
        title: "Số dt",
        dataIndex: "userInfo",
        key: "phone",
        render: (userInfo) => {
            return userInfo.phone ?
                    <span className="text-capitalize">{userInfo.phone}</span>
                  : <span className="text-warning">Chưa có</span>
        },
        sorter: (a, b) => {
          if(a.userInfo.phone && b.userInfo.phone)
          return a.userInfo.phone - b.userInfo.phone;
        },
      },
      {
        title: "Vai trò",
        dataIndex: "userRole",
        key: "role",  
        render: (userRole) => {
          return (
              userRole.role === "admin" ? 
                <span className="text-capitalize">Quản trị viên</span>
              : <span className="text-capitalize">Người dùng</span>
          )
        },
        // sorter: (a, b) => {
        //   if(a.userInfo.level && a.userInfo.level)
        //   return a.userInfo.level.toLowerCase().localeCompare(b.userInfo.level.toLowerCase());
        // },
      },
      {
        title: "Tình trạng",
        dataIndex: "userInfo",
        key: "status",  
        render: (userInfo) => {
          return (
                  userInfo.status ? 
                <Tag color="lime" className="text-capitalize">Đang Hoạt động</Tag>
              : <Tag color="cyan" className="text-warning">Tạm nghỉ</Tag>
          )
        },
        // sorter: (a, b) => {
        //   if(a.userInfo.level && a.userInfo.level)
        //   return a.userInfo.level.toLowerCase().localeCompare(b.userInfo.level.toLowerCase());
        // },
      },
      {
        title: "Tác vụ",
        dataIndex: "userUID",
        render: (userUID) => {
          return (
            actionsColumns(userUID)
          );
        },
      },
    ];

    if (searchText) {
      userList = userList.filter((item) => {
        const data =
          filterText(item.name)
            .toLowerCase()
            .trim()
            // .replace(/\s+/g, "")
            .includes(searchText.toLowerCase()) ||
          filterText(item.email)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "")
            .includes(searchText.toLowerCase()) ||
          filterText(item.position)
            .toLowerCase()
            .trim()
            // .replace(/\s+/g, "")
            .includes(searchText.toLowerCase()) ||
          filterText(item.level)
            .toLowerCase()
            .trim()
            .includes(searchText.toLowerCase()) ||
          filterText(item.major)
            .toLowerCase()
            .trim()
            .includes(searchText.toLowerCase()) ||
          filterText(item.phone)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "")
            .includes(searchText.toLowerCase());
        return data;
      });
    }
    return (
      <Fragment>
        <Row gutter={[0, { xs: 32, sm: 32, md: 32, xl: 32 }]}>
          <Col xs={24} sm={24} md={16} lg={8} xl={10}>
            <SearchControl 
              searchUser={this.props.actions.searchUserManager} 
              suggestionValue={suggestionValue}
            />
          </Col>
          <Col xs={24} sm={24} md={16} lg={8} xl={14}>
            <Row type="flex" justify="end">
              {/*<Button
                className="user-manager_button"
                icon="user"
                type="primary"
                onClick={() => this.onHandleOpenModal("add")}
              >
                Thêm mới
              </Button>*/}
              <CSVDownload userList={userList} />
            </Row>
          </Col>
        </Row>
        <Table
          style={{height: "800px"}}
          columns={columns}
          dataSource={userList}
          onChange={this.onHandleTableChange}
          loading={this.props.isLoading}
          pagination={{ total: userList.length }}
        />
        <UserManagerForm userById={userById} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.userManagerReducer.isLoading,
    searchText: state.userManagerReducer.searchText,
    userById: state.userManagerReducer.userById,
    sortArray: state.userManagerReducer.sortArray,
    stateOfUserManagerReducer: state.userManagerReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      { ...UserManagerActions, ...ModalPopupActions },
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "simple",
  })(UserManager)
);
