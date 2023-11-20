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
import AsyncSelect from "react-select/lib/Async";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import Select from "react-select";

async function EditJob(Data) {
  const params = useParams();
  axios({
    method: "post",
    url: "http://127.0.0.1:8000/apiViewSet/jobs/" + params.jobId + "/",
    data: Data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function(response) {
      //handle success
      console.log(response.data.refresh);

      window.location.href = "/jobs";
      return response.data.refresh;
    })
    .catch(function(response) {
      //handle error
      console.log(response);
    });
}

// async function getJobs(records) {
//     axios.get(`http://127.0.0.1:8000/apiViewSet/jobs/`)
//   .then(res => {
//       records = res.data;

//   })
// }

export default function JobsEdit() {
  const params = useParams();
  const [type, setType] = useState();
  const [name, setName] = useState();
  const [status, setStatus] = useState();
  const [currentStep, setCurrentStep] = useState();
  const [totalStep, setTotalStep] = useState();
  const [steps, setSteps] = useState();
  const [stepReports, setStepReports] = useState();
  const [totalErrorCount, setTotalErrorCount] = useState();
  const [serviceUnits, setServiceUnits] = useState();
  const [executionInstanceId, setExecutionInstanceId] = useState();
  const [instanceMetrics, setInstanceMetrics] = useState();
  const [dueDate, setDueDate] = useState();
  const [task, setTask] = useState(1);
  const [records, setRecords] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [optionIndex, setOptionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let taskId = selectedOption.value;
    let date =
      dueDate.getFullYear() +
      "-" +
      (dueDate.getMonth() + 1) +
      "-" +
      dueDate.getDate();
    //   console.log(date);
    await EditJob({
      type,
      name,
      status,
      currentStep,
      totalStep,
      steps,
      stepReports,
      totalErrorCount,
      serviceUnits,
      executionInstanceId,
      instanceMetrics,
      dueDate: date,
      task: taskId,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios(
      "http://127.0.0.1:8000/apiViewSet/jobs/" + params.jobId + "/"
    ).then(function(response) {
      setJobData(response.data);
      setType(response.data.setType);
      setName(response.data.name);
      setStatus(response.data.status);
      setCurrentStep(response.data.currentStep);
      setTotalStep(response.data.totalStep);
      setSteps(response.data.steps);
      setStepReports(response.data.stepReports);
      setTotalErrorCount(response.data.totalErrorCount);
      setServiceUnits(response.data.serviceUnits);
      setExecutionInstanceId(response.data.instanceId);
      setInstanceMetrics(response.data.instanceMetrics);
      setDueDate(response.data.dueDate);
      setTask(response.data.task);
    });

    await axios("http://127.0.0.1:8000/apiViewSet/tasks/").then(function(
      response
    ) {
      setRecords(response.data);
      let optionData = [];
        response.data.map((option, index) => {
            optionData.push({value:option.id, label:option.displayName})
            if(task === option.id) {
              setSelectedOption({ value: option.id, label: option.displayName });
            }
        });
        setRecords(optionData);
    });
  };

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
                  <CardHeader>Job Details</CardHeader>
                  <Form onSubmit={handleSubmit}>
                    <CardBody>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="type">Type</Label>
                            <Input
                              type="text"
                              name="type"
                              id="type"
                              defaultValue={jobData.type}
                              required
                              readOnly
                              onChange={(e) => setType(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              defaultValue={jobData.name}
                              required
                              readOnly
                              onChange={(e) => setName(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="status">Status</Label>
                            <Input
                              type="text"
                              name="status"
                              id="status"
                              defaultValue={jobData.status}
                              required
                              readOnly
                              onChange={(e) => setStatus(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="currentStep">Current Step</Label>
                            <Input
                              type="number"
                              name="currentStep"
                              id="currentStep"
                              defaultValue={jobData.currentStep}
                              required
                              readOnly
                              onChange={(e) => setCurrentStep(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="totalStep">Total Step</Label>
                            <Input
                              type="number"
                              name="totalStep"
                              id="totalStep"
                              defaultValue={jobData.totalStep}
                              required
                              readOnly
                              onChange={(e) => setTotalStep(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="steps">Steps</Label>
                            <Input
                              type="number"
                              name="steps"
                              id="steps"
                              defaultValue={jobData.steps}
                              required
                              readOnly
                              onChange={(e) => setSteps(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="stepReports">Step Reports</Label>
                            <Input
                              type="number"
                              name="stepReports"
                              id="stepReports"
                              defaultValue={jobData.stepReports}
                              required
                              readOnly
                              onChange={(e) => setStepReports(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="totalErrorCount">
                              Total Error Count
                            </Label>
                            <Input
                              type="number"
                              name="totalErrorCount"
                              id="totalErrorCount"
                              defaultValue={jobData.totalErrorCount}
                              required
                              readOnly
                              onChange={(e) =>
                                setTotalErrorCount(e.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="serviceUnits">Service Units</Label>
                            <Input
                              type="number"
                              name="serviceUnits"
                              id="serviceUnits"
                              defaultValue={jobData.serviceUnits}
                              required
                              readOnly
                              onChange={(e) => setServiceUnits(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="executionInstanceId">
                              Execution Instance ID
                            </Label>
                            <Input
                              type="number"
                              name="executionInstanceId"
                              id="executionInstanceId"
                              defaultValue={jobData.executionInstanceId}
                              required
                              readOnly
                              onChange={(e) =>
                                setExecutionInstanceId(e.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="instanceMetrics">
                              Instance Metrics
                            </Label>
                            <Input
                              type="text"
                              name="instanceMetrics"
                              id="instanceMetrics"
                              defaultValue={jobData.instanceMetrics}
                              required
                              readOnly
                              onChange={(e) =>
                                setInstanceMetrics(e.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="dueDate" className="d-block">
                              DueDate
                            </Label>
                            <Input
                              type="text"
                              name="duedate"
                              id="duedate"
                              defaultValue={jobData.dueDate}
                              required
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="task">Task</Label>
                            <Select
                              value={selectedOption}
                              onChange={setSelectedOption}
                              name="task"
                              id="task-select"
                              options={records}
                              isDisabled={true}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
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
