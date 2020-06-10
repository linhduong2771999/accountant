import React, { Component } from "react";
import { Col, Button, Input ,Icon, Row} from "antd";
import  "./SearchControl.scss";
import { filterText } from "../../helpers/return";
import onClickOutside from "react-onclickoutside";


class SearchControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchText: "",
          isOpenSuggestion: false
        };

        this.searchInput = React.createRef();
      }

    handleClickOutside = (event) => {
        this.setState({
          isOpenSuggestion: false
        })  
    }
    onHandleSearchChange = (e) => {
        const { value, name } = e.target;
        if(value){
          this.setState({
            [name]: value,
            isOpenSuggestion: true
          });
        }
        else{
          this.setState({
            [name]: value,
            isOpenSuggestion: false
          });
        }
      };
    
    onHanldeSearchSubmit = (e) => {
      e.preventDefault();
      this.props.searchUser(this.state.searchText);
      this.setState({
        isOpenSuggestion: false
      })
    };

    returnSuggestionValue = (name) => {
      this.setState({
        searchText: name,
        isOpenSuggestion: false
      }, () => {
        this.searchInput.current.focus()
      })
    }

    renderSuggestion = (suggestionValue) => {
      var result = [];
      if(suggestionValue.length && this.state.searchText){
        result = suggestionValue.map((user, index) => {
          return (
            <div className="list-group-item d-flex" key={index} onClick={() => this.returnSuggestionValue(user.name)}>
                <div className="item-avatar mr-3">
                  <img alt="avatar" src={user.avatarURL} /> 
                </div>
                <div className="item-name d-flex align-items-center">
                    <p className="mb-0 font-weight-bold font-size-14">{user.name}</p>
                </div>
                <div className="mx-2 font-weight-bold d-flex align-items-center">
                    -
                </div>
                <div className="item-email d-flex align-items-center">
                    <p className="mb-0 text-secondary font-size-14">{user.email}</p>  
                </div>
            </div>
          )
        })
      }
      else {
        return result = <p className="text-center mb-0 py-2 font-weight-bold font-size-14">Không tìm thấy kết quả</p>
      }
      return result;
    }
  render() {
    var { searchText , isOpenSuggestion} = this.state;
    var {suggestionValue} = this.props; 

    if(searchText){
      suggestionValue = suggestionValue.filter((value) => {
        return filterText(value.name)
                  .toLowerCase()
                  .trim()
                  .includes(searchText.toLowerCase()) ||
                filterText(value.email)
                  .toLowerCase()
                  .trim()
                  .replace(/\s+/g, "")
                  .includes(searchText.toLowerCase()) || 
                  filterText(value.position)
                  .toLowerCase()
                  .trim()
                  .includes(searchText.toLowerCase()) ||
                filterText(value.level)
                  .toLowerCase()
                  .trim()
                  .includes(searchText.toLowerCase()) ||
                filterText(value.major)
                  .toLowerCase()
                  .trim()
                  .includes(searchText.toLowerCase()) ||
                filterText(value.phone)
                  .toLowerCase()
                  .trim()
                  .replace(/\s+/g, "")
                  .includes(searchText.toLowerCase());
      })
    }

    return (
      <Row>
        <form onSubmit={this.onHanldeSearchSubmit}>
          <Col xs={16} sm={16} md={20} lg={16} xl={20} className="search-input-wrapper">
            <Input
              className="search-input "
              name="searchText"
              value={searchText}
              onChange={this.onHandleSearchChange}
              placeholder="Gõ không dấu"
              autoComplete="off"
              ref={this.searchInput}
            />
            {
              isOpenSuggestion ? (
                <div className="suggestion" onClick={(e) => {
                  if(!e.target){
                    console.log("ok");
                    
                  }
                }}>
                  <div className="list-group">
                    {this.renderSuggestion(suggestionValue) }
                  </div>
                </div>
              ) : null
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
