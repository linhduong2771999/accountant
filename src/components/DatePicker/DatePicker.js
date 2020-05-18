import React, { Component, Fragment, forwardRef  } from "react";
import {Input, Tooltip, Icon} from "antd";
import DatePicker from "react-datepicker";
import "./DatePicker.scss";

const CustomInputDatePicker = forwardRef(({ value, onClick , selectInputType}, ref) => (
    <Input 
        suffix={
            <Tooltip title="Chọn ngày">
                <Icon type="calendar" style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
        }
        type="text"
        onClick={onClick} 
        value={value ? value : (selectInputType === "start" ? "Chọn ngày bắt đầu" : "Chọn ngày kết thúc")}
    />
));

class Index extends Component {
    render() {
        const {dateValue, setDate, selectInputType} = this.props;
        return (
            <Fragment>
                <DatePicker 
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Thời gian"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    selected={dateValue}
                    onChange={ (date) => setDate(Number(date))}
                    customInput={<CustomInputDatePicker selectInputType={selectInputType} />} 
                />
          </Fragment>
        );
    }
}

export default Index;
