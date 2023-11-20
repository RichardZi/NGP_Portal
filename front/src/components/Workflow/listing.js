import React, {Component, Fragment, useEffect, useState} from 'react';
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
    Form,
    FormGroup,
    Label,
    Input,
    ListGroupItem, ListGroup, CardBody
} from 'reactstrap';
import Select from "react-select";

export default function WorkflowListing() {
    const [records, setRecords] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [query, setQuery] = useState();
    let [data, setData] = useState([]);
    
    data = [
        {
            name: "workflow-1",
            modelVersion: "modelVersion",
            description: "description",
            uuid: "1",
            pipelines: [
                {
                    name: "pipeline-1",
                    modelVersion: "modelVersion",
                    type: "type",
                    uuid: "2",
                    description: "description"

                },
                {
                    name: "pipeline-2",
                    modelVersion: "modelVersion",
                    type: "type",
                    uuid: "3",
                    description: "description"
                },
                {
                    name: "pipeline-3",
                    modelVersion: "modelVersion",
                    type: "type",
                    uuid: "4",
                    description: "description"
                }
            ]
        },
        {

            name: "workflow-2",
            modelVersion: "modelVersion",
            description: "description",
            uuid: "5",
            pipelines: [
                {
                    name: "pipeline-4",
                    modelVersion: "modelVersion",
                    type: "type",
                    uuid: "6",
                    description: "description"

                },
                {
                    name: "pipeline-5",
                    modelVersion: "modelVersion",
                    type: "type",
                    uuid: "7",
                    description: "description"
                },
                {
                    name: "pipeline-6",
                    modelVersion: "modelVersion",
                    type: "type",
                    uuid: "8",
                    description: "description"
                }
            ]
        },
    ]

    useEffect(() => {
        
        setTimeout(function(){
            $('#workflows').DataTable();
        } ,1000);
      }, [data])
        return (
            <Fragment>
                <Container fluid>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardHeader>
                                    Workflows
                                </CardHeader>
                                <CardBody>
                                    <Table id="workflows" responsive hover striped borderless className="align-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>UUID</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {data.map(( listValue, index ) => {
                                            return (
                                                <tr key={index}>
                                                    <td style={{cursor:"pointer"}}
                                                    onClick={() =>
                                                    window.open("/workflow/" + listValue.uuid + "/pipelines/", "_self")
                                                    }>{listValue.name}</td>
                                                    <td>
                                                        {listValue.uuid}
                                                    </td>
                                                    
                                                </tr>
                                                );
                                            })
                                        }
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
}
