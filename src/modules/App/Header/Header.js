import React, { Component } from 'react';
import { PageHeader, Button } from 'antd';
import {Link} from "react-router-dom";
import Logo from "../../../assets/img/logo.jpg";
class Header extends Component {
    render() {
        return (
            <PageHeader 
            style={{
                "boxShadow": "-5px 5px 29px -10px rgba(201,201,214,1)",
                letterSpacing: "2px",
                position: "fixed",
                zIndex: "1000",
                width: "100%"
            }}
            ghost={false}
            title={
                <Link to="/" style={{color: "black"}}>
                    ACCOUNTING
                </Link>
            }
            avatar={{ src: Logo }}
            extra={[
                <Button key="1" type="primary">Log out</Button>
            ]}
            />
        );
    }
}

export default Header;