import React, { Component } from "react";
import { Col, Button, Input ,Icon, Row, List, Avatar} from "antd";
import  "./SearchControl.scss";
import onClickOutside from "react-onclickoutside";
import {filterText} from "../../helpers/return";
import UserImage from "../../assets/img/userImage.png";
import * as Notifies from "../../components/Notifies/Notifies";

class SearchControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchText: "",
          isOpenSuggestion: false
        };

        this.searchInput = React.createRef();
      }

    handleClickOutside = (event) => { // use on react-onclickoutside library
        this.setState({
          isOpenSuggestion: false
        })  
    }

    
    onHandleSearchChange = (e) => {
      try {
        const { value, name } = e.target;
        if(value){
          this.setState({
            [name]: filterText(value),
            isOpenSuggestion: true
          }, () => this.props.search_from_UserManagerRequest({page: 1, limit: 5, search: this.state.searchText, sort: "", fields: "name,photoUrl"})); // get user when typing keyword
        }
        else{ // When value empty hide suggestion.
          this.setState({
            [name]: filterText(value),
            isOpenSuggestion: false
          });
        }
      } catch(error) {
        Notifies.errorMessege("Thao tác không thành công", "Vui lòng thử lại trong chốc lát!", "error")
      }
      };
    
    onHanldeSearchSubmit = (e) => {
      e.preventDefault();
      try {
        const {currentPage, limit} = this.props;
        this.props.getUser_from_UserManagerRequest({  // get user when submit keyword
          page: 1, 
          limit: limit, 
          search: this.state.searchText, 
          sort: "", 
          fields: "",
          fallBack: (error) => Notifies.errorMessege(error.message, error.text, error.icon)
        });
       
        this.setState({
          isOpenSuggestion: false
        })
      } catch(error) {
        Notifies.errorMessege("Thao tác không thành công", "Vui lòng thử lại trong chốc lát!", "error")
      }
    };

    returnSuggestionValue = (name) => {
      this.setState({
        searchText: name, 
        isOpenSuggestion: false
      }, () => this.searchInput.current.focus())
    }

    renderSuggestion = (suggestionValue = []) => {
      if(suggestionValue.length > 0 && this.state.searchText){
          return (
            <List
              itemLayout="horizontal"
              dataSource={suggestionValue}
              renderItem={ (item) => (
                <List.Item onClick={() => this.returnSuggestionValue(item.name)}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.photoUrl ? item.photoUrl : UserImage} />}
                    title={<span>{item.name}</span>}
                  />
                </List.Item>
              )}
            />
          )
      }
    
      return <p className="text-center mb-0 py-2 font-weight-bold font-size-14">Không tìm thấy kết quả</p>
    }
  render() {
    var { searchText , isOpenSuggestion} = this.state;
    var {suggestionValue} = this.props; 

    let removeBorderRadius = isOpenSuggestion ? "search-input focus-border-input" : "search-input";
    return (
      <Row>
        <form onSubmit={this.onHanldeSearchSubmit}>
          <Col xs={16} sm={16} md={20} lg={16} xl={20} className="search-input-wrapper">
            <Input
              className={removeBorderRadius}
              name="searchText"
              value={searchText}
              onChange={this.onHandleSearchChange}
              placeholder="Gõ không dấu"
              autoComplete="off"
              ref={this.searchInput}
            />
            {
              isOpenSuggestion &&
              <div className="suggestion">
                  {this.props.loading ? <div className="p-3 text-center"><Icon style={{fontSize: "26px"}} type="loading" /></div> : this.renderSuggestion(suggestionValue)}
              </div>
            } 
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

export default onClickOutside(SearchControl);
