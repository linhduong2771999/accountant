import React, { Component, Fragment } from "react";
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import { UserListActions } from "../../actions/index";
import { filterText } from "../../helpers/return";
import {Row, Col, Button, Tooltip} from "antd";
import SearchControl from "../../components/SearchControl/SearchControl";
import CSVDownload from "../../components/CSVDownload/CSVDownload";
import UserImage from "../../assets/img/userImage.png";
import Table from "../../components/Table/Index";
class UserList extends Component {
  componentDidMount = () => {
    this.props.actions.fetchUserListRequest();
  }

  onHandleTableChange = (pagination, filters, sorter, extra) => {
    // const pager = { ...this.state.pagination };
    // pager.current = pagination.current;
    // this.setState({
    //   pagination: pager,
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
    // console.log(params);
    this.props.actions.fetchUserListRequest({ ...params });
    // const pagination = { ...this.state.pagination };
    // pagination.total = extra.length;
    // this.setState({
    //   pagination,
    // });
  };

  render() {
    var { userList, searchText } = this.props;
    const suggestionValue = userList;
    const actionsColumns = (id) => (
      <Row>
        <Tooltip placement="top" title="Chi tiết">
          <Button
            icon="info-circle"
            type="default"
          ></Button>
        </Tooltip>
      </Row>
    );
    
    const columns = [
      {
        title: "Avatar",
        dataIndex: "avatarURL",
        width: 100,
        render: (avatarURL) => {
          return <img className="avatar-user-table" alt="..." src={avatarURL ? avatarURL : UserImage} />;
        },
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
        render: (level) => {
          return <span style={{textTransform: "capitalize"}}>{level}</span>
        },
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
        width:250, 
        sorter: (a, b) => {
          return a.email.toLowerCase().localeCompare(b.email.toLowerCase());
        },
      },
      {
        title: "Chi tiết",
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
          filterText(item.level)
            .toLowerCase()
            .trim()
            .includes(this.props.searchText.toLowerCase()) ||
          filterText(item.major)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "")
            .includes(this.props.searchText.toLowerCase().replace(/\s+/g, "")) ||
          filterText(item.phone)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "")
            .includes(this.props.searchText.toLowerCase());
        return data;
      });
    }

    return (
      <Fragment>
        <Row gutter={[0, { xs: 32, sm: 32, md: 32, xl: 32 }]}>
          <Col xs={24} sm={24} md={16} lg={8} xl={10}>
            <SearchControl
              searchUser={this.props.actions.searchUserList}
              suggestionValue={suggestionValue}
            />
          </Col>
          <Col xs={24} sm={24} md={16} lg={8} xl={14}>
            <Row type="flex" justify="end">
              <CSVDownload 
              userList={userList}
              />
            </Row>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={userList}
          onChange={this.onHandleTableChange}
          loading={this.props.isLoading}
          pagination={{total: userList.length}}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.userListReducer.userList,
    isLoading: state.userListReducer.isLoading,
    searchText: state.userListReducer.searchText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      { ...UserListActions },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);