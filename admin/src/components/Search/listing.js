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
import JwPagination from 'jw-react-pagination';

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


export default function SearchListing() {
    const [records, setRecords] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [data, setData] = useState([]);
    const [query, setQuery] = useState();
    const [pageOfItems, setPageOfItems] = useState([]);
    const handleSubmit = async e => {
        e.preventDefault();
        let Data = {
            "search_by": selectedOption.value,
            "q": query
        }
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/searchKeywordApi/",
            data: Data,
            headers: { "Content-Type": "multipart/form-data", "Authorization": 'Bearer ' + sessionStorage.getItem('token') },
        }).then(function (response) {
            setTimeout(function(){
                $('#search').DataTable().destroy();
                if(response.data != null) {
                    setData(response.data)
                }
            } ,2000);
        }).catch(function (response) {
        });
    }

    useEffect(() => {
        getDropdownValue();        
        $('#search').DataTable({
            "language": {
                           "processing": '<i class="fa fa-spinner fa-spin" style="font-size:24px;color:rgb(75, 183, 245);"></i>'
                        }
          });
      }, [data])

      const getDropdownValue=async()=>{

        axios({
            method: "get",
            url: "http://127.0.0.1:8000/searchIndexApi/",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }).then(response => {
            let optionData = [];
            console.log(response.data.data)
            response.data.data.map((option, index) => {
                optionData.push({ value: option, label: option });
                if(index === 0) {
                    setSelectedOption({ value: option, label: option });
                }
            });
            setRecords(optionData);
          })
        
      }
        return (
            <Fragment>
                <Container fluid>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardHeader>
                                    Search
                                    <Form onSubmit={handleSubmit} className="w-100 mt-3 ml-3">
                                        <Row form>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Select
                                                        value={selectedOption}
                                                        onChange={setSelectedOption}
                                                        name="task"
                                                        id="task-select"
                                                        options={records}
                                                    />
                                                </FormGroup>

                                            </Col>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Input type="text" name="query" id="query" 
                                                            onChange={e => setQuery(e.target.value)}/>
                                                </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                                <Button size="lg" className="btn-shadow-primary"
                                                        color="primary">Search</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardHeader>
                                <CardBody>
                                    <Table id="search" responsive hover striped borderless className="align-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th>Results</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {data.map(( listValue, index ) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <div className='d-flex m-1'>
                                                            <span className='w-25'>{listValue.hci_display_name[0].split('.').slice(0, -1).join('.')}</span>
                                                            <span className='w-75'></span>
                                                        </div>
                                                        <div className='d-flex m-1'>
                                                            <span className='w-25'>Content Type</span>
                                                            <span className='w-75'>
                                                                <span className='btn btn-primary'>
                                                                    {listValue.content_type}
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div className='d-flex m-1'>
                                                            <span className='w-25'>HCI URI</span>
                                                            <span className='w-75'>
                                                                <span className='btn btn-primary'>
                                                                    {listValue.hci_uri}
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div className='d-flex m-1'>
                                                            <span className='w-25'>HCI data source name</span>
                                                            <span className='w-75'>
                                                                <span className='btn btn-primary'>
                                                                    {listValue.hci_data_source_name}
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div className='d-flex m-1'>
                                                            <span className='w-25'>HCI data source uuid</span>
                                                            <span className='w-75'>
                                                                <span className='btn btn-primary'>
                                                                    {listValue.hci_data_source_uuid}
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div className='d-flex m-1'>
                                                            <span className='w-25'>HCI display name</span>
                                                            <span className='w-75'>
                                                                <span className='btn btn-primary'>
                                                                    {listValue.hci_display_name}
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div className='d-flex m-1'>
                                                            <span className='w-25'>HCI doc version</span>
                                                            <span className='w-75'>
                                                                <span className='btn btn-primary'>
                                                                    {listValue.hci_doc_version}
                                                                </span>
                                                            </span>
                                                        </div>
                                                        <div className='d-flex m-1'>
                                                            <span className='w-25'>HCI id</span>
                                                            <span className='w-75'>
                                                                <span className='btn btn-primary'>
                                                                    {listValue.hci_id}
                                                                </span>
                                                            </span>
                                                        </div>
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
