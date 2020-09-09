import React, { Component } from 'react';
import { Redirect  } from "react-router-dom";
import { Button, Tooltip, Tag } from "antd";
import Table from "../../../../components/Table/Index";
import UserImage from "../../../../assets/img/userImage.png";
export default class MainTable extends Component {
    render() {
    const { 
      loadingTable, 
      usersListTable, 
      handleTableChange, 
      pagination, 
      handleDeleteUser, 
      handleUpdateUser,
      handleLockedAccount,
      history 
    } = this.props;
    const columns = [
        {
          title: "Avatar",
          dataIndex: "photoUrl",
          align: "center",
          width: 100,
          render: (photoUrl) => <img className="avatar-user-table" alt="..." src={photoUrl ? photoUrl : UserImage} />
        },
        {
          title: "Họ và tên",
          dataIndex: "name",
          width: 180,
          render: (name) => <span className="text-primary text-capitalize">{name ? name : "Chưa có"}</span>,
          sorter: true
        },
        {
          title: "Email",
          dataIndex: "email",
          width: 180,
          sorter: true
        },
        {
          title: "Vị trí",
          dataIndex: "position",
          width: 130,
          render: (position) => <span className={`${position ? "text-capitalize" : "text-warning"}`}>{position ? position : "Chưa có"}</span>,
          sorter: true
        },
        {
          title: "Chính",
          dataIndex: "department",
          width: 150,
          render: (major) => <span className={`${major ? "text-capitalize" : "text-warning"}`}>{major ? major : "Chưa có"}</span>,
          sorter: true
        },
        {
          title: "Trình độ",
          dataIndex: "level",
          width: 130,
          render: (level) => <span className={`${level ? "text-capitalize" : "text-warning"}`}>{level ? level : "Chưa có"}</span>,
          sorter: true
        },
        {
          title: "Số đt",
          dataIndex: "phone",
          width: 130,
          render: (phone) => <span className={`${phone ? "text-capitalize" : "text-warning"}`}>{phone ? phone : "Chưa có"}</span>
        },
        {
          title: "Vai trò",
          dataIndex: "role",
          align: "center",
          width: 100,
          render: (role) => <span className="text-capitalize">{role}</span>,
          sorter: true
        },
        {
          title: "Tình trạng",
          dataIndex: "active",
          align: "center",
          width: 150,
          render: (active) => <Tag color={`${active ? "lime" : "cyan"}`}>{active ? "Đang Hoạt động" : "Tạm khóa"}</Tag>,
          sorter: true
        },
        {
          title: "Tác vụ",
          dataIndex: "id",
          width: 170,
          render: (id, record) => actionsColumn(id, record)
        },
      ];
      const actionsColumnData = [
        {
          title: "Sửa", 
          icon: "edit",
          type: "default",
          action: ({id}) =>  handleUpdateUser(id) ,
          style: { marginRight: ".25rem" }
        },
        {
          title: "Report", 
          icon: "question-circle", 
          type: "default",
          action: () => {}, 
          style: { marginRight: ".25rem" }
        },
        {
          title: "Chi tiết", 
          icon: "info-circle",
          type: "default",
          action: () => history.push("/"),
          style: { marginRight: ".25rem" }
        },
        {
          title: "Khóa", 
          icon: "lock", 
          type: "danger",
          action: ({isLock, record}) => handleLockedAccount(isLock, record), 
          style: { marginRight: ".25rem" }
        },
        {
          title: "Xóa", 
          icon: "delete", 
          action: ({id, record}) => handleDeleteUser(id, record), 
          type: "danger"
        },
      ]
      const actionsColumn = (id, record) => {
        const isLock = (record.active ? "lock" : "unlock");

        return actionsColumnData.map((item, index) => (
                  <Tooltip 
                    key={index} 
                    placement="top" 
                    title={item.icon === "lock" ? (record.active ? "Khóa" : "Mở khóa") : item.title}
                  >
                    <Button
                      style={item.style}
                      disabled={record.active ? false : (item.icon === "lock" ? false : true)}
                      icon={item.icon === "lock" ? isLock : item.icon}
                      size="small"
                      type={item.type}
                      onClick={() => item.action({id, record, isLock })} // Objects use for each function
                    />
                  </Tooltip>
              ))
      };

        return (
            <Table
                columns={columns}
                dataSource={usersListTable}
                onChange={handleTableChange}
                loading={ loadingTable }
                pagination={{current:pagination.currentPage, total: pagination.results, pageSize: 5 }}
            />
        );
    }
}