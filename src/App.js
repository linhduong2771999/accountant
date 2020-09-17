import React, { Component } from 'react';
import 'antd/dist/antd.css';
import "./assets/scss/App.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-datepicker/dist/react-datepicker.css";
import RouterIndex  from "./routers/index";
import LoadingPageStatus from "./components/LoadingPageIcon/LoadingPageIcon";
import * as Notifies from "./components/Notifies/Notifies";
import { connect } from "react-redux";
import { bindActionCreators} from "redux";
import { AuthActions } from "./actions/index";
import { createLoadingSelector } from "./helpers/loadingSelector";
import { removeCookies } from "./utils/cookies";

import moment from "moment";
moment.locale('vi', {
  months : 'Tháng 1_Tháng 2_Tháng 3_Tháng 4_Tháng 5_Tháng 6_Tháng 7_Tháng 8_Tháng 9_Tháng 10_Tháng 11_Tháng 12'.split('_'),
  // monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
  monthsParseExact : true,
  weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
  weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
  weekdaysParseExact : true,
  longDateFormat : {
      LT : 'HH:mm',
      LTS : 'HH:mm:ss',
      L : 'DD/MM/YYYY',
      LL : 'D MMMM YYYY',
      LLL : 'D MMMM YYYY HH:mm',
      LLLL : 'dddd D MMMM YYYY HH:mm'
  },
  calendar : {
      sameDay : '[Aujourd’hui à] LT',
      nextDay : '[Demain à] LT',
      nextWeek : 'dddd [à] LT',
      lastDay : '[Hier à] LT',
      lastWeek : 'dddd [dernier à] LT',
      sameElse : 'L'
  },
  // relativeTime : {
  //     future : 'dans %s',
  //     past : 'il y a %s',
  //     s : 'quelques secondes',
  //     m : 'une minute',
  //     mm : '%d minutes',
  //     h : 'une heure',
  //     hh : '%d heures',
  //     d : 'un jour',
  //     dd : '%d jours',
  //     M : 'un mois',
  //     MM : '%d mois',
  //     y : 'un an',
  //     yy : '%d ans'
  // },
  // dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
  ordinal : function (number) {
      return  ('Ngày ') + number;
  },
  // meridiemParse : /PD|MD/,
  isPM : function (input) {
      return input.charAt(0) === 'M';
  },
  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  meridiem : function (hours, minutes, isLower) {
      return hours < 12 ? 'am' : 'pm';
  },
  week : {
      dow : 1, // Monday is the first day of the week.
      doy : 4  // Used to determine first week of the year.
  }
});
class App extends Component {

    UNSAFE_componentWillMount() {
        const body =  {
            fallBack: () => {
                Notifies.errorMessege("Lỗi", "Tài khoản của bạn đang tạm thời bị khóa. Vui lòng liên hệ lại quản trị viên!", "error");
                removeCookies({name: "user_token"});
            }
        }
        this.props.actions.checkLoggedInAccountRequest(body);
    }
    render(){
        if(this.props.loadingStatus) return <LoadingPageStatus />;
        return <div>{RouterIndex}</div>
    }
}

const mapStateToProps = (state) => {
    return {
        stateOfAuthReducer: state.authReducers,
        loadingStatus: createLoadingSelector(["CHECK_LOGGED_IN_ACCOUNT"])(state)
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ ...AuthActions }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
