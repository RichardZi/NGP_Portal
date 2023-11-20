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

export default class UserListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      permissions: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/apiViewSet/user/",
      headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
    }).then((res) => {
      console.log(res.data);
      this.setState({
        records: res.data,
        permissions: sessionStorage.getItem("permissions")
      })
      setTimeout(function(){
        $('#users').DataTable();
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
                  Users List
                  <div className="btn-actions-pane-right">
                  {this.state.permissions.includes(21) === true ? (
                    <Button size="lg" className="btn-shadow-primary"
                      color="primary" onClick={() =>
                        window.open("/user/add/", "_self")
                      }>Add
                    </Button>
                  ) : ''}
                  </div>
                </CardHeader>
                <CardBody>
                  <Table
                    id="users"
                    responsive
                    hover
                    striped
                    borderless
                    className="align-middle mb-0"
                  >
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.records.map((listValue, index) => {
                        return (
                          <tr key={index} id={"Tooltip-id-" + listValue.id}>
                              <td>{listValue.username}</td>
                              <td>
                              {this.state.permissions.includes(22) === true ? (
                                <Button size="sm" className="btn-shadow-primary"
                                  onClick={() =>
                                  window.open("/user/edit/" + listValue.id, "_self")}
                                  color="primary">Edit
                                </Button>
                              ) : ''}
                              </td>
                              
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
