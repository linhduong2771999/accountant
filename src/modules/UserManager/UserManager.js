import React, { Component, Fragment } from "react";
import { Row, Col, Button, Tooltip } from "antd";
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

  onHandleOpenModal = (type, id) => {
    const {
      openModal,
      addModal,
      getUserByIdUserManager,
    } = this.props.actions;
    openModal(true);
    if (type === "add") {
      addModal(true);
      getUserByIdUserManager("");
      // fetchOneUserManagerRequest("");
    } else {
      addModal(false);
      getUserByIdUserManager(id);
      // fetchOneUserManagerRequest(id);
    }
  };

  deleteUserAPI = () => {
    const { oneUser } = this.props;
    this.props.actions.deleteUserManagerRequest(oneUser);
  };

  onHandleOpenDeleteBox = (id) => {
    this.props.actions.fetchOneUserManagerRequest(id);
    Notifies.deleteSuccess(this.deleteUserAPI);
  };

  render() {
    var { userList, searchText, userById } = this.props;
    const suggestionValue = userList;
    const actionsColumns = (id) => (
      <Row>
        <Tooltip placement="top" title="Sửa">
          <Button
            style={{ marginRight: "1rem" }}
            icon="edit"
            type="default"
            onClick={() => this.onHandleOpenModal("edit", id)}
          ></Button>
        </Tooltip>
        <Tooltip placement="top" title="Xóa">
          <Button
            icon="delete"
            type="danger"
            onClick={() => this.onHandleOpenDeleteBox(id)}
          ></Button>
        </Tooltip>
      </Row>
    );

    const columns = [
      {
        title: "Avatar",
        align: "center",
        dataIndex: "avatarURL",
        render: (avatarURL) => {
          return (
            <img
              className="avatar-user-table"
              alt="..."
              src={avatarURL ? avatarURL : UserImage}
            />
          );
        },
        width: 100
      },
      {
        title: "Tên",
        dataIndex: "name",
        render: (name) => {
          return <span className="text-primary text-capitalize">{name}</span>;
        },
        sorter: (a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        },
      },
      {
        title: "Chức vụ",
        dataIndex: "position",
        render: (position) => {
          return (
            <span style={{ textTransform: "capitalize" }}>{position}</span>
          );
        },
        sorter: (a, b) => {
          return a.position
            .toLowerCase()
            .localeCompare(b.position.toLowerCase());
        },
      },
      {
        title: "Trình độ",
        dataIndex: "level",
        render: (level) => (
          <span style={{ textTransform: "capitalize" }}>{level}</span>
        ),
        sorter: (a, b) => {
          return a.level.toLowerCase().localeCompare(b.level.toLowerCase());
        },
      },
      {
        title: "Chuyên môn",
        dataIndex: "major",
        sorter: (a, b) => {
          return a.major.toLowerCase().localeCompare(b.major.toLowerCase());
        },
      },
      {
        title: "Số dt",
        dataIndex: "phone",
        sorter: (a, b) => {
          return a.phone - b.phone;
        },
      },
      {
        title: "Email",
        dataIndex: "email",
        width: 250,
        sorter: (a, b) => {
          return a.email.toLowerCase().localeCompare(b.email.toLowerCase());
        },
      },
      {
        title: "Xử lý tác vụ",
        dataIndex: "id",
        render: (id) => {
          return actionsColumns(id);
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
              <Button
                className="user-manager_button"
                icon="user"
                type="primary"
                onClick={() => this.onHandleOpenModal("add")}
              >
                Thêm mới
              </Button>
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
    userList: state.userManagerReducer.userList,
    isLoading: state.userManagerReducer.isLoading,
    searchText: state.userManagerReducer.searchText,
    userById: state.userManagerReducer.userById,
    sortArray: state.userManagerReducer.sortArray,
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
