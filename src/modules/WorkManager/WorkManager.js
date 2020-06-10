import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Col, Row, Button, Spin, Skeleton, Icon, Tag, Empty, Tooltip, Progress  } from "antd";
import { bindActionCreators } from "redux";
import { WorkManagerActions, ModalPopupActions } from "../../actions/index";
import { filterText } from "../../helpers/return";
import moment from "moment";
import SearchControl from "../../components/SearchControl/SearchControl";
import Pagination from "../../components/Pagination/Pagination";
import WorkManagerForm from "./WorkManagerForm/WorkManagerForm";
import Swal from "sweetalert2";
class WorkManager extends Component {

  constructor(props){
    super(props)
    this.state = {
      startIndex: 0,
      endIndex: 2,
      currentPage: 1,
      totalPages: 1
     }
  }
  componentDidMount = () => {
    this.props.actions.fetchUserWorkManagerRequest();
    window.$('[data-toggle="tooltip"]').tooltip();
  };

  componentDidUpdate() {
    window.$('[data-toggle="tooltip"]').tooltip();
  }


  handleOpenModalPopup = (e, type, userById, taskById) => { 
    e.preventDefault();   
    const {openModal, addModal, editModal, getUserByIdWorkManager, getTaskByIdWorkManager} = this.props.actions;
    openModal(true);
    if(type === "add"){
      addModal(true);
      getUserByIdWorkManager(userById);
    }else {
      editModal(false);      
      getTaskByIdWorkManager(taskById);
      getUserByIdWorkManager(userById);
    }
  }
  
