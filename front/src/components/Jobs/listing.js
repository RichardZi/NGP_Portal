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
//     axios.get(`http://127.0.0.1:8000/getJobs/`)
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
        axios({
            method: "get",
            url: "http://127.0.0.1:8000/getJobs/",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }).then(res => {
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
                                <Table id='jobs' responsive hover striped borderless className="align-middle mb-0">
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
                                            <tr key={index} id={"Tooltip-id-" + listValue.uuid}>
                                                <td style={{cursor:"pointer"}}
                                                    onClick={() =>
                                                    window.open("/job/details/" + listValue.uuid, "_self")
                                                    }>{listValue.name}</td>
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
                </Container>
            </Fragment>
        )
    }
}
