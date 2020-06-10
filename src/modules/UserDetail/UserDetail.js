import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import { UserDetailActions } from "../../actions/index";
import {Icon} from "antd"
class UserDetail extends Component {

    componentDidMount = () => {
        const {match: {params} } = this.props;
        this.props.actions.fetchUserDetailRequest(params.id)
    }
    render() {
        const { userDetail } = this.props;
        return (
            <Fragment>
                <div className="row">
                    <div className="user-detail-title col-12">
                        <div className="d-flex align-items-center">
                            <div className="user-detail-title__icon">
                                <Icon type="more" />
                            </div>
                            <div className="ml-3">
                                <h2 className="mb-0 text-info">Hồ sơ cá nhân</h2>
                            </div>
                        </div>
                    </div>
                    <div className="user-detail-main col-12">
                        <div className="row">
                            <div className="main-content-left col-xl-3 col-lg-3 col-md-12 col-sm-12">
                                <div className="box-wrapper p-3">
                                    <div className="avatar">
                                        <img alt="avatar" src={userDetail.avatarURL} />
                                    </div>
                                    <div className="title">
                                        <h4 className="mb-0 text-capitalize">{userDetail.name}</h4>
                                        <p className="mb-0 text-secondary font-size-14">{userDetail.major}</p>
                                        <p className="mb-0 mt-3 font-size-14">Nickname</p>
                                    </div>
                                    <div className="info mt-4 d-flex flex-column">
                                        <div className="info-item">                                            
                                            <div className="info-item-left p-3 w-50 mr-5">
                                                <div className="text-info">
                                                    <p>Thông tin cá nhân</p>
                                                </div>
                                                <div className="d-flex flex-row mb-3">
                                                    <div className="text-grey-1">
                                                        <i className="fa fa-calendar mr-2"></i>
                                                    </div>
                                                    <div>
                                                        <label className="text-grey-1 mb-0">Ngày sinh</label>
                                                        <p className="mb-0 text-break">27/07/1999</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row mb-3">
                                                    <div className="text-grey-1">
                                                        <i className="fa fa-transgender mr-2"></i>
                                                    </div>
                                                    <div>
                                                        <label className="text-grey-1 mb-0">Giới tính</label>
                                                        <p className="mb-0">Nam</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row mb-3">
                                                    <div className="text-grey-1">
                                                        <i className="fa fa-phone mr-2"></i>
                                                    </div>
                                                    <div>
                                                        <label className="text-grey-1 mb-0">Số điện thoại</label>
                                                        <p className="mb-0">{userDetail.phone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="info-item-right w-50">
                                                <div className="d-flex flex-row mb-3">
                                                    <div className="text-grey-1">
                                                        <i className="fa fa-building mr-2"></i>
                                                    </div>
                                                    <div>
                                                        <label className="text-grey-1 mb-0">Văn phòng</label>
                                                        <p className="mb-0">The Work Shop</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row mb-3">
                                                    <div className="text-grey-1">
                                                        <i className="fa fa-map-marker mr-2"></i>
                                                    </div>
                                                    <div>
                                                        <label className="text-grey-1 mb-0">Chỗ ở</label>
                                                        <p className="mb-0">1/11, cù chính lan</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row mb-3">
                                                    <div className="text-grey-1">
                                                        <i className="fa fa-envelope-o mr-2"></i>
                                                    </div>
                                                    <div>
                                                        <label className="text-grey-1 mb-0">Email</label>
                                                        <p className="mb-0 text-overflow-custom">{userDetail.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="main-content-right col-xl-9 col-lg-9 col-md-12 col-sm-12">
                                <div className="box-wrapper">
                                    <div className="categories">
                                        <div className="d-flex flex-row flex-wrap">
                                            <div className="cat-item my-3 py-1 text-center col-xl-3 col-lg-6">
                                                <h2 className="mb-0 text-primary">5</h2>
                                                <p className="mb-0 mt-2 text-grey-1 font-size-14">Tổng dự án đã tham gia</p>
                                            </div>
                                            <div className="cat-item my-3 py-1 text-center col-xl-3 col-lg-6">
                                                <h2 className="mb-0 text-primary">5</h2>
                                                <p className="mb-0 mt-2 text-grey-1 font-size-14">Tổng dự án đã hoàn thành</p>
                                            </div>
                                            <div className="cat-item my-3 py-1 text-center col-xl-3 col-lg-6">
                                                <h2 className="mb-0 text-primary">5</h2>
                                                <p className="mb-0 mt-2 text-grey-1 font-size-14">Tổng công việc được giao</p>
                                            </div>
                                            <div className="cat-item my-3 py-1 text-center col-xl-3 col-lg-6">
                                                <h2 className="mb-0 text-primary">5</h2>
                                                <p className="mb-0 mt-2 text-grey-1 font-size-14">Tổng công việc hoàn thành</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-wrapper mt-3">
                                sadasd
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userDetail: state.userDetailReducers.userDetail,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions:  bindActionCreators(
            {...UserDetailActions}, 
            dispatch
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);