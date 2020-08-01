import React from 'react';
import 'antd/dist/antd.css';
import "./assets/scss/App.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-datepicker/dist/react-datepicker.css";
import AppIndex from "./modules/App/App";

function App(props) {
  return (
    <div >
        <AppIndex children={props.children} />
    </div>
  );
}

export default App;
