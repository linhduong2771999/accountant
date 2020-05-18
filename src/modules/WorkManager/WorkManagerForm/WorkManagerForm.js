import React, { Component, Fragment } from "react";
import { Modal, Button, Spin, Input, Select } from "antd";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import { ModalPopupActions, WorkManagerActions } from "../../../actions/index";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "../../../components/DatePicker/DatePicker";
import * as Notifies from "../../../components/Notifies/Notifies";

const {Option} = Select;
class WorkManagerForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            taskInfo: {
                taskId: "",
                name: "",
                status: "",
                startDate: "",
                endDate: "",
                createDate: ""
            },
            validateRequired: true
        }
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {       
        if(!nextProps.isAddUser &&  nextProps.taskById.taskId !== prevState.taskInfo.taskId ){                 
            return {
                taskInfo: {
                    taskId: nextProps.taskById.taskId,
                    name: nextProps.taskById.name,
                    status: nextProps.taskById.status,
                    startDate: nextProps.taskById.startDate,
                    endDate: nextProps.taskById.endDate,
                    createDate:  nextProps.taskById.createDate
                }
            }
        }
        else if(nextProps.isAddUser && nextProps.taskById.taskId === prevState.taskInfo.taskId){                       
            return {
                taskInfo: {
                    taskId: "",
                    name: "",               
                    status: "",
                    startDate: "",
                    endDate: ""
                }
            }
        }
        return null
    }

    hanldeCancelModalPopup = () => {
        this.props.actions.hideModal(false);
    }

    handleSubmit = (e) => {
        const {taskInfo} = this.state;
        e.preventDefault();
        if(this.state.taskInfo.taskId){
            this.updateTaskWorkManagerAPI(taskInfo)            
        }
        else {
            this.createTaskWorkManagerAPI(taskInfo);            
        }
        // this.props.actions.hideModal(false); // ẩn modal sau khi submit form
    }

    createTaskWorkManagerAPI = (taskInfo) => {
        const taskId = uuidv4();
        const createDate = new Date();
        const body = {
            taskInfo: {
                taskId: taskId, 
                name: taskInfo.name,
                status: taskInfo.status,
                startDate: taskInfo.startDate,
                endDate: taskInfo.endDate,
                createDate: Number(createDate) // lấy ngày tạo task
            },
            id: this.props.userById.id,
            callBack: () => {
                return Notifies.createSuccess();
            },
            fallback: () => {
                return Notifies.errorMessege();
            }
        }
        this.props.actions.createTaskWorkManagerRequest(body); 
    }

    updateTaskWorkManagerAPI = (taskInfo) => {
        const updateDate = new Date();
        const body = {
            taskInfo: {
                taskId: taskInfo.taskId,  // giữ nguyên id và ngày tạo 
                name: taskInfo.name,
                status: taskInfo.status,
                startDate: taskInfo.startDate,
                endDate: taskInfo.endDate,
                createDate: taskInfo.createDate, // giữ nguyên id và ngày tạo 
                updateDate: Number(updateDate) // cập nhật ngày sửa
            },
            id: this.props.userById.id,
            callBack: () => {
                return Notifies.updateSuccess();
            },
            fallBack: () => {
                return Notifies.errorMessege();
            }
        }
        this.props.actions.updateTaskWorkManagerRequest(body); 
    }

    handleOnchange = (e) => {
        const {name, value} = e.target;
        this.setState({
            taskInfo: {
                ...this.state.taskInfo,
                [name]: value,
            },
        }, () => {
            this.validateRequired(this.state.taskInfo)
        }) 
    }

    handleOnChangeSelect = (value) => {        
        this.setState({ 
            taskInfo: {
                ...this.state.taskInfo,
                status: value 
            }
        }, () => {
            this.validateRequired(this.state.taskInfo);    
        });
    }

    setStartDate = (date) => {
        this.setState({
            taskInfo: {
                ...this.state.taskInfo,
                startDate: date
            }
        })
    }


    setEndDate = (date) => {
        this.setState({
            taskInfo: {
                ...this.state.taskInfo,
                endDate: date
            }
        })
    }

    validateRequired = (taskInfo) => {
        if(taskInfo.name !== "" && taskInfo.status !== "" && taskInfo.startDate !== "" && taskInfo.endDate !== ""){
            this.setState({
                validateRequired: false
            })
        }
        else {
            this.setState({
                validateRequired: true
            })
        }
    }

    render() {
        const {isOpenModal, isAddUser, isLoading, userById} = this.props;
        const { validateRequired, taskInfo} = this.state;
        return (
        <Modal
            title={
                isAddUser ? 
                <h3 className="text-white mb-0">Thêm mới công việc</h3>
                : 
                <h3 className="text-white mb-0">Sửa công việc</h3>
            }
            visible={isOpenModal}
            closable={false}
            width={700}
            onCancel={this.hanldeCancelModalPopup}
            footer={[
            <Fragment key="1">
                <Button type="default" onClick={this.hanldeCancelModalPopup}>
                Đóng
                </Button>
                <Button
                form="WorkManageForm"
                key="submit"
                htmlType="submit"
                type="primary"   
                disabled={validateRequired}             
                >
                    {isAddUser ? "Thêm" : "Sửa"}
                </Button>
            </Fragment>,
            ]}
        >
            <Spin spinning={isLoading}>
                <form onSubmit={this.handleSubmit}  id="WorkManageForm">
                    <div className="form-info row">
                        <div className="col-6 info-left">
                            <p className="mb-3 font-size-14"><strong>Tên: </strong>{userById.name}</p>
                            <p className="mb-3 font-size-14"><strong>Email: </strong>{userById.email}</p>
                            <p className="mb-3 font-size-14"><strong>Phone: </strong>{userById.phone}</p>
                        </div>  
                        <div className="col-6 info-right">
                            <p className="mb-3 font-size-14"><strong>Trình độ: </strong><span className="text-capitalize">{userById.level ? userById.level : "Chưa có"}</span></p>
                            <p className="mb-3 font-size-14"><strong>Chuyên môn: </strong>{userById.major ? userById.major : "Chưa có"}</p>
                            <p className="mb-3 font-size-14"><strong>Chức vụ: </strong>{userById.position}</p>
                        </div>
                    </div>
                    <hr />
                    <p className="text-center mb-0 ">Vui lòng điền đầy đủ tất cả thông tin</p>
                    <div className="form-input mt-3">
                        <div className="form-group row ">
                            <label className="col-2 text-right"><strong>Công việc*:</strong> </label>
                            <div className="col-10">
                                <Input 
                                    name="name"
                                    type="text"
                                    value={taskInfo.name} 
                                    placeholder="Tên công việc" 
                                    autoComplete="off"
                                    onChange={this.handleOnchange}
                                    onClick={this.handleOnchange}
                                />
                            </div>
                        </div>
                        <div className="form-group row ">
                            <label className="col-2 text-right"><strong>Bắt đầu*:</strong> </label>
                            <div className="col-4">
                                <DatePicker 
                                    selectInputType={"start"} 
                                    dateValue={taskInfo.startDate}
                                    setDate={(date) => this.setStartDate(date)}
                                />
                            </div>
                        </div>
                        <div className="form-group row ">
                            <label className="col-2 text-right"><strong>Kết thúc*:</strong> </label>
                            <div className="col-4">
                                <DatePicker 
                                    selectInputType={"end"} 
                                    dateValue={taskInfo.endDate}
                                    setDate={(date) => this.setEndDate(date)}
                                />
                            </div>
                        </div>
                        <div className="form-group row ">
                            <label className="col-2 text-right"><strong>Tình trạng*:</strong> </label>
                            <div className="col-4">
                                <Select   value={taskInfo.status}  onChange={(value) => this.handleOnChangeSelect(value)}>
                                    <Option value="" >Tình trạng công việc</Option>
                                    <Option value="Bắt đầu" >Bắt đầu</Option>
                                    <Option value="Trong tiến trình" >Trong tiến trình</Option>
                                    <Option value="Hoàn thành" >Hoàn thành</Option>
                                    <Option value="Tạm gián đoạn" >Tạm gián đoạn</Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                </form>
            </Spin>
        </Modal>
        );
  }
}

const mapStateToProps = (state) => {
    return {
        isOpenModal: state.modalPopupReducer.isOpenModal,
        isAddUser: state.modalPopupReducer.isAddUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {...ModalPopupActions, ...WorkManagerActions},
            dispatch
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkManagerForm);
