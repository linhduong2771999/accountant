import React, { Component } from "react";
import { CSVLink } from "react-csv";
import {Button} from "antd";
class CSVDownload extends Component {
  render() {
      const {userList} = this.props;
    return (
      <CSVLink data={userList}>
        <Button icon="download" type="primary">
          Tải
        </Button>
      </CSVLink>
    );
  }
}

export default CSVDownload;
