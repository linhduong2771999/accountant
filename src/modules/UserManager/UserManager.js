import React, { Component, Fragment } from "react";
import { Row, Col, Input, Button, Tooltip, Tag } from "antd";
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

const handleSearch = (confirm) => {
  confirm();
};

const handleReset = (clearFilters) => {
  clearFilters();
};
class UserManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {}
    };
  }
  componentDidMount = () => {
    this.props.actions.fetchUserManagerRequest();
  };

  onHandleTableChange = (pagination, filters, sorter, extra) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
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
    const { extra } = params;
    // console.log(params);
    this.props.actions.fetchUserManagerRequest({ ...params });
    const pagination = { ...this.state.pagination };
    pagination.total = extra.length;
    this.setState({
      pagination,
    });
  };

  onHandleOpenModal = (type, id) => {
    const {openModal,addModal, fetchOneUserManagerRequest } = this.props.actions;
    openModal(true);
    if (type === "add") {
      addModal(true);
      fetchOneUserManagerRequest("");
    } else {
      addModal(false);      
      fetchOneUserManagerRequest(id);
    }
  };

  deleteUserAPI = () => {
    const {oneUser} = this.props;
    this.props.actions.deleteUserManagerRequest(oneUser);
  }

  onHandleOpenDeleteBox = (id) => {
    this.props.actions.fetchOneUserManagerRequest(id);
    Notifies.deleteSuccess(this.deleteUserAPI);

  }
  render() {
    var { userList, searchText, oneUser } = this.props;
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
          <Button icon="delete" type="default" onClick={() => this.onHandleOpenDeleteBox(id)}></Button>
        </Tooltip>
      </Row>
    );

    const columns = [
      {
        title: "Avatar",
        dataIndex: "avatarURL",
        render: (avatarURL) => {
          return <img className="avatar-user-table" alt="..." src={avatarURL ? avatarURL : UserImage} />;
        },
        width: 100,
      },
      {
        title: "Tên",
        dataIndex: "name",
        render: (name) => {
          return <strong>{name}</strong>;
        },
        sorter: (a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        },
      },
      {
        title: "Email",
        dataIndex: "email",
        sorter: (a, b) => {
          return a.email.toLowerCase().localeCompare(b.email.toLowerCase());
        },
      },
      {
        title: "Chức vụ",
        dataIndex: "position",
        filters: [
          {
            text: "Sếp",
            value: "boss",
          },
          {
            text: "Nhận viên",
            value: "staff",
          },
          {
            text: "Kế toán",
            value: "accounting",
          },
        ],
        render: (position) => {
          return (
            <span style={{ textTransform: "capitalize" }}>{position}</span>
          );
        },
        onFilter: (value, item) => {
          return item.position.indexOf(value) !== -1;
        },
        // sorter: (a, b) => {
        //   return a.position
        //     .toLowerCase()
        //     .localeCompare(b.position.toLowerCase());
        // },
      },
      {
        title: "Tình trạng",
        dataIndex: "status",
        filters: [
          {
            text: "Hoàn thành",
            value: "done",
          },
          {
            text: "Trong tiến trình",
            value: "in progress",
          },
          {
            text: "Bắt đầu",
            value: "start",
          },
        ],
        onFilter: (value, item) => {
          return item.status.indexOf(value) !== -1;
        },
        render: (status) => {
          switch (status) {
            case "done":
              return <Tag color="red">XONG</Tag>;
            case "in progress":
              return <Tag color="green">TRONG TIẾN TRÌNH</Tag>;
            case "start":
              return <Tag color="geekblue">BẮT ĐẦU</Tag>;
            default:
              return null;
          }
        },  
        sorter: (a, b) => {
          return a.status.toLowerCase().localeCompare(b.status.toLowerCase());
        },
      },
      {
        title: "Công việc",
        dataIndex: "task",
        sorter: (a, b) => {
          return a.task.toLowerCase().localeCompare(b.task.toLowerCase());
        },
      },
      {
        title: "Số dt",
        dataIndex: "phone",
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Tìm kiếm `}
              value={selectedKeys[0]}
              onPressEnter={() => handleSearch(confirm)}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </div>
        ),
        sorter: (a, b) => {
          return a.phone - b.phone;
        },
        onFilter: (value, record) => {
          return record.phone.indexOf(value) !== -1;
        },
      },
      {
        title: "Xử lý",
        dataIndex: "id",
        render: (id) => {
          return (
            actionsColumns(id)
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
            .includes(this.props.searchText.toLowerCase()) ||
          filterText(item.email)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "")
            .includes(this.props.searchText.toLowerCase()) ||
          filterText(item.position)
            .toLowerCase()
            .trim()
            // .replace(/\s+/g, "")
            .includes(this.props.searchText.toLowerCase()) ||
          filterText(item.status)
            .toLowerCase()
            .trim()
            .includes(this.props.searchText.toLowerCase()) ||
          filterText(item.task)
            .toLowerCase()
            .trim()
            .includes(this.props.searchText.toLowerCase()) ||
          filterText(item.phone)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "")
            .includes(this.props.searchText.toLowerCase());
        // this.state.pagination.total = data.length;
        return data;
      });
    }
    return (
      <Fragment>
        <Row gutter={[0, { xs: 32, sm: 32, md: 32, xl: 32 }]}>
          <Col xs={24} sm={24} md={16} lg={8} xl={10}>
                <SearchControl searchUser={this.props.actions.searchUserManager}/>
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
              <CSVDownload userList={userList}/>
            </Row>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={userList}
          onChange={this.onHandleTableChange}
          loading={this.props.isLoading}
          pagination={this.state.pagination}
        />
        <UserManagerForm oneUser={oneUser} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.userManagerReducer.userList,
    isLoading: state.userManagerReducer.isLoading,
    searchText: state.userManagerReducer.searchText,
    oneUser: state.userManagerReducer.oneUser,
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

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: "simple"
})(UserManager));
