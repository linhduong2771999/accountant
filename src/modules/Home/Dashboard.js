import React, { Component, Fragment } from "react";
import ChartistGraph from "react-chartist";
const simpleLineChartData = {
  labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"],
  series: [
    [12, 9, 7, 8, 5],
    [2, 1, 3.5, 7, 3],
    [1, 3, 4, 5, 6]
  ]
};

const simplePieChartData = {
  series: [4, 2, 4]
};
var sum = function(a, b) {
  return a + b;
};
var optionsPie = {
  labelInterpolationFnc: function(value) {
    return (
      Math.round((value / simplePieChartData.series.reduce(sum)) * 100) + "%"
    );
  }
};

const simpleBarChartData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  series: [
    [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
    [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
  ]
};
var optionsBar = {
  seriesBarDistance: 10,
  labelInterpolationFnc: function(value) {
    return value[0];
  }
};

var responsiveOptions = [
  [
    "screen and (min-width: 641px) and (max-width: 1024px)",
    {
      seriesBarDistance: 10,
      axisX: {
        labelInterpolationFnc: function(value) {
          return value;
        }
      }
    }
  ],
  [
    "screen and (max-width: 640px)",
    {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function(value) {
          return value[0];
        }
      }
    }
  ]
];

class Dashboard extends Component {
  
  render() {
    return (
      <Fragment>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-3 col-md-6 col-xs-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-5 col-sm-5 col-6 icon-responsive">
                        <i className="fa fa-database fa-3x text-warning"></i>
                      </div>
                      <div className="col-lg-7 col-sm-7 col-6">
                        <div className="text-right">
                          <p className="my-0">Tổng dung lượng</p>
                          <h3 className="my-0 font-xs-responsive">105GB</h3>
                        </div>
                      </div>
                    </div>
                    <hr className="mt-2 mb-0" />
                    <div className="card-footer p-0">
                        <div className="text-left text-secondary">
                          <i className="fa fa-refresh"></i>
                          &nbsp; Vừa cập nhật
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-xs-12 ">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-5 col-sm-5 col-6 icon-responsive">
                        <i className="fa fa-google-wallet fa-3x text-warning"></i>
                      </div>
                      <div className="col-lg-7 col-sm-7 col-6">
                        <div className="text-right">
                          <p className="my-0">Doanh thu</p>
                          <h3 className="my-0 font-xs-responsive">$1.345</h3>
                        </div>
                      </div>
                    </div>
                    <hr className="mt-2 mb-0" />
                    <div className="card-footer p-0">
                        <div className="text-left text-secondary">
                          <i className="fa fa-calendar"></i>
                          &nbsp; Hôm qua
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-xs-12 ">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-5 col-sm-5 col-6 icon-responsive">
                        <i className="fa fa-book fa-3x text-warning"></i>
                      </div>
                      <div className="col-lg-7 col-sm-7 col-6">
                        <div className="text-right">
                          <p className="my-0">Số lỗi</p>
                          <h3 className="my-0 font-xs-responsive">20</h3>
                        </div>
                      </div>
                    </div>
                    <hr className="mt-2 mb-0" />
                    <div className="card-footer p-0">
                        <div className="text-left text-secondary">
                          <i className="fa fa-clock-o"></i>
                          &nbsp; 1 giờ trước
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-xs-12 ">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-5 col-sm-5 col-6 icon-responsive">
                        <i className="fa fa-twitter fa-3x text-warning"></i>
                      </div>
                      <div className="col-lg-7 col-sm-7 col-6">
                        <div className="text-right">
                          <p className="my-0">Người theo dõi</p>
                          <h3 className="my-0 font-xs-responsive">+30</h3>
                        </div>
                      </div>
                    </div>
                    <hr className="mt-2 mb-0" />
                    <div className="card-footer p-0">
                        <div className="text-left text-secondary">
                          <i className="fa fa-twitter"></i>
                          &nbsp; Vừa cập nhật
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="card">
                  <div className="card-header ">
                    <h4 className="card-title">Thống kê Email</h4>
                    <p className="card-category">Biểu đồ hiệu suất mới nhất</p>
                  </div>
                  <div className="card-body">
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                      style={{transform: "scale(1)"}}
                    >
                      <ChartistGraph
                        data={simplePieChartData}
                        options={optionsPie}
                        type={"Pie"}
                      />
                    </div>
                    <div className="legend">
                      <i className="fa fa-circle text-info"></i> Open
                      <i className="fa fa-circle text-danger"></i> Bounce
                      <i className="fa fa-circle text-warning"></i> Unsubscribe
                    </div>
                    <hr />
                    <div className="stats">
                      <i className="fa fa-clock-o"></i>Cập nhật từ doanh trại 2 ngày trước
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="card ">
                  <div className="card-header ">
                    <h4 className="card-title">Hành vi người dùng</h4>
                    <p className="card-category">Hiệu suất trong 24 giờ</p>
                  </div>
                  <div className="card-body ">
                    <div id="chartHours" className="ct-chart">
                      <ChartistGraph
                        data={simpleLineChartData}
                        type={"Line"}
                        responsiveOptions={responsiveOptions}
                      />
                    </div>
                  </div>
                  <div className="card-footer ">
                    <div className="legend">
                      <i className="fa fa-circle text-info"></i> Open
                      <i className="fa fa-circle text-danger"></i> Click
                      <i className="fa fa-circle text-warning"></i> Click Second
                      Time
                    </div>
                    <hr />
                    <div className="stats">
                      <i className="fa fa-history"></i> Cập nhật 3 phút trước
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="card ">
                  <div className="card-header ">
                    <h4 className="card-title">2017 Sales</h4>
                    <p className="card-category">
                      All products including Taxes
                    </p>
                  </div>
                  <div className="card-body ">
                    <div id="chartActivity" className="ct-chart">
                      <ChartistGraph
                        className="ct-chart"
                        id="chartActivity"
                        data={simpleBarChartData}
                        options={optionsBar}
                        type={"Bar"}
                        responsiveOptions={responsiveOptions}
                      />
                    </div>
                  </div>
                  <div className="card-footer ">
                    <div className="legend">
                      <i className="fa fa-circle text-info"></i> Tesla Model S
                      <i className="fa fa-circle text-danger"></i> BMW 5 Series
                    </div>
                    <hr />
                    <div className="stats">
                      <i className="fa fa-check"></i> Data information certified
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="card  card-tasks">
                  <div className="card-header ">
                    <h4 className="card-title">Công việc được giao</h4>
                    <p className="card-category"> Lập trình viên Backend </p>
                  </div>
                  <div className="card-body ">
                    <div className="table-full-width">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                  />
                                  <span className="form-check-sign"></span>
                                </label>
                              </div>
                            </td>
                            <td>
                              Sign contract for "What are conference organizers
                              afraid of?"
                            </td>
                            <td className="td-actions text-right">
                              <button
                                type="button"
                                rel="tooltip"
                                title="Edit Task"
                                className="btn btn-info btn-simple btn-link"
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                type="button"
                                rel="tooltip"
                                title="Remove"
                                className="btn btn-danger btn-simple btn-link"
                              >
                                <i className="fa fa-times"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                  />
                                  <span className="form-check-sign"></span>
                                </label>
                              </div>
                            </td>
                            <td>
                              Lines From Great Russian Literature? Or E-mails
                              From My Boss?
                            </td>
                            <td className="td-actions text-right">
                              <button
                                type="button"
                                rel="tooltip"
                                title="Edit Task"
                                className="btn btn-info btn-simple btn-link"
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                type="button"
                                rel="tooltip"
                                title="Remove"
                                className="btn btn-danger btn-simple btn-link"
                              >
                                <i className="fa fa-times"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                  />
                                  <span className="form-check-sign"></span>
                                </label>
                              </div>
                            </td>
                            <td>
                              Flooded: One year later, assessing what was lost
                              and what was found when a ravaging rain swept
                              through metro Detroit
                            </td>
                            <td className="td-actions text-right">
                              <button
                                type="button"
                                rel="tooltip"
                                title="Edit Task"
                                className="btn btn-info btn-simple btn-link"
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                type="button"
                                rel="tooltip"
                                title="Remove"
                                className="btn btn-danger btn-simple btn-link"
                              >
                                <i className="fa fa-times"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                  <span className="form-check-sign"></span>
                                </label>
                              </div>
                            </td>
                            <td>
                              Create 4 Invisible User Experiences you Never Knew
                              About
                            </td>
                            <td className="td-actions text-right">
                              <button
                                type="button"
                                rel="tooltip"
                                title="Edit Task"
                                className="btn btn-info btn-simple btn-link"
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                type="button"
                                rel="tooltip"
                                title="Remove"
                                className="btn btn-danger btn-simple btn-link"
                              >
                                <i className="fa fa-times"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                  />
                                  <span className="form-check-sign"></span>
                                </label>
                              </div>
                            </td>
                            <td>Read "Following makes Medium better"</td>
                            <td className="td-actions text-right">
                              <button
                                type="button"
                                rel="tooltip"
                                title="Edit Task"
                                className="btn btn-info btn-simple btn-link"
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                type="button"
                                rel="tooltip"
                                title="Remove"
                                className="btn btn-danger btn-simple btn-link"
                              >
                                <i className="fa fa-times"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="form-check">
                                <label className="form-check-label">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    disabled
                                  />
                                  <span className="form-check-sign"></span>
                                </label>
                              </div>
                            </td>
                            <td>Unfollow 5 enemies from twitter</td>
                            <td className="td-actions text-right">
                              <button
                                type="button"
                                rel="tooltip"
                                title="Edit Task"
                                className="btn btn-info btn-simple btn-link"
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                type="button"
                                rel="tooltip"
                                title="Remove"
                                className="btn btn-danger btn-simple btn-link"
                              >
                                <i className="fa fa-times"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-footer ">
                    <hr />
                    <div className="stats">
                      <i className="now-ui-icons loader_refresh spin"></i>{" "}
                      Updated 3 minutes ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Dashboard;