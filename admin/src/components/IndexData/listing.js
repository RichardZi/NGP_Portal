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


export default class IndexListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      permissions: []
    };
  }

  componentDidMount() {
    let headers = { "headers": {"Content-Type": "multipart/form-data", "Authorization": 'Bearer ' + sessionStorage.getItem('token') }};
    axios.get(`http://127.0.0.1:8000/apiViewSet/IndexData/`, headers).then((res) => {
      this.setState({
        records: res.data,
        permissions: sessionStorage.getItem("permissions")
      });
      setTimeout(function(){
        $('#indexData').DataTable();
        console.log(this.state);
    } ,1000);
    });

    

    // axios({
    //   method: "get",
    //   url: "http://127.0.0.1:8000/SearchIndexes/",
    //   headers: { "Content-Type": "multipart/form-data", "Authorization": 'Bearer ' + sessionStorage.getItem('token') },
    // }).then((res) => {
    //   this.setState({
    //       records: res.data,
    //     });
    //     console.log(res.data);
    //     setTimeout(function(){
    //       $('#indexData').DataTable();
    //     } ,1000);
    //     console.log(this.state);
    // });
  setTimeout(function(){
      $('#indexData').DataTable();
  } ,1000);

  }
  render() {
    return (
      <Fragment>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardHeader>
                  Indexes List
                  <div className="btn-actions-pane-right">
                    {this.state.permissions.includes(57) === true ? (
                    <Button size="lg" className="btn-shadow-primary"
                      color="primary" onClick={() =>
                        window.open("/index-data/add/", "_self")
                      }>Add
                    </Button>
                    ) : ''}
                  </div>
                </CardHeader>
                <CardBody>
                  <Table
                    id="indexData"
                    responsive
                    hover
                    striped
                    borderless
                    className="align-middle mb-0"
                  >
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.records.map((listValue, index) => {
                        return (
                          <tr key={index} >
                              <td>{listValue.title}</td>

                              <td>
                              {this.state.permissions.includes(57) === true ? (
                                <Button size="sm" className="btn-shadow-primary"
                                  onClick={() =>
                                  window.open("/index-data/edit/" + listValue.id, "_self")}
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
