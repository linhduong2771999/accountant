import React, { Component, Fragment } from 'react';
import { Modal, Button, Card, Select, Popover  } from "antd";
import  {isEmpty} from "lodash";
import * as Notifies from "../../../../components/Notifies/Notifies";
import UserImage from "../../../../assets/img/userImage.png";
import "./LockFeature_Modal.scss";

const { Meta } = Card;
const { Option } = Select;

export default class LockFeatureModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            accountLockedUntil: Date.now(), // get initial time when component load
            error: ""
        }     
    }

    handleSubmit = async ({isLock, record}) => { 
        try{
            this.props.hideModal();
            switch (isLock) {
                case "lock":
                    if(this.handleValidation(this.state.accountLockedUntil)){
                        this.handleLockedAccount(isLock, record)
                    } else {
                        this.setState({
                            error: "Vui lòng chọn ngày"
                        })
                    }
                    break;
                case "unlock":
                    this.handleLockedAccount(isLock, record)
                default:
                    break;
            }
        } catch(error){
            Notifies.errorMessege("Thao tác không thành công", "Vui lòng thử lại trong chốc lát!", "error")
        }
    }

    handleLockedAccount = (isLock, record) => {
        this.props.handlelockedAccount_from_UserManagerRequest({
            isLock,
            id: record.id,
            email: record.email, 
            active: isLock === "lock" ? false : true,
            accountLockedUntil: this.state.accountLockedUntil,
            callBack: () => Notifies.updateSuccess(),
            fallBack: (error) => Notifies.errorMessege(error.message, error.text, error.icon)
        })
    }

    handleValidation = (accountLockedUntil) => {
        let error = "";
        if(accountLockedUntil < Date.now()){
            error = "Vui lòng chọn ngày"
            return false
        } 

        this.setState({
            error
        })
        return true
    }

    handleChangeSelect = (value) => {
        this.setState({
            accountLockedUntil: value
        }, () => this.handleValidation(this.state.accountLockedUntil))
    }

    hideModal = () => {
        this.props.hideModal();
        this.setState({
            error: ""
        })
    }

    render() {
        const { isOpen, popupName, popupProps } = this.props;
        const isLock = !isEmpty(popupProps) && popupProps.isLock;
        const record = !isEmpty(popupProps) && popupProps.record;   
        return (
            <Modal     
                className="lock_user"
                title={<h3 className="modal-title text-center">{isLock === "lock" ? "Khóa" : "Mở khóa"}</h3>}
                visible={popupName === "lock_user_feature" && isOpen} 
                closable={false} 
                onCancel={this.hideModal}
                width="400px"
                footer={[
                    <Fragment key="modal-footer">
                      <Button type="default" onClick={this.hideModal}>
                        Đóng
                      </Button>
                      <Button
                        type="danger"
                        onClick={() => this.handleSubmit({isLock, record})}
                      >
                      {isLock === "lock" ? "Khóa" : "Mở khóa"}
                      </Button>
                    </Fragment>
                  ]}
            >
                  <div className="row">
                    <div className="lock-user_content col-12">
                        <div className="content_wrap d-flex">
                            <div className="content_avatar">
                                <Card
                                    hoverable
                                    style={{ width: 200 }}
                                    cover={<img alt="example" src={record.photoUrl ? record.photoUrl : UserImage} />}
                                >
                                    <Meta title={record.name} description={record.email} />
                                </Card>
                            </div>
                            <div className="content_body" id="popoverContainer_lock_feature">  
                                {
                                    isLock === "lock" ? 
                                        <Fragment>
                                            <Popover
                                                getPopupContainer={() => document.getElementById("popoverContainer_lock_feature")} 
                                                content="Vui lòng chọn ngày" 
                                                visible={this.state.error ? true : false} 
                                                placement="right"
                                            >
                                            <Select defaultValue="Chọn thời gian" style={{width: "100%"}} onChange={this.handleChangeSelect}>
                                                <Option value={Date.now() + 1*24*60*60*1000 }>1 ngày</Option>
                                                <Option value={Date.now() + 7*24*60*60*1000 }>1 tuần</Option>
                                                <Option value={Date.now() + 30*24*60*60*1000 }>1 tháng (30 ngày)</Option>
                                                <Option value={Date.now() + 365*24*60*60*1000 }>1 năm (365 ngày)</Option>
                                            </Select>
                                            </Popover>
                                            <p className="content_text-warning">*Lưu ý:</p>
                                            <ul>
                                                <li>Thời gian khóa được mặc định và không thể thay đổi. </li>
                                                <li>Không thể thực hiện các thao tác khác khi tài khoản bị khóa.</li>
                                            </ul>
                                        </Fragment>
                                    : <Fragment>
                                            <p className="mt-0 content_text-warning">*Lưu ý:</p>
                                            <ul>
                                                <li>Sau khi mở khóa vẫn có thể khóa lại những lần tiếp theo ngay lập tức. </li>
                                                <li>Tài khoản sau khi mở khóa sẽ không có thông báo.</li>
                                            </ul>
                                    </Fragment>
                                }
                            </div>
                        </div>
                    </div>
                  </div>
            </Modal>
        );
    }
}