  hanleDeleteAllTaskWorkManager = (userId) => {
    return Swal.fire({
      title: 'Bạn có chắc chắn xóa tất cả các công việc hiện có?',
      text: "Không thể khôi phục lại khi xóa",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa luôn',
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        this.props.actions.deleteAllTaskWorkManagerRequest(userId);
        Swal.fire(
          'Xóa thành công',
          'Success'
        )
      }
    })
  }

  handleDeleteOneTaskWorkManager = (e, userId , taskId) => {
    e.preventDefault();
    const body = { userId, taskId };
    return Swal.fire({
      title: 'Bạn có chắc chắn xóa ?',
      text: "Không thể khôi phục lại khi xóa",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa luôn',
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        this.props.actions.deleteOneTaskWorkManagerRequest(body);
        Swal.fire(
          'Xóa thành công',
          'Success'
        )
      }
    })
  }

  renderUser = (userList) => {
    var result = [];
    if (userList) {
      result = userList.map((item, index) => {
        return (
          <div className="list-group-item px-0" key={index}>
            <div className="item-avatar ">
              <img alt="Avatar" src={item.avatarURL} />
            </div>
            <div className="item-info">
              <h5>{item.name}</h5>
              <p>{item.email}</p>
            </div>
            <div className="item-status">
              <span>
                <Tag color="magenta">{item.task ? `Tổng: ${item.task.length} công việc` : "Chưa có"}</Tag>
              </span>
            </div>
            <div className="item-actions ml-xl-3">
                <Button type="default" onClick={(e) => this.handleOpenModalPopup(e, "add", item)}>
                  Thêm mới 
                  <Icon type="plus" />
                </Button>
            </div>
          </div>
        );
      });
    }
    return result;
  };
  
  renderTask = (userList) => {
    var result = [];
    if(userList){
      result = userList.map((item, index) => {
        if(item.task){ 
            const {numberOfTaskComplete, numberOfTaskInProgress, numberOfTaskSuspended } = this.renderNumberOfTaskStatus(item.task);
            return (
              <div className="item-wrapper mb-sm-5 mb-lg-4" key={index}>
                <div className="d-flex p-3">
                  <div className="mr-3">
                    <img src={item.avatarURL} className="d-block rounded-circle" alt="Avatar" width="45px" height="45px"/>
                  </div>
                  <div className="d-flex flex-column w-100">
                    {/*Thông tin user*/}
                    <div className="item-main-info row">
                        <div className="main-info-left col-xs-6 col-lg-6 col-md-12 col-sm-12">
                          <div className="mb-2">
                            <strong> {item.name}</strong> - 
                            <span className="text-primary"> {item.major}</span>  
                          </div>  
                          <div className="mb-2">
                            <span className="font-weight-bold">Liên lạc:</span>  
                            <span className="ml-2">{item.phone}</span>
                          </div>
                          <div className="mb-0">
                              <span className="font-weight-bold">Còn lại: 
                                <span className="text-primary ml-2">
                                  {numberOfTaskInProgress.length}
                                </span>
                              </span>
                              <span className="mx-2">|</span>
                              <span className="font-weight-bold">Đã hoàn thành:
                                <span className="text-danger ml-2">
                                    {numberOfTaskComplete.length}
                                </span>
                              </span>
                          </div>
                        </div>
                        <div className="main-info-right col-xs-6 col-lg-6 col-md-12 col-sm-12 mt-lg-0 mt-sm-3">
                          <div className="mb-2">
                            <span className="font-weight-bold">Trình độ:</span> 
                            <span className="text-capitalize ml-2">{item.level}</span>
                          </div>
                          <div className="mb-2">
                            <span className="font-weight-bold">Chức vụ:</span>
                            <span className="ml-2">{item.position}</span> 
                          </div>
                          <div className="mb-0">
                            <span className="text-info">{item.email}</span>
                          </div>
                        </div>
                    </div>
                    {/*Thông tin user*/}
                    {/*Thanh tiến trình*/}
                    <div className="item-progress-bar w-100 mt-3">
                      <Tooltip placement="topRight"  
                        title={() => (
                          <Fragment>
                            <p className="mb-0">Tất cả:<span className="text-info ml-2">{item.task.length}</span></p>
                            <p className="mb-0">Đang:<span className="text-info ml-2">{numberOfTaskInProgress.length}</span></p>
                            <p className="mb-0">Hoàn thành:<span className="text-info ml-2">{numberOfTaskComplete.length}</span></p>
                            <p className="mb-0">Tạm gián đoạn:<span className="text-info ml-2">{numberOfTaskSuspended.length}</span></p>
                          </Fragment>
                        )}
                      >
                        <Progress 
                          status={numberOfTaskSuspended.length ? "exception" : (parseInt((numberOfTaskComplete.length/item.task.length)*100) === 100 ? "success" : "active") }
                          percent={
                            parseInt((numberOfTaskComplete.length/item.task.length)*100)
                          }
                        />               
                      </Tooltip>
                    </div>
                    {/*Thanh tiến trình*/}
                    {/*task*/}
                    <div className="card-wrapper border mt-3">
                        <div className="card-header d-flex justify-content-between">
                            <a className="collapsed" data-toggle="collapse" href="#collapse-wrapper">{item.task.length ? "Xem công việc" : "Chưa có công việc nào"}</a>
                            <a data-toggle="collapse" className="collapsed btn btn-default btn-xs text-right" href={`#collapse-wrapper-${item.id}`}>
                              <i className="collapsed-icon fa"></i>
                            </a>
                        </div>
                        <div id={`collapse-wrapper-${item.id}`} className="collapse">
                          <div className="list-group">
                            {/*Create task*/}
                            {item.task.map((task, index) => {
                              const {fontIcon , color} = this.renderStyleOfTaskStatus(task);
                              return (
                                <div className="list-group-item collapse-item-border px-3" key={task.taskId}>
                                    <div className="d-flex justify-content-between">
                                        <a className="d-flex text-dark " data-toggle="collapse" href={`#collapse-item-${task.taskId}`}>
                                          <i className="fa fa-pencil-square-o mt-1 mr-2"></i>
                                          <p className="mb-0 pr-3 text-break" style={{marginTop: "-2px"}}>{task.name} <span style={{marginTop: "-2px"}} className="font-weight-bold font-size-14">({task.status})</span></p>
                                        </a>
                                      <div className="d-flex"> 
                                        <Tooltip placement="top" title={"Sửa"}>
                                          <a href="/#" onClick={(e) => this.handleOpenModalPopup(e, "edit", item, task)}>
                                            <i className="fa fa-pencil-square text-dark" ></i>
                                          </a>
                                        </Tooltip>
                                        <Tooltip placement="top" title={"Xóa"}>
                                          <a href="/#" onClick={(e) => this.handleDeleteOneTaskWorkManager(e, item.id , task.taskId)}>
                                            <i className="fa fa-trash text-dark" ></i>                              
                                          </a>
                                        </Tooltip>
                                        <Tooltip placement="top" title={"Chi tiết"}>
                                          <a  data-toggle="collapse" className="collapsed" href={`#collapse-item-${task.taskId}`}>
                                              <i className="collapsed collapsed-icon fa text-dark" aria-hidden="true"></i>
                                          </a>
                                        </Tooltip>
                                      </div>
                                    </div>
                                    <div id={`collapse-item-${task.taskId}`} className="collapse">
                                      <div className="d-flex flex-column pl-3">
                                        <div className="mt-1 " data-toggle="tooltip" data-placement="left" title="Deadline">
                                          <i className="fa fa-clock-o mr-2"></i> 
                                          Bắt đầu  <span className="font-weight-bold text-primary"> {moment(task.startDate).format("h:mm A, DD/MM/YYYY")} </span>
                                          <span className="mx-2">|</span> 
                                          Hạn chót <span className="font-weight-bold text-danger"> {moment(task.endDate).format("h:mm A, DD/MM/YYYY")} </span>
                                          (Còn {moment(task.endDate).diff(task.startDate,'day')} ngày)
                                        </div>
                                        <div  className="mt-1 " data-toggle="tooltip" data-placement="left" title="Tình trạng">
                                          <i className={`fa ${fontIcon} mr-2`} ></i> 
                                          <Tag color={color}>{task.status}</Tag>
                                        </div>
                                        <div  className="mt-1 " data-toggle="tooltip" data-placement="left" title="Thời gian tạo">
                                          <i className={`fa fa-calendar mr-2`} ></i>
                                          <div className="d-inline">
                                            <span>Tạo lúc: <span className="text-primary">{task.createDate ? moment(task.createDate).format("h:mm:ss, DD/MM/YYYY") : ""}</span></span>
                                            <span className="mx-2">|</span>
                                            <span>Cập nhật lần cuối: <span className="text-danger">{task.updateDate ? moment(task.updateDate).format("h:mm:ss, DD/MM/YYYY") : ""}</span></span>
                                            <span></span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                      {/*task*/}
                    <div className="info-actions mt-3">
                        <Button type="danger" onClick={() => this.hanleDeleteAllTaskWorkManager(item.id)} block>
                          Xóa toàn bộ
                          <Icon type="delete" />
                        </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
      } 
        else {
          return null
        }
      })
    }
    // xử lý nếu ko có task nào thì hiển thị thông báo chưa có công việc
    // Hàm every check toàn bộ item xem có pass được điều kiện ko, trả về boolean 
    const isEmptyTask = result.every((x) =>  !x);
    if(isEmptyTask){
        return result = <h4 className="text-center">Chưa có công việc nào được giao</h4>;
    }
    else{
      return result;
    }
  }

  renderStyleOfTaskStatus = (task) => {
    if(task.status){
      switch (task.status) {
        case "Bắt đầu":
          return {
            fontIcon: "fa-hourglass-start",
            color: "#108ee9"
          }
        case "Trong tiến trình":
          return {
            fontIcon: "fa-hourglass-half",
            color: "#2db7f5"
          }
        case "Hoàn thành":
          return {
            fontIcon: "fa-check",
            color: "#87d068"
          }
        case "Tạm gián đoạn":
          return {
            fontIcon: "fa-times",
            color: "#f50"
          }
        default:
          return "";
      }
    }
  }

  renderNumberOfTaskStatus = (task) => {
    const numberOfTaskComplete = [],
          numberOfTaskInProgress = [],
          numberOfTaskSuspended = []; 
    task.filter((task) => {
        if(task.status === "Hoàn thành"){
          numberOfTaskComplete.push(task)
        }
        else if(task.status === "Tạm gián đoạn"){
          numberOfTaskSuspended.push(task)
          numberOfTaskInProgress.push(task)
        }
        else if(task.status === "Bắt đầu" || task.status === "Trong tiến trình"){
          numberOfTaskInProgress.push(task)
        }
        else{
          return null;
        }
    })
    return {
      numberOfTaskComplete,
      numberOfTaskInProgress,
      numberOfTaskSuspended
    }
  }

  renderSkeleton = () => {
    return (
      <Fragment>
        <Skeleton active avatar>
        </Skeleton>
        <Skeleton active avatar>
        </Skeleton>
        <Skeleton active avatar>
        </Skeleton>
      </Fragment>
    )
  }

  onChangePage = (data) => {
    this.setState({
			startIndex: data.startIndex,
      endIndex: data.endIndex,
      currentPage: data.currentPage,
      totalPages: data.totalPages
		});
  }

  render() {
    console.log("Work manager");
    var { userList, searchText, isLoading , userById, taskById} = this.props;
    var {startIndex, endIndex, currentPage, totalPages} = this.state;
    const suggestionValue = userList;
    if (searchText) {
      userList = userList.filter((item) => {
        const data =
          filterText(item.name)
            .toLowerCase()
            .trim()
            .includes(searchText.toLowerCase()) ||
          filterText(item.email)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "")
            .includes(searchText.toLowerCase()) || 
            filterText(item.position)
            .toLowerCase()
            .trim()
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

    var taskList = [];
    var renderTaskList = [];
    if(userList.length > 0){
      taskList = userList.filter((user) => {
        return user.task // trả về user có tồn tại task
      })
    }

    renderTaskList = taskList.slice(startIndex, endIndex + 1)
    
    return (
      <Fragment>
        <Row gutter={[0, { xs: 32, sm: 32, md: 32, xl: 32 }]}>
          <Col xs={24} sm={24} md={16} lg={8} xl={10}>
            <SearchControl
              searchUser={this.props.actions.searchUserWorkManager}
              suggestionValue={suggestionValue}
            />
          </Col>
          <Col xs={24} sm={24} md={16} lg={8} xl={14}>
              <div className="row">
                  <div className="col-12 ">
                      <p className="text-right mx-lg-3 mx-sm-0 mb-0 font-size-14">Có {taskList.length} bảng | Trang {currentPage}/{totalPages}</p>
                  </div>
              </div>
          </Col>
        </Row>
        <div className="row job-wrapper">
          <div className="col-xs-6 col-lg-6 col-md-12 col-sm-12" style={{borderRight: "1px solid #ccc"}}>
            <Spin className="d-flex justify-content-center" tip="Xin vui lòng đợi..." spinning={isLoading}>
              <div className="list-group list-overflow list-group-flush">
                  {isLoading ? <Empty style={{marginTop: "150px"}} image={Empty.PRESENTED_IMAGE_SIMPLE} /> : this.renderUser(userList)}
              </div>
            </Spin>
          </div>
          <div className="col-xs-6 col-lg-6 col-md-12 col-sm-12 job-item mb-0 mt-lg-0 mt-sm-5">
              {isLoading ? this.renderSkeleton() : this.renderTask(renderTaskList)}
          </div>
          <div className="mt-3 ml-auto">
            <Pagination 
              totalItem={taskList.length || 0} 
              onChangePage={this.onChangePage} 
            />
          </div>
        </div>
        <WorkManagerForm isLoading={isLoading} userById={userById} taskById={taskById} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.workManagerReducer.userList,
    searchText: state.workManagerReducer.searchText,
    isLoading: state.workManagerReducer.isLoading,
    userById: state.workManagerReducer.userById,
    taskById: state.workManagerReducer.taskById,
    oneUser: state.workManagerReducer.oneUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ ...WorkManagerActions, ...ModalPopupActions }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkManager);
