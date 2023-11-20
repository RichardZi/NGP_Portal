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

let tasksLength = 0;
let tasksList = [];

// function getTasks() {
//     axios.get(`http://127.0.0.1:8000/getTasks/`)
//       .then(res => {
//         tasksList = res.data;
//         tasksLength = res.data.length;
//       })
// }
// getTasks();


export default class TasksListing extends Component {
    constructor(props) {
        super(props)   
        this.state = {
            records: []
        }
         
    }
 
    componentDidMount() {
        axios({
            method: "get",
            url: "http://127.0.0.1:8000/getTasks/",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          })
            .then(res => {
        this.setState({
            records: res.data
        })
        setTimeout(function(){
            $('#tasks').DataTable();
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
                                    Tasks Listing
                                </CardHeader>
                                <Table id='tasks' responsive hover striped borderless className="align-middle mb-0">
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
                                    {this.state.records.map(( listValue, index ) => {
                                        return (
                                            <tr key={index} id={"Tooltip-id-" + listValue.uuid}>
                                                <td style={{cursor:"pointer"}}
                                                    onClick={() =>
                                                    window.open("/task/details/" + listValue.uuid, "_self")
                                                    }>{listValue.displayName}</td>
                                                <td>{listValue.uuid}</td>
                                                <td>{listValue.type}</td>
                                                <td>{listValue.status}</td>
                                                <td>{listValue.progress}</td>
                                                <UncontrolledTooltip placement="left" target={"Tooltip-id-" + listValue.uuid}>
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
        )
    }
}
