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
            "search_folder": selectedOption.value,
            "query": query
        }
        axios({
            method: "post",
            url: "http://127.0.0.1:8000/SearchIndexes/",
            data: Data,
            headers: { "Content-Type": "multipart/form-data", "Authorization": 'Bearer ' + sessionStorage.getItem('token') },
        }).then(function (response) {
            setData(response.data)
            console.log(response.data[0]);
        }).catch(function (response) {
            //handle error
            console.log(response);
        });
    }

    // bind the onChangePage method to this React component
    // this.onChangePage = this.onChangePage.bind(this);

    // onChangePage(pageOfItems) {
    //     // update local state with new page of items
    //     this.setState({pageOfItems});
    // }

    useEffect(() => {
        getDropdownValue();
        console.log($('#search'));
        // setTimeout(function(){
        //     $('#search').DataTable();
        // } ,1000);
        
      }, [])

      const getDropdownValue=async()=>{

        axios({
            method: "post",
            url: "http://127.0.0.1:8000/getIndexesFolders/",
            headers: { "Content-Type": "multipart/form-data", "Authorization": 'Bearer ' + sessionStorage.getItem('token') },
        }).then(function (response) {
            let optionData = [];
            console.log(response.data);
            response.data.map((option, index) => {
                optionData.push({ value: option.hci_display_name, label: option.hci_display_name });
                if(index === 0) {
                    setSelectedOption({ value: option.hci_display_name, label: option.hci_display_name });
                }
            });
            setRecords(optionData);
            $('#search').DataTable();
        }).catch(function (response) {
            //handle error
            console.log(response);
        });
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
                                                    <td>{listValue.content_type}
                                                    
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
