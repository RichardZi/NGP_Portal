import {useState, Component, Fragment, useEffect} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Container,
    Card,
    CardHeader,
    Table,
    Button,
    CardBody,
    FormGroup,
    Label,
    Input,
    Form,
    CardFooter
} from 'reactstrap';
import AsyncSelect from 'react-select/lib/Async';
import axios from 'axios';
import Select from "react-select";

async function AddInstance(Data) {

    axios({
        method: "post",
        url: "http://127.0.0.1:8000/getInstances/",
        data: Data,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
          //handle success
          console.log(response.data.refresh);
          
          window.location.href = '/instances';
        return response.data.refresh;
        }).catch(function (response) {
          //handle error
          console.log(response);
        });
}

// async function getJobs(records) {
//     axios.get(`http://127.0.0.1:8000/getJobs/`)
//   .then(res => {
//       records = res.data;
    
//   })        
// }

export default function InstancesAdd() {
    const [ipAddress, setIpAddress] = useState();
    const [externalIpAddress, setExternalIpAddress] = useState();
    const [master, setMaster] = useState();
    const [matrices, setMatrices] = useState();
    const [services, setServices] = useState();
    const [jobs, setJobs] = useState();
    const [alerts, setAlerts] = useState();
    const [state, setState] = useState();
    const [recommendedServiceUnits, setRecommendedServiceUnits] = useState();
    const [allocatedServiceUnits, setAllocatedServiceUnits] = useState();
    const [serviceUnitStatus, setServiceUnitStatus] = useState();
    const [serviceUnitStatusMessage, setServiceUnitStatusMessage] = useState();
    const [job, setJob] = useState(1);
    const [records, setRecords] = useState([]);
    const [optionIndex, setOptionIndex] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    
    const handleSubmit = async e => {
      e.preventDefault();
      let jobId = selectedOption.value;
      await AddInstance({
        ipAddress,
        externalIpAddress,
        master,
        matrices,
        services,
        jobs,
        alerts,
        state,
        recommendedServiceUnits,
        allocatedServiceUnits,
        serviceUnitStatus,
        serviceUnitStatusMessage,
        job: jobId
      });
    };
    
    useEffect(() => {
        getJobs();
      }, [])

      const getJobs=async()=>{
        axios({
            method: "get",
            url: "http://127.0.0.1:8000/getJobs/",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          })
        .then(function(response) {
            let optionData = [];
            response.data.map((option, index) => {
                optionData.push({value:option.id, label:option.name})
                if(index === 0) {
                    setSelectedOption({ value: option.id, label: option.name });
                }
            });
            setRecords(optionData)    
        });
      }

        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Fragment>
                        <Container fluid>
                            <Row>
                                <Col md="12">
                                    <Card className="main-card mb-3">
                                        <CardHeader>
                                            Add Instance
                                        </CardHeader>
                                        <Form onSubmit={handleSubmit}>
                                            <CardBody>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="ipAddress">IP Address</Label>
                                                            <Input type="text" name="ipAddress" id="ipAddress" required 
                                                            onChange={e => setIpAddress(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="externalIpAddress">External IP Address</Label>
                                                            <Input type="text" name="externalIpAddress" id="externalIpAddress" required 
                                                            onChange={e => setExternalIpAddress(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Input type="checkbox" name="master" id="master" required className='ml-0'
                                                            onChange={e => setMaster(e.target.value)}/>
                                                            <Label for="master" className='ml-4'>Master</Label>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="matrices">Matrices</Label>
                                                            <Input type="text" name="matrices" id="matrices" required
                                                            onChange={e => setMatrices(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="services">Services</Label>
                                                            <Input type="text" name="services" id="services" required
                                                            onChange={e => setServices(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="jobs">Jobs</Label>
                                                            <Input type="text" name="jobs" id="jobs" required
                                                            onChange={e => setJobs(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="alerts">Alerts</Label>
                                                            <Input type="text" name="alerts" id="alerts" required
                                                            onChange={e => setAlerts(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="state">State</Label>
                                                            <Input type="text" name="state" id="state" required
                                                            onChange={e => setState(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="recommendedServiceUnits">Recommended Service Units</Label>
                                                            <Input type="number" name="recommendedServiceUnits" id="recommendedServiceUnits" required
                                                            onChange={e => setRecommendedServiceUnits(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="allocatedServiceUnits">Allocated Service Units</Label>
                                                            <Input type="number" name="allocatedServiceUnits" id="allocatedServiceUnits" required
                                                            onChange={e => setAllocatedServiceUnits(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="serviceUnitStatus">Service Unit Status</Label>
                                                            <Input type="text" name="serviceUnitStatus" id="serviceUnitStatus" required
                                                            onChange={e => setServiceUnitStatus(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="serviceUnitStatusMessage">Service Unit Status Message</Label>
                                                            <Input type="text" name="serviceUnitStatusMessage" id="serviceUnitStatusMessage" required
                                                            onChange={e => setServiceUnitStatusMessage(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="job">Job</Label>
                                                            
                                                            <Select
                                                                value={selectedOption}
                                                                onChange={setSelectedOption}
                                                                name="job"
                                                                id="job-select"
                                                                options={records}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                            <CardFooter className="d-block text-right">
                                                <Button size="lg" className="btn-shadow-primary"
                                                        color="primary">Submit</Button>
                                            </CardFooter>
                                        </Form>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Fragment>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    
}
