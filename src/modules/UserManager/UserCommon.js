import React, { Component, Fragment } from "react";
import { Row, Col, Button, Dropdown, Menu, Icon, Select, Tag, Popover } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { UserManagerActions, ModalPopupActions } from "../../actions/index";
import { createLoadingSelector } from "../../helpers/loadingSelector";
import * as Notifies from "../../components/Notifies/Notifies";
import SearchControl from "../../components/SearchControl/SearchControl";
import ExtraTable from "./components/DataTable/ExtraTable";
// import CSVDownload from "../../components/CSVDownload/CSVDownload";

class UserManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userToEdit: {},
      dropdownItemTitle: "Bảng chính"
    };
  }
  componentDidMount = () => {
    this.handleGetUsers();
  };

  handleGetUsers = async () => {
    const body = {
      page: 1,
      limit: 5,
      fallBack: (error) => Notifies.errorMessege(error.message, error.text, error.icon)
    }
    this.props.actions.getUser_from_UserManagerRequest(body);
  }


  handleTableChange = (pagination, filters, sorter, extra) => {
    try{
      const { searchText } = this.props.stateOfUserManager;
      const { current, pageSize } = pagination; // pagination from ant table
      const { order, field } = sorter;
      if (order === "ascend") {
        this.props.actions.getUser_from_UserManagerRequest({page: current, limit: pageSize, search: searchText, sort: `${field}`, fields: ""});
      } else if (order === "descend") {
        this.props.actions.getUser_from_UserManagerRequest({page: current, limit: pageSize, search: searchText, sort: `-${field}`, fields: ""});
      } else {
        this.props.actions.getUser_from_UserManagerRequest({page: current, limit: pageSize, search: searchText, sort: "", fields: ""});
      }
    } catch(error){
      Notifies.errorMessege("Thao tác không thành công", "Vui lòng thử lại trong chốc lát!", "error")
    }
  };

  handleSwitchTable = (title) => {
    try {
      const {pagination, searchText } = this.props.stateOfUserManager;
      this.setState({
        dropdownItemTitle: title
      })
      this.props.actions.getUser_from_UserManagerRequest({page: pagination.currentPage, limit: 5, search: searchText});
    } catch(error) {
      Notifies.errorMessege("Thao tác không thành công", "Vui lòng thử lại trong chốc lát!", "error")
    }
  }

  render() {
    const {
      pagination,
      usersList: { usersListTable, usersListSuggestionForm },
    } = this.props.stateOfUserManager;
    const { isOpen, popupName, popupProps } = this.props.stateOfModalPopup;
    const { loadingTable, loadingSuggestionForm } = this.props;

    return (
      <Fragment>
        <Row gutter={[0, { xs: 32, sm: 32, md: 32, xl: 32 }]}>
          <Col xs={24} sm={24} md={16} lg={8} xl={10}>
            <SearchControl
              limit={5}
              currentPage={pagination.currentPage}
              loading={loadingSuggestionForm}
              suggestionValue={usersListSuggestionForm}
              search_from_UserManagerRequest={this.props.actions.search_from_UserManagerRequest}
              getUser_from_UserManagerRequest={this.props.actions.getUser_from_UserManagerRequest}
            />
          </Col>
          <Col xs={24} sm={24} md={16} lg={8} xl={14}>
            <Row type="flex" justify="end">
              {
                /*
                <CSVDownload userList={userList} />
               */
              }
            </Row>
          </Col>
        </Row>

        <ExtraTable 
            usersListTable={usersListTable}
            loadingTable={ loadingTable }
            pagination={pagination}
            handleTableChange={this.handleTableChange}
            history={this.props.history}
            displayExtraButton={false}
        />
      </Fragment>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    stateOfUserManager: state.userManagerReducer,
    stateOfModalPopup: state.modalPopupReducer,
    loadingTable: createLoadingSelector(['GET_USER_FROM_USER_MANAGER', 'UPDATE_USER_FROM_USER_MANAGER'])(state),
    loadingSuggestionForm: createLoadingSelector(['SEARCH_FROM_USER_MANAGER'])(state)
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
)(UserManager);