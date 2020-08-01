import React, { Component, Fragment } from "react";
import {Table} from "antd";
class Index extends Component {
  render() {
    const {columns, dataSource, onChange, pagination, loading} = this.props;
    return (
      <Fragment>
        <Table
          scroll={{ x: 992 }}
          columns={columns}
          dataSource={dataSource}
          onChange={onChange}
          pagination={pagination}
          loading={loading}
          rowKey="userUID"
        />
      </Fragment>
    );
  }
}

export default Index;
