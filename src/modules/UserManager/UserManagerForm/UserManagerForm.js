import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Modal, Button, Upload, Progress, Spin, Select , Input } from "antd";
import { bindActionCreators } from "redux";
import { ModalPopupActions } from "../../../actions/index";
import { UserManagerActions } from "../../../actions/index";
import { v4 as uuidv4 } from "uuid";
import * as Notifies from "../../../components/Notifies/Notifies";
import storage from "../../../config/FirebaseClient";
import { validate } from "../../../helpers/Validate";
import UserDefaultImage from "../../../assets/img/userImage.png";

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
  meta: { touched, error },
  children,
}) => (
  <Fragment>
    <Select className={className} {...input}>
      {children}
    </Select>
    {touched && error && <span className="text-validate">{error}</span>}
  </Fragment>
);
class UserManagerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImg: null,
      imgInfo: null,
      progress: 0,
      isProgress: false,
      userInfo: {
        id: "",
      },
    };
  }

  submitValue = (value) => {
    this.setState({
      progress: 0,
      isProgress: true,
    });
      this.handleUpload(value);
  };

  handleChange = (info) => {
    this.setState({
      selectedImg: URL.createObjectURL(info.file.originFileObj),
      imgInfo: info.file.originFileObj,
    });
  };

  // upload file to firebase storage
  handleUpload = (value) => {
    var { imgInfo } = this.state;
    const { userById } = this.props;
    if (imgInfo === null) {
      if(userById.id){
        this.updateUserManagerAPI(userById.id, value, UserDefaultImage);
      }
      else{
        this.createUserManagerAPI(value, UserDefaultImage); 
      }
      this.actionsAfterSubmit();
    } else {
      var storageRef = storage.ref();
      var uploadTask = storageRef.child("images/" + imgInfo.name).put(imgInfo);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({
            progress,
          });
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            if(userById.id){
              this.updateUserManagerAPI(userById.id, value, downloadURL);
            }
            else{
              this.createUserManagerAPI(value, downloadURL);
            }
            this.actionsAfterSubmit();
          });
        }
      );
    }
  };

  createUserManagerAPI = (value, paramAvatar) => {
    const id = uuidv4();
    const { createUserManagerRequest } = this.props.actions;
    createUserManagerRequest({
      userInfo: {
        id: id,
        name: value.name || "",
        email: value.email || "",
        position: value.position || "",
        level: value.level || "",
        major: value.major || "",
        phone: value.phone || "",
        avatarURL: paramAvatar,
      },
      callback: () => {
        return Notifies.createSuccess();
      },
      fallback: () => {
        return Notifies.errorMessege();
      },
    });
  }

  updateUserManagerAPI = (id, value, paramAvatar) => {
    const { updateUserManagerRequest } = this.props.actions;
    updateUserManagerRequest({
      userInfo: {
        id: id,
        name: value.name || "",
        email: value.email || "",
        position: value.position || "",
        level: value.level || "",
        major: value.major || "",
        phone: value.phone || "",
        avatarURL: paramAvatar,
      },
      callback: () => {
        return Notifies.updateSuccess();
      },
      fallback: () => {
        return Notifies.errorMessege();
      },
    });
  }

  actionsAfterSubmit = () => {
    this.setState({
      isProgress: false,
      selectedImg: null,
      imgInfo: null
    });
    this.props.actions.hideModal(false);
  }

  handleOk = (e) => {
    this.submitValue();
  };

  handleCancel = (e) => {
    this.props.actions.hideModal(false);
  };

  render() {
    const { handleSubmit, isOpenModal, isAddUser, isLoading } = this.props;
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
                  className="col-2 text-right control-label font-weight-bold"
                  htmlFor="name"
                >
                  Tên* :
                </label>
                <div className="col-10">
                  <Field
                    placeholder="Tên"
                    name="name"
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
                  className="col-2 text-right control-label font-weight-bold"
                  htmlFor="email"
                >
                  Email* :
                </label>
                <div className="col-10">
                  <Field
                    placeholder="Email"
                    name="email"
                    component={renderField}
                    type="email"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="form-group row">
                <label
                  className="col-2 control-label text-right font-weight-bold"
                  htmlFor="position"
                >
                  Chức vụ* :
                </label>
                <div className="col-4">
                  <Field
                    name="position"
                    component={renderSelectField}
                  >
                    <Option value="">Chức vụ</Option>
                    <Option value="Sếp">Sếp</Option>
                    <Option value="Nhân viên">Nhân viên</Option>
                    <Option value="Kế toán">Kế toán</Option>
                  </Field>
                </div>
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="form-group row">
                <label
                  className="col-2 control-label text-right font-weight-bold"
                  htmlFor="level"
                >
                  Tình trạng :
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
            </div>
            <div className="col-12 mb-2">
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
            </div>
            <div className="col-12 mb-2">
              <div className="form-group row">
                <label
                  className="col-2 text-right control-label font-weight-bold"
                  htmlFor="phone"
                >
                  Điện thoại* :
                </label>
                <div className="col-10">
                  <Field
                    placeholder="Số điện thoại"
                    name="phone"
                    component={renderField}
                    type="number"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 mb-2">
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
            </div>
          </div>
        </form>
        {isProgress ? (
          <div>
            <Progress percent={progress} className="progress-ant-custom" />
            <span>Đang xử lý vui lòng đợi...</span>
          </div>
        ) : (
          ""
        )}
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
