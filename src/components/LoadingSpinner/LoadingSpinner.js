import React, { Component } from 'react';
import * as Color from "../../assets/styles/Colors";
import Loader from "react-loader-spinner";
import "./LoadingSpinner.scss";
class LoadingSpinner extends Component {
    render() {
        return (
            <div className="loading-spinner">
                <Loader
                type="Puff"
                color={Color.primaryColor}
                height={90}
                width={90}
                timeout={1000}
                />
          </div>
        );
    }
}

export default LoadingSpinner;