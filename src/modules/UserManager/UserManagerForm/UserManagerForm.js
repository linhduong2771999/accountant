import React, { Component, Fragment } from "react";
import { Modal, Button, Popover, Select , Input } from "antd";
import { validateName, validatePhoneNumber } from "../../../helpers/Validate";
import * as Notifies from "../../../components/Notifies/Notifies";
import BeautyStars from 'beauty-stars';
const { Option } = Select; 


const selectOptions = [
  {
    key: "Quản lý",
    value: ["Quản lý dự án", "Quản lý nhân sự", "Quản lý tài chính"]
  },
  {
    key: "IT",
    value: ["Frontend (Web)", "Backend (Web)", "Thiết kế đồ họa", "An ninh mạng", "Kỹ sư cơ sở dữ liệu", "Hỗ trợ máy tính"]
  },
  {
    key: "Tài chính",
    value: ["Kế toán", "Marketing"]
  },
]
export default class UserManagerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        position: "",
        department: "",
        level: "",
        role: "",
        phone: "",
        rating: 1
      },
      error: {
        name: "",
        phone: ""
      },

    };
    this.isModified = false;
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    const { user } = this.state;
    if(prevState.user.position !== user.position){ // reset department each time we change position
      let firstValue = {};
      selectOptions.forEach((ele) => {
        if(user.position === ele.key){
          firstValue = ele.value[0]; // get the first value 
        }
      })
      this.setState({
        user: {
          ...user,
          department: firstValue
        }
      })
    }
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if(nextProps && nextProps.userToEdit) {
      this.setState({
				user: {
          name: nextProps.userToEdit.name,
          position: nextProps.userToEdit.position,
          department: nextProps.userToEdit.department,
          level: nextProps.userToEdit.level,
          role: nextProps.userToEdit.role,
          phone: nextProps.userToEdit.phone,
          rating: nextProps.userToEdit.rating || 1
        }
      });
    }
  }

  handleOnChangeInput = (e) => {
    const {value, name} = e.target; 
    this.isModified = true;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    }, () => this.handleValidationOnChange(name, this.state.user))
  }

  handleOnChangeSelect = (name, value) => {
    this.isModified = true;
    this.setState({ 
      user: {
        ...this.state.user,
        [name]: value
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    try{
      const { name, position, department, level, role, phone, rating } = this.state.user;
      const error = this.handleValidation(this.state.user);
      const body = {
        user: {
          id: this.props.userToEdit.id,
          name,
          phone,
          position,
          department,
          level,
          role,
          rating 
        },
        callBack: () => Notifies.updateSuccess(),
        fallBack: (error) => Notifies.errorMessege(error.message, error.text, error.icon)
      }

      if(error.name || error.phone) {
        this.setState({
          error
        })
      } else if(!this.isModified) {
        alert("Bạn chưa sửa gì cả!")
      } else {
        this.props.hideModal();
        this.props.updateUser_from_UserManagerRequest(body)
      }

    } catch (error){
      Notifies.errorMessege("Thao tác không thành công", "Vui lòng thử lại trong chốc lát!", "error");
    }
  }

  handleValidation = (user = {}) => {
    let error = {...this.state.error};

    error.name = !validateName(user.name) && "Tên phải dài hơn 5 ký tự và không có số";
    error.phone = !validatePhoneNumber(user.phone) && "Số điện thoại không hợp lệ";

    return error
  }

  handleValidationOnChange = (field, user) => {   
    let error = {...this.state.error};
    this.isModified = true;
    switch (field) {
      case "name":
        let {name} = this.handleValidation(user);
        error.name = name;
        break;
      case "phone":
        let {phone} = this.handleValidation(user);
        error.phone = phone;
        break;
      default:
        break;
    }

    this.setState({
      error
    })
  }

  hideModal = (e) => {
    this.props.hideModal();
    this.isModified = false;
    this.setState({
      error: {}
    })
  };

  renderDepartmentSelect = (position) => {
    let departmentSelect = <Select defaultValue="Vui lòng chọn vị trí"></Select>;
    if(position){
      departmentSelect = selectOptions.map((item, index) => {
        return (
          item.key === position && 
            <Select 
                name="department" 
                disabled={position ? false : true}
                value={this.state.user.department} 
                onChange={(value) => this.handleOnChangeSelect("department", value)} key={index}
              >
                {item.value.map((subItem, index2) => (
                      <Option key={index2} value={subItem}>{subItem}</Option>
                ))}
            </Select>
          )
      })
    }
    return departmentSelect
  }
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

  render() {
    const { isOpen, popupName, popupProps, userToEdit } = this.props || {};
    const {user, error} = this.state;
    return (
      <div id="containerModal">
      <Modal
        title={<h3 className="modal-title text-center">Cập nhật thông tin</h3>}
        visible={popupName === "edit_user_form" && isOpen}
        closable={false}
        onCancel={this.hideModal}
        width="700px"
        footer={[
          <Fragment key="modal-footer">
            <Button type="default" onClick={this.hideModal}>
              Đóng
            </Button>
            <Button
              form="myForm"
              key="submit"
              htmlType="submit"
              type="primary"
            >
              Sửa
            </Button>
          </Fragment>,
        ]}
      >
        <form onSubmit={this.handleSubmit} className="row" id="myForm" >
            <div className="col-12 mb-2">
              <div className="form-group d-flex">
                <label
                  className="col-3 py-1 text-right control-label font-weight-bold"
                  htmlFor="name"
                >
                  Tên: 
                </label>
                <div className="col-6" id="popoverContainer-name" style={{position: "relative"}}>
                  <Popover 
                    getPopupContainer={() => document.getElementById("popoverContainer-name")} 
                    visible={error.name ? true : false} 
                    content={"Tên phải dài hơn 5 ký tự và không có số"} 
                    placement="rightTop"
                  >
                    <Input
                      autoComplete="off"
                      name="name" 
                      value={user.name} 
                      onChange={this.handleOnChangeInput}
                      onClick={() => this.handleValidationOnChange("name", user)}
                    />
                  </Popover>
                </div>
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="form-group d-flex">
                <label
                  className="col-3 py-1 text-right control-label font-weight-bold"
                  htmlFor="name"
                >
                  Điện thoại: 
                </label>
                <div className="col-6" id="popoverContainer-phone">
                  <Popover 
                    getPopupContainer={() => document.getElementById("popoverContainer-phone")} 
                    content="Số điện thoại không hợp lệ" 
                    visible={error.phone ? true : false} 
                    placement="right"
                  >
                    <Input
                      ref={this.inputRef}
                      name="phone" 
                      value={user.phone} 
                      onChange={this.handleOnChangeInput}
                      onClick={() => this.handleValidationOnChange("phone", user)}
                      
                    />
                  </Popover>
                </div>
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="form-group d-flex">
                <label
                  className="col-3 py-1 control-label text-right font-weight-bold"
                  htmlFor="position"
                >
                  Vị trí:
                </label>
                <div className="col-6">
                  <Select 
                    name="position" 
                    value={user.position} 
                    onChange={(value) => this.handleOnChangeSelect("position", value)}
                  >
                    <Option value="Quản lý">Quản lý</Option>
                    <Option value="IT" >IT</Option>
                    <Option value="Tài chính" >Tài chính</Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="form-group d-flex">
                <label
                  className="col-3 py-1 text-right control-label font-weight-bold"
                  htmlFor="role"
                >
                  Chính:
                </label>
                <div className="col-6">
                    {this.renderDepartmentSelect(user.position)}
                </div>
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="form-group d-flex">
                <label
                  className="col-3 py-1 text-right control-label font-weight-bold"
                  htmlFor="role"
                >
                  Trình độ:
                </label>
                <div className="col-6">
                  <Select 
                    name="level" 
                    value={user.level} 
                    onChange={(value) => this.handleOnChangeSelect("level", value)}
                  >
                    <Option value="Intern" >Intern</Option>
                    <Option value="Fresher" >Fresher</Option>
                    <Option value="Junior" >Junior</Option>
                    <Option value="Middle" >Middle</Option>
                    <Option value="Senior" >Senior</Option>
                    <Option value="Master" >Master</Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="form-group d-flex">
                <label
                  className="col-3 py-1 text-right control-label font-weight-bold"
                  htmlFor="role"
                >
                  Vai trò:
                </label>
                <div className="col-6">
                  <Select 
                    name="role" 
                    value={user.role} 
                    onChange={(value) => this.handleOnChangeSelect("role", value)}
                  >
                    <Option value="user" >Người dùng</Option>
                    <Option value="admin" >Quản trị viên</Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="form-group d-flex">
                <label
                  className="col-3 py-1 text-right control-label font-weight-bold"
                  htmlFor="role"
                >
                  Đánh giá:
                </label>
                <div className="col-6">
                  <BeautyStars 
                    maxStars={5} 
                    value={user.rating} 
                    inactiveColor="#121621"
                    activeColor="#f28902"
                    onChange={(value) => {
                      this.isModified = true;
                      this.setState({user: {...user, rating: value}})
                    }} 
                  />
                </div>
              </div>
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
      </div>

    );
  }
}
// https://firebasestorage.googleapis.com/v0/b/accounting-806b6.appspot.com/o/images%2F20200417_052540.jpg?alt=media&token=cadc4bd1-1b76-4726-8c3f-8f03223ae866
