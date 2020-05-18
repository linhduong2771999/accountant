import React, { Component, Fragment } from 'react';
import {Pagination} from "antd";
class Index extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentPage: 1,
            startIndex: 0,
            endIndex: 3,
            totalPages: ""
        }
    }

    static getDerivedStateFromProps = (prevProps, prevState) => {
        return {
            totalPages: Math.ceil(prevProps.totalItem / 3),
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.totalItem !== this.props.totalItem) {
            this.onChange(this.state.currentPage, 3)
		}
    }

    onChange = (page, taskPerPage) => {            
        const {  totalPages , currentPage} = this.state;
        if (page < 1) { page = 1 }
        else if (page > totalPages) { page = totalPages }
        const startIndex = (page - 1) * taskPerPage;
        const endIndex = Math.min(startIndex + taskPerPage - 1, this.props.totalItem - 1);
        this.setState({
            currentPage: page,
        }, () => {
            this.props.onChangePage({
                startIndex,
                endIndex,
                totalPages,
                currentPage: page
            });
        })

    }

    render() {
        return (
            <Fragment>
                <Pagination 
                    style={{marginRight: "2rem"}} 
                    pageSize={3}
                    total={this.props.totalItem} 
                    current={this.state.currentPage}
                    onChange={this.onChange}
                />
            </Fragment>
        );
    }
}

export default Index;