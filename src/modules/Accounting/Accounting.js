import React, { Component, Fragment } from 'react';
import callAPI from "../../helpers/callAPI";
class Accounting extends Component {

    componentDidMount = () => {
        callAPI("products", "GET", null);
    }
    render() {
        return (
            <Fragment>
                <button>Click to get API.</button>
            </Fragment>
        );
    }
}

export default Accounting;