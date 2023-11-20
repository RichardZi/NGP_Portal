import { useState, Component, Fragment, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  Row,
  Col,
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
  CardFooter,
} from "reactstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import Select from "react-select";

export default function InstancesEdit() {
  const params = useParams();
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
  const [instanceData, setInstanceData] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionIndex, setOptionIndex] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let jobId = selectedOption.value;
    let Data = {
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
      job: jobId,
    };
    axios({
      method: "PUT",
      url:
        "http://127.0.0.1:8000/getInstances/" + params.instanceId + "/",
      data: Data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function(response) {
        //handle success
        console.log(response.data.refresh);

        window.location.href = "/instances";
        return response.data.refresh;
      })
      .catch(function(response) {
        //handle error
        console.log(response);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/getInstances/" + params.instanceId + "/",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    }).then(function(response) {
      console.log(response);
      setInstanceData(response.data);
      setIpAddress(response.data.ipAddress);
      setExternalIpAddress(response.data.externalIpAddress);
      setMaster(response.data.master);
      setMatrices(response.data.matrices);
      setServices(response.data.services);
      setJobs(response.data.jobs);
      setAlerts(response.data.alerts);
      setState(response.data.state);
      setRecommendedServiceUnits(response.data.recommendedServiceUnits);
      setAllocatedServiceUnits(response.data.allocatedServiceUnits);
      setServiceUnitStatus(response.data.serviceUnitStatus);
      setServiceUnitStatusMessage(response.data.serviceUnitStatusMessage);
      setJob(response.data.job);

      axios({
        method: "get",
        url: "http://127.0.0.1:8000/getInstances/",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }).then(function(responseJobs) {
        let optionData = [];
        responseJobs.data.map((option, index) => {
          optionData.push({ value: option.id, label: option.name, isDisabled: true });
          if (response.data.job === option.id) {
            setSelectedOption({ value: option.id, label: option.name });
          }
        });
        setOptions(optionData);
      })
      
    });
  };

    // handleChange(selectedOption) {
    //     this.setState({selectedValue: selectedOption.target.value});
    // }

  return (
    <Fragment>
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Fragment>
          <Container fluid>
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardHeader>Instance Details</CardHeader>
                  <Form onSubmit={handleSubmit}>
                    <CardBody>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="ipAddress">IP Address</Label>
                            <Input
                              type="text"
                              name="ipAddress"
                              id="ipAddress"
                              value={instanceData.ipAddress}
                              required
                              readOnly
                              onChange={(e) => setIpAddress(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="externalIpAddress">
                              External IP Address
                            </Label>
                            <Input
                              type="text"
                              name="externalIpAddress"
                              id="externalIpAddress"
                              value={instanceData.externalIpAddress}
                              required
                              readOnly
                              onChange={(e) =>
                                setExternalIpAddress(e.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Input
                              type="checkbox"
                              name="master"
                              id="master"
                              defaultChecked={instanceData.master}
                              required
                              readOnly
                              className="ml-0"
                              disabled
                              onChange={(e) => setMaster(e.target.value)}
                            />
                            <Label for="master" className="ml-4">
                              Master
                            </Label>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="matrices">Metrices</Label>
                            <textarea className="form-control" readOnly>{instanceData.matrices}</textarea>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="services">Services</Label>
                            <textarea className="form-control" readOnly>{instanceData.services}</textarea>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="jobs">Jobs</Label>
                            <textarea className="form-control" readOnly>{instanceData.jobs}</textarea>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="alerts">Alerts</Label>
                            <textarea className="form-control" readOnly>{instanceData.alerts}</textarea>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="state">State</Label>
                            <Input
                              type="text"
                              name="state"
                              id="state"
                              value={instanceData.state}
                              required
                              readOnly
                              onChange={(e) => setState(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="recommendedServiceUnits">
                              Recommended Service Units
                            </Label>
                            <Input
                              type="number"
                              name="recommendedServiceUnits"
                              id="recommendedServiceUnits"
                              value={
                                instanceData.recommendedServiceUnits
                              }
                              required
                              readOnly
                              onChange={(e) =>
                                setRecommendedServiceUnits(e.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="allocatedServiceUnits">
                              Allocated Service Units
                            </Label>
                            <Input
                              type="number"
                              name="allocatedServiceUnits"
                              id="allocatedServiceUnits"
                              value={instanceData.allocatedServiceUnits}
                              required
                              readOnly
                              onChange={(e) =>
                                setAllocatedServiceUnits(e.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="serviceUnitStatus">
                              Service Unit Status
                            </Label>
                            <Input
                              type="text"
                              name="serviceUnitStatus"
                              id="serviceUnitStatus"
                              value={instanceData.serviceUnitStatus}
                              required
                              readOnly
                              onChange={(e) =>
                                setServiceUnitStatus(e.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="serviceUnitStatusMessage">
                              Service Unit Status Message
                            </Label>
                            <Input
                              type="text"
                              name="serviceUnitStatusMessage"
                              id="serviceUnitStatusMessage"
                              value={
                                instanceData.serviceUnitStatusMessage
                              }
                              required
                              readOnly
                              onChange={(e) =>
                                setServiceUnitStatusMessage(e.target.value)
                              }
                            />
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
                              isDisabled={true}
                              options={options}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                    {/* <CardFooter className="d-block text-right">
                      <Button
                        size="lg"
                        className="btn-shadow-primary"
                        color="primary"
                      >
                        Submit
                      </Button>
                    </CardFooter> */}
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
        </Fragment>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
}
