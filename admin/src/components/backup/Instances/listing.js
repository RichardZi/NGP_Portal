import React, { Component, Fragment } from "react";
import axios from "axios";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

import {
  Row,
  Col,
  Container,
  Card,
  CardHeader,
  Table,
  Button,
  CardBody,
  UncontrolledTooltip,
} from "reactstrap";



let instanceList = [];

// function getInstances() {
//     axios.get(`http://127.0.0.1:8000/apiViewSet/Instances/`)
//       .then(res => {
//         instanceList = res.data;
//       })
// }
// getInstances();

export default class InstanceListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
    };
  }

  formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/apiViewSet/Instances/`).then((res) => {
      this.setState({
        records: res.data,
      });
      setTimeout(function(){
        $('#instances').DataTable();
    } ,1000);
    });
  }
  render() {
    return (
      <Fragment>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardHeader>
                  Instances List
                  <div className="btn-actions-pane-right">
                  </div>
                </CardHeader>
                <CardBody>
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
                      {this.state.records.map((listValue, index) => {
                        let metrices = JSON.parse(listValue.matrices)
                        return (
                          <tr key={index} id={"Tooltip-id-" + listValue.id}>
                              <td style={{cursor:"pointer"}}
                                    onClick={() =>
                                      window.open("/instance/details/" + listValue.id, "_self")
                                    }>{listValue.id}</td>
                              <td>{listValue.state}</td>
                              <td>{listValue.ipAddress}</td>
                              <td>{listValue.job}</td>
                              <UncontrolledTooltip placement="left" target={"Tooltip-id-" + listValue.id}>
                                
                                  <div className="row">
                                    <div className="col-6">
                                      <span>Metrices</span>
                                    </div>
                                    <div className="col-6">
                                      
                                    </div>
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
                                      <span>{this.formatBytes(metrices.totalDiskUsage)}</span>
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-6">
                                      <span>Mem Usage</span>
                                    </div>
                                    <div className="col-6">
                                      <span>{this.formatBytes(metrices.totalMemUsed)}</span>
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
                                      <span>{this.formatBytes(metrices.diskFreeSpace)}</span>
                                    </div>
                                  </div>
                                </UncontrolledTooltip>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
