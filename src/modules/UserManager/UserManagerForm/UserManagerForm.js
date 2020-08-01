import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Modal, Button, Spin, Select , Input } from "antd";
import { bindActionCreators } from "redux";
import { ModalPopupActions } from "../../../actions/index";
import { UserManagerActions } from "../../../actions/index";
import * as Notifies from "../../../components/Notifies/Notifies";
import { validate } from "../../../helpers/Validate";

const { Option } = Select; 

const renderField = ({
  input,
  type,
  className,
  autoComplete,
  placeholder,
  meta: { touched, error, warning },
}) => (
  <Fragment>
    <Input className={className} placeholder={placeholder} autoComplete={autoComplete} {...input} type={type} />
    {touched &&
      ((error && <span className="text-validate">{error}</span>) ||
        (warning && <span className="text-validate">{warning}</span>))}
  </Fragment>
);

const renderSelectField = ({
  input,
  className,
  onChange,
  meta: { touched, error },
  children,
}) => (
  <Fragment>
    <Select getPopupContainer={trigger => trigger.parentNode} onChange={onChange} className={className} {...input}>
      {children}
    </Select>
    {touched && error && <span className="text-validate">{error}</span>}
  </Fragment>
);

const changeOptions = [
  {
    OptionType: "Quản lý",
    OptionValue: ["Quản lý dự án", "Quản lý nhân sự", "Quản lý tài chính"]
  },
  {
    OptionType: "IT",
    OptionValue: ["Frontend (Web)", "Backend (Web)", "Thiết kế đồ họa", "An ninh mạng", "Kỹ sư cơ sở dữ liệu", "Hỗ trợ máy tính"]
  },
  {
    OptionType: "Tài chính",
    OptionValue: ["Kế toán", "Marketing"]
  },
]
class UserManagerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // selectedImg: null,
      // imgInfo: null,
      // progress: 0,
      // isProgress: false,
      major: "",
      userUID: "", // dùng trong giai đoạn khởi tạo
      selectOptionType: "",
      validateMajor: false
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if(nextProps.userById && nextProps.userById.userUID !== prevState.userUID){
      return {
        userUID: nextProps.userById.userUID,
        selectOptionType: nextProps.userById.userInfo.position,
        major: nextProps.userById.userInfo.major
      }
    }

    return null
  }

  submitValue = (value) => {
    // this.setState({
    //   progress: 0,
    //   isProgress: true,
    // });
    this.updateUserManagerAPI(value);
    this.actionsAfterSubmit();
  };

  // handleChange = (info) => {
  //   this.setState({
  //     selectedImg: URL.createObjectURL(info.file.originFileObj),
  //     imgInfo: info.file.origin11FileObj,
  //   });
  // };

  // upload file to firebase storage
  // handleUpload = (value) => {
  //   var { imgInfo } = this.state;
  //   const { userById } = this.props;
  //   if (imgInfo === null) {
  //     if(userById.id){
  //       this.updateUserManagerAPI(userById.id, value, UserDefaultImage);
  //     }
  //     else{
  //       // this.createUserManagerAPI(value, UserDefaultImage); 
  //     }
  //     this.actionsAfterSubmit();
  //   } else {
  //     var storageRef = storage.ref();
  //     var uploadTask = storageRef.child("images/" + imgInfo.name).put(imgInfo);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //         var progress = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );
  //         this.setState({
  //           progress,
  //         });
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       () => {
  //         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //           if(userById.id){
  //             this.updateUserManagerAPI(userById.id, value, downloadURL);
  //           }
  //           else{
  //             // this.createUserManagerAPI(value, downloadURL);
  //           }
  //           this.actionsAfterSubmit();
  //         });
  //       }
  //     );
  //   }
  // };

  // createUserManagerAPI = (value, paramAvatar) => {
  //   const id = uuidv4();
  //   const { createUserManagerRequest } = this.props.actions;
  //   createUserManagerRequest({
  //     userInfo: {
  //       id: id,
  //       name: value.name || "",
  //       email: value.email || "",
  //       position: value.position || "",
  //       level: value.level || "",
  //       major: value.major || "",
  //       phone: value.phone || "",
  //       avatarURL: paramAvatar,
  //     },
  //     callback: () => {
  //       return Notifies.createSuccess();
  //     },
  //     fallback: () => {
  //       return Notifies.errorMessege();
  //     },
  //   });
  // }

  updateUserManagerAPI = (value) => {
    const { updateUserManagerRequest } = this.props.actions;
    const {userInfo, userRole, userUID} = value;    
    updateUserManagerRequest({
      userInfo: {
        name: userInfo.name || "",
        email: userInfo.email || "",
        position: userInfo.position || "",
        major: this.state.major || "",
        status: userInfo.status || "",
        phone: userInfo.phone || "",
      },
      userRole: {
        role: userRole.role || ""
      },
      userUID: userUID,
      callback: () => {
        return Notifies.updateSuccess();
      },
      fallback: () => {
        return Notifies.errorMessege();
      },
    });
  }

  actionsAfterSubmit = () => {
    // this.setState({
    //   isProgress: false,
    //   selectedImg: null,
    //   imgInfo: null
    // });
    this.props.actions.hideModal(false);
  }

  handleOk = (e) => {
    this.submitValue();
  };

  handleCancel = (e) => {
    this.props.actions.hideModal(false);
  };

  handleSelectPositionChange = (value) => {
    this.setState({
      selectOptionType: value,
      major: ""
    }, () => this.validateFieldMajor(this.state.major)) 
  }

  handleSelectMajorChange = (value) => {
    this.setState({
      major: value
    }, () => this.validateFieldMajor(this.state.major))
  }

  renderSelectFieldOptions = (selectOptionType) => {
    let result = null;
    result = changeOptions.map((item, index1) => {
      if(selectOptionType === item.OptionType){
        return <Select 
                  getPopupContainer={trigger => trigger.parentNode} 
                  key={index1} 
                  onChange={this.handleSelectMajorChange} 
                  defaultValue="Chuyên môn"  
                  value={this.state.major}
                >
                    {item.OptionValue.map((value, index2) => {
                      return <Option value={value} key={index2}>{value}</Option>
                    })}
              </Select>
      }
      else{
        return null
      }
    })
    return result
  }

  validateFieldMajor = (value) => {
    if(value === "") {
      this.setState({
        validateMajor: true
      })
    } else{ 
      this.setState({
        validateMajor: false
      })
    }
  }
  render() {
    const { handleSubmit, isOpenModal, isAddUser, isLoading, userById } = this.props;
    const { selectedImg, progress, isProgress } = this.state;
    return (
      <Modal
        title={
          isAddUser ? (
            <h3 className="modal-title">Thêm mới user</h3>
          ) : (
            <h3 className="modal-title">Sửa thông tin user</h3>
          )
        }
        visible={isOpenModal}
        closable={false}
        onCancel={this.handleCancel}
        style={{position: "relative"}}
        width="700px"
        footer={[
          <Fragment key="modal-footer">
            <Button type="default" onClick={this.handleCancel}>
              Đóng
            </Button>
            <Button
              disabled={isProgress}
              form="myForm"
              key="submit"
              htmlType="submit"
              type="primary"
            >
              {isAddUser ? "Thêm" : "Sửa"}
            </Button>
          </Fragment>,
        ]}
      >
      {
        isLoading ? <div className="spin-icon-form"><Spin /></div> : null
      }
        <form onSubmit={handleSubmit(this.submitValue)} id="myForm">
          <div className="row">
            <div className="col-12 mb-2">
              <div className="form-group row">
                <label
                  className="col-2 py-1 text-right control-label font-weight-bold"
                  htmlFor="name"
                >
                  Tên* :
                </label>
                <div className="col-10">
                  <Field
                    placeholder="Tên"
                    name="userInfo.name"
                    autoComplete="off"
                    type="text"
                    component={renderField}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="form-group row">
                <label
                  className="col-2 py-1 control-label text-right font-weight-bold"
                  htmlFor="position"
                >
                  Vị trí* :
                </label>
                <div className="col-4">
                  <Field
                    name="userInfo.position"
                    component={renderSelectField}
                    onChange={this.handleSelectPositionChange}
                  >
                    <Option value="">Vị trí</Option>
                    <Option value="Quản lý">Quản lý</Option>
                    <Option value="IT">IT</Option>
                    <Option value="Tài chính">Tài chính</Option>
                  </Field>
                </div>
                <label
                      className="col-2 py-1 control-label text-right font-weight-bold"
                      htmlFor="major"
                    >
                  Chính* :
                </label>
                <div   className="col-4">
                    { this.state.selectOptionType ? this.renderSelectFieldOptions(this.state.selectOptionType) : <Select defaultValue="Vui lòng chọn vị trí"></Select>}
                    {this.state.validateMajor ? <p className="text-danger font-size-14 mb-0">Chuyên môn bắt buộc</p> : null}
                </div>
              </div>
            </div>
            {/*<div className="col-12 mb-2">
              <div className="form-group row">
                <label
                  className="col-2 control-label text-right font-weight-bold"
                  htmlFor="level"
                >
                  Chuyên môn :
                </label>
                <div className="col-4">
                  <Field
                    name="level"
                    component={renderSelectField}
                  >
                    <Option value="">Trình độ</Option>
                    <Option value="internship">Internship</Option>
                    <Option value="fresher">Fresher</Option>
                    <Option value="junior">Junior</Option>
                    <Option value="middle">Middle</Option>
                    <Option value="senior">Senior</Option>
                    <Option value="master">Master</Option>
                  </Field>
                </div>
              </div>
            </div>*/}
            {/*<div className="col-12 mb-2">
              <div className="form-group row">
                <label
                  className="col-2 text-right control-label font-weight-bold"
                  htmlFor="major"
                >
                Chuyên môn :
                </label>
                <div className="col-10">
                  <Field
                    placeholder="Chuyên môn (Nhập rõ)"
                    name="major"
                    component={renderField}
                />
                </div>
              </div>
            </div>*/}
            <div className="col-12 mb-2">
              <div className="form-group row">
                <label
                  className="col-2 py-1 text-right control-label font-weight-bold"
                  htmlFor="role"
                >
                  Vai trò* :
                </label>
                <div className="col-4">
                  <Field
                      name="userRole.role"
                      component={renderSelectField}
                  >
                    <Option value="">Vai trò</Option>
                    <Option value="user">Người dùng</Option>
                    <Option value="admin">Quản trị viên</Option>
                  </Field>
                </div>
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="form-group row">
                <label
                  className="col-2 py-1 text-right control-label font-weight-bold"
                  htmlFor="role"
                >
                  Tình trạng* :
                </label>
                <div className="col-4">
                  <Field
                      name="userInfo.status"
                      component={renderSelectField}
                  > 
                    <Option value="">Chọn tình trạng</Option>
                    <Option value={0}>Tạm nghỉ</Option>
                    <Option value={1}>Đang hoạt động</Option>
                  </Field>
                </div>
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="form-group row">
                <label
                  className="col-2 py-1 text-right control-label font-weight-bold"
                  htmlFor="phone"
                >
                  Điện thoại* :
                </label>
                <div className="col-4">
                  <Field
                    placeholder="Số điện thoại"
                    name="userInfo.phone"
                    component={renderField}
                    type="number"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            {/*<div className="col-12 mb-2">
              <div className="form-group row">
                <label
                  className="col-2 text-right control-label font-weight-bold"
                  htmlFor="avatar"
                >
                  Ảnh :
                </label>
                <div className="col-10 upload-btn-wrapper">
                  <div className="col-4">
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      onChange={this.handleChange}
                    >
                      <img
                        alt="..."
                        className="btn-upload"
                        width="100%"
                        src={selectedImg ? selectedImg : UserDefaultImage}
                      />
                      <span>{isAddUser ? "Cập nhật ảnh" : "Cập nhật lại ảnh"}</span>
                    </Upload>
                  </div>
                </div>
              </div>
          </div>*/}
          </div>
        </form>
        {/*
        {isProgress ? (
          <div>
            <Progress percent={progress} className="progress-ant-custom" />
            <span>Đang xử lý vui lòng đợi...</span>
          </div>
        ) : (
          ""
        )} */}
      </Modal>
    );
  }
}
// https://firebasestorage.googleapis.com/v0/b/accounting-806b6.appspot.com/o/images%2F20200417_052540.jpg?alt=media&token=cadc4bd1-1b76-4726-8c3f-8f03223ae866

const mapStateToProps = (state) => {
  return {
    isOpenModal: state.modalPopupReducer.isOpenModal,
    isAddUser: state.modalPopupReducer.isAddUser,
    initialValues: state.userManagerReducer.userById,
    userById: state.userManagerReducer.userById,
    isLoading: state.userManagerReducer.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      { ...ModalPopupActions, ...UserManagerActions },
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
    enableReinitialize: true,
    validate,
  })(UserManagerForm)
);
