import React from 'react';
import { Icon } from "antd";
import "./LoadingPageIcon.scss"
const LoadingPageIcon = () => {
    return (
        <div className="loading-page-status">
            <div className="loading-content">
                <p>ACCOUNTING SOFTWARE</p>
                <Icon type="sync" spin/>
            </div>
        </div>
    );
};

export default LoadingPageIcon;