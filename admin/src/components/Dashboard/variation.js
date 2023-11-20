import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";
import axios from "axios";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

import {
  Row,
  Col,
  Button,
  Nav,
  Container,
  NavItem,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  CardHeader,
  NavLink,
  TabContent,
  TabPane,
  Progress,
  ButtonGroup,
  CardFooter,
  Table,
  Popover,
  PopoverBody,
  UncontrolledTooltip,
} from "reactstrap";

import CountUp from "react-countup";

function boxMullerRandom() {
  let phase = false,
    x1,
    x2,
    w,
    z;

  return (function() {
    if ((phase = !phase)) {
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
      } while (w >= 1.0);

      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      return x1 * w;
    } else {
      return x2 * w;
    }
  })();
}

function randomData(n = 30) {
  return Array.apply(0, Array(n)).map(boxMullerRandom);
}

const sampleData = randomData(10);
let instanceLength = 0;
let instanceList = [];

export default class CRMDashboard1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instanceLength: 0,
      instanceList: [],
      jobsLength: 0,
      jobsList: [],
      tasksLength: 0,
      tasksList: [],
    };
  }

  formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/getInstances/",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    }).then((res) => {
      console.log(res.data);
      this.setState({
        instanceLength: res.data.length,
        instanceList: res.data,
      });
      setTimeout(function() {
        $("#instances").DataTable();
      }, 1000);
    });

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/getJobs/",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    }).
    then((res) => {
      console.log(res.data);
      this.setState({
        jobsLength: res.data.length,
        jobsList: res.data,
      });
      setTimeout(function() {
        $("#jobs").DataTable();
      }, 1000);
    });


    axios({
      method: "get",
      url: "http://127.0.0.1:8000/getTasks/",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    }).then((res) => {
      console.log(res.data);
      this.setState({
        tasksLength: res.data.length,
        tasksList: res.data,
      });
      setTimeout(function() {
        $("#tasks").DataTable();
      }, 1000);
    });
  }
  render() {
    return (
      <Fragment>
        <Container fluid>
          <Row>
            <Col md="6" xl="4">
              <div className="card mb-3 widget-content bg-night-fade">
                <div className="widget-content-wrapper text-white">
                  <div className="widget-content-left">
                    <div className="widget-heading">Total Instances</div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-white">
                      <CountUp end={this.state.instanceLength} duration="2" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" xl="4">
              <div className="card mb-3 widget-content bg-arielle-smile">
                <div className="widget-content-wrapper text-white">
                  <div className="widget-content-left">
                    <div className="widget-heading">Total Jobs</div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-white">
                      <CountUp
                        start={0}
                        end={this.state.jobsLength}
                        separator=""
                        decimals={0}
                        decimal=","
                        prefix=""
                        duration="2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" xl="4">
              <div className="card mb-3 widget-content bg-happy-green">
                <div className="widget-content-wrapper text-white">
                  <div className="widget-content-left">
                    <div className="widget-heading">Total Tasks</div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-white">
                      <CountUp
                        start={0}
                        end={this.state.tasksLength}
                        separator=""
                        decimals={0}
                        decimal=","
                        prefix=""
                        suffix=""
                        duration="2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardHeader>Instances Detail</CardHeader>
                <Table
                  id="instances"
                  responsive
                  hover
                  striped
                  borderless
                  className="align-middle mb-0"
                >
                  <thead>
                    <tr>
                      <th>UUID</th>
                      <th>State</th>
                      <th>IP Address</th>
                      <th>Job</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.instanceList.map((listValue, index) => {
                      console.log(listValue.metrics);
                      let metrices = listValue.metrics;
                      return (
                        <tr key={index} id={"Tooltip-id-" + listValue.uuid}>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              window.open(
                                "/instance/details/" + listValue.uuid,
                                "_self"
                              )
                            }
                          >
                            {listValue.uuid}
                          </td>
                          <td>{listValue.state}</td>
                          <td>{listValue.ipAddress}</td>
                          <td>{listValue.jobs.length}</td>
                          <UncontrolledTooltip
                            placement="left"
                            target={"Tooltip-id-" + listValue.uuid}
                          >
                            <div className="row">
                              <div className="col-6">
                                <span>Metrices</span>
                              </div>
                              <div className="col-6"></div>
                            </div>

                            <div className="row">
                              <div className="col-6">
                                <span>CPUs</span>
                              </div>
                              <div className="col-6">
                                <span>{metrices.cpus}</span>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-6">
                                <span>CPU Usage</span>
                              </div>
                              <div className="col-6">
                                <span>{metrices.totalCpuPercent}%</span>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-6">
                                <span>Disk Usage</span>
                              </div>
                              <div className="col-6">
                                <span>
                                  {this.formatBytes(metrices.totalDiskUsage)}
                                </span>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-6">
                                <span>Mem Usage</span>
                              </div>
                              <div className="col-6">
                                <span>
                                  {this.formatBytes(metrices.totalMemUsed)}
                                </span>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-6">
                                <span>Load Avg 10</span>
                              </div>
                              <div className="col-6">
                                <span>{metrices.loadAvg10}%</span>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-6">
                                <span>Free Space</span>
                              </div>
                              <div className="col-6">
                                <span>
                                  {this.formatBytes(metrices.diskFreeSpace)}
                                </span>
                              </div>
                            </div>
                          </UncontrolledTooltip>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardHeader>Jobs Detail</CardHeader>
                <Table
                  id="jobs"
                  responsive
                  hover
                  striped
                  borderless
                  className="align-middle mb-0"
                >
                  <thead>
                    <tr>
                      <th>Jobs</th>
                      <th>UUID</th>
                      <th>Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.jobsList.map((listValue, index) => {
                      return (
                        <tr key={index} id={"Tooltip-job-" + listValue.uuid}>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              window.open(
                                "/job/details/" + listValue.uuid,
                                "_self"
                              )
                            }
                          >
                            {listValue.name}
                          </td>
                          <td>{listValue.uuid}</td>
                          <td>N/A</td>
                          <td>N/A</td>
                          
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardHeader>Tasks Detail</CardHeader>
                <Table
                  id="tasks"
                  responsive
                  hover
                  striped
                  borderless
                  className="align-middle mb-0"
                >
                  <thead>
                    <tr>
                      <th>Tasks</th>
                      <th>UUID</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tasksList.map((listValue, index) => {
                      return (
                        <tr key={index} id={"Tooltip-task-" + listValue.uuid}>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              window.open(
                                "/task/details/" + listValue.uuid,
                                "_self"
                              )
                            }
                          >
                            {listValue.displayName}
                          </td>
                          <td>{listValue.uuid}</td>
                          <td>{listValue.type}</td>
                          <td>{listValue.status}</td>
                          <td>{listValue.progress}</td>
                          <UncontrolledTooltip
                            placement="left"
                            target={"Tooltip-task-" + listValue.uuid}
                          >
                            <div className="row">
                              <div className="col-6">
                                <span>Current Step</span>
                              </div>
                              <div className="col-6">
                                <span>{listValue.currentStep}</span>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-6">
                                <span>Total Step</span>
                              </div>
                              <div className="col-6">
                                <span>{listValue.totalStep}</span>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-6">
                                <span>Total Error Count</span>
                              </div>
                              <div className="col-6">
                                <span>{listValue.totalErrorCount}</span>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-6">
                                <span>Progress</span>
                              </div>
                              <div className="col-6">
                                <span>{listValue.progress}</span>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-6">
                                <span>Due Date</span>
                              </div>
                              <div className="col-6">
                                <span>{listValue.dueDate}</span>
                              </div>
                            </div>
                          </UncontrolledTooltip>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
