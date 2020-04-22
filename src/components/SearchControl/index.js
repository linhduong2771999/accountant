import React, { Component } from "react";
import { Col, Button, Input , Row} from "antd";

class SearchControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchText: ""
        };
      }
    onHandleSearchChange = (e) => {
        const { value, name } = e.target;
        this.setState({
          [name]: value,
        });
      };
    
      onHanldeSearchSubmit = (e) => {
        e.preventDefault();
        this.props.searchUserManager(this.state.searchText);
      };


  render() {
    return (
      <Row>
        <form onSubmit={this.onHanldeSearchSubmit}>
          <Col xs={16} sm={16} md={20} lg={16} xl={20}>
            <Input
              name="searchText"
              value={this.state.searchText}
              onChange={this.onHandleSearchChange}
              placeholder="Tìm kiếm"
            />
          </Col>
          <Col xs={8} sm={8} md={4} lg={8} xl={4}>
            <Button
              style={{ marginLeft: "1rem" }}
              icon="search"
              type="primary"
              htmlType="submit"
            >
              Tìm kiếm
            </Button>
          </Col>
        </form>
      </Row>
    );
  }
}

export default SearchControl;
