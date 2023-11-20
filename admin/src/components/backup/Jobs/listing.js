import React, {Component, Fragment} from 'react';
import axios from 'axios';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

import {
    Row, Col,
    Container,
    Card,
    CardHeader,
    Table,
    Button,
    UncontrolledTooltip,
} from 'reactstrap';

let jobsLength = 0;
let jobsList = [];

// function getJobs() {
//     axios.get(`http://127.0.0.1:8000/apiViewSet/jobs/`)
//       .then(res => {
//         console.log(res);
//         jobsList = res.data;
//         jobsLength = res.data.length;
//       })
// }
// getJobs();


export default class JobsListing extends Component {
    constructor(props) {
        super(props)   
        this.state = {
            records: []
        }
         
    }
 
    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/apiViewSet/jobs/`)
      .then(res => {
        this.setState({
            records: res.data
        })
        setTimeout(function(){
            $('#jobs').DataTable();
        } ,1000);
      })        
    }
    render() {
        return (
            <Fragment>
                <Container fluid>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardHeader>
                                    Jobs Listing
                                </CardHeader>
                                <Table id="jobs" responsive hover striped borderless className="align-middle mb-0">
                                    <thead>
                                    <tr>
                                        <th>Jobs</th>
                                        <th>UUID</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.records.map(( listValue, index ) => {
                                        return (
                                            <tr key={index} id={"Tooltip-id-" + listValue.id}>
                                                <td style={{cursor:"pointer"}}
                                                    onClick={() =>
                                                    window.open("/job/details/" + listValue.id, "_self")
                                                    }>{listValue.name}</td>
                                                <td>{listValue.id}</td>
                                                <td>{listValue.type}</td>
                                                <td>{listValue.status}</td>
                                                <UncontrolledTooltip placement="left" target={"Tooltip-id-" + listValue.id}>
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
                                                        <span>Steps</span>
                                                        </div>
                                                        <div className="col-6">
                                                        <span>{listValue.steps}</span>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                        <span>Step Reports</span>
                                                        </div>
                                                        <div className="col-6">
                                                        <span>{listValue.stepReports}</span>
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
                                                        <span>Service Units</span>
                                                        </div>
                                                        <div className="col-6">
                                                        <span>{listValue.serviceUnits}</span>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                        <span>Execution Instance Id</span>
                                                        </div>
                                                        <div className="col-6">
                                                        <span>{listValue.executionInstanceId}</span>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-6">
                                                        <span>Instance Metrics</span>
                                                        </div>
                                                        <div className="col-6">
                                                        <span>{listValue.instanceMetrics}</span>
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
        )
    }
}
