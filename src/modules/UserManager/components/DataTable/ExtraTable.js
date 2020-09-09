import React, { Component, Fragment } from 'react';
import { Button, Tooltip, Icon } from "antd";
import Table from "../../../../components/Table/Index";
import UserImage from "../../../../assets/img/userImage.png";
import moment from "moment";

export default class ExtraTable extends Component {
    render() {
    const { 
      loadingTable, 
      usersListTable, 
      handleTableChange,
      pagination, 
      handleDeleteUser 
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
          title: "Biệt hiệu",
          dataIndex: "nickName",
          width: 150,
          render: (nickName) => <span className={`${nickName ? "text-capitalize" : "text-warning"}`}>{nickName ? nickName : "Chưa có"}</span>,
        },
        {
          title: "Ngày sinh",
          dataIndex: "dob",
          width: 120,
          render: (dob) => <span className={`${dob ? "text-capitalize" : "text-warning"}`}>{dob ? dob : "Chưa có"}</span>
        },
        {
          title: "Tuổi",
          dataIndex: "age",
          width: 100,
          render: (age) => <span className={!age && "text-warning"}>{age ? age : "Chưa có"}</span>,
          sorter: true
        },
        {
          title: "Giới tính",
          dataIndex: "gender",
          width: 120,
          render: (gender) => <span className={`${gender ? "text-capitalize" : "text-warning"}`}>{gender ? gender : "Chưa có"}</span>,
          sorter: true
        },
        {
          title: "Mạng xã hội",
          dataIndex: "social",
          align: "center",
          width: 120,
          render: (social) => {
              return social && social.map((item, index) => {
                  return <a style={{color: "inherit", marginRight: ".5rem"}} key={index} href={item.url} target="_blank"><Icon style={{fontSize: "1.5rem"}} type={item.name} /></a>
              }) 
          }
        },
        {
          title: "Đánh giá",
          dataIndex: "rating",
          align: "center",
          width: 120,
          render: (rating) => <span className="text-success">{rating}</span>,
          sorter: true
        },
        {
          title: "Ngày đăng ký",
          dataIndex: "createAt",
          align: "center",
          width: 150,
          render: (createAt) => <span style={{whiteSpace: "pre", textAlign: "center"}}>{moment(createAt).format('DD/MM/YY, [\n] [lúc] h:mm:ss a')}</span>,
          sorter: true
        },
        {
          title: "Tác vụ",
          dataIndex: "id",
          width: 170,
          render: (id) => actionsColumn(id)
        },
      ];
      const actionsColumnData = [
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
          action: () => {},
          style: { marginRight: ".25rem" }
        },
        {
          title: "Khóa", 
          icon: "lock", 
          type: "danger",
          action: () => {}, 
          style: { marginRight: ".25rem" }
        },
        {
          title: "Xóa", 
          icon: "delete", 
          action: ({id}) => handleDeleteUser(id), 
          type: "danger"
        },
      ]
      const actionsColumn = (id) => (
        <Fragment>
          {actionsColumnData.map((item, index) => (
            <Tooltip key={index} placement="top" title={item.title}>
              <Button
                style={item.style}
                icon={item.icon}
                size="small"
                type={item.type}
                onClick={() => item.action({id})}
              />
            </Tooltip>
          ))}
        </Fragment>
      );

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