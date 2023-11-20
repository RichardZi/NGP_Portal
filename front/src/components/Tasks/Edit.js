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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

async function AddTask(Data) {
  const params = useParams();
  axios({
    method: "post",
    url: "http://127.0.0.1:8000/getTasks/" + params.taskId + "/",
    data: Data,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function(response) {
      //handle success
      console.log(response.data.refresh);

      window.location.href = "/tasks";
      return response.data.refresh;
    })
    .catch(function(response) {
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

export default function TasksAdd() {
  const params = useParams();
  const [type, setType] = useState();
  const [displayName, setDisplayName] = useState();
  const [status, setStatus] = useState();
  const [currentStep, setCurrentStep] = useState();
  const [totalStep, setTotalStep] = useState();
  const [progress, setProgress] = useState();
  const [totalErrorCount, setTotalErrorCount] = useState();
  const [dueDate, setDueDate] = useState();
  const [taskData, setTaskData] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let date =
      dueDate.getFullYear() +
      "-" +
      (dueDate.getMonth() + 1) +
      "-" +
      dueDate.getDate();
    //   console.log(date);
    await AddTask({
      type,
      displayName,
      status,
      currentStep,
      totalStep,
      progress,
      totalErrorCount,
      dueDate: date,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios(
      "http://127.0.0.1:8000/getTasks/" + params.taskId + "/"
    ).then(function(response) {
      setTaskData(response.data);
      setType(response.data.type);
      setDisplayName(response.data.displayName);
      setStatus(response.data.status);
      setCurrentStep(response.data.currentStep);
      setTotalStep(response.data.totalStep);
      setProgress(response.data.progress);
      setTotalErrorCount(response.data.totalErrorCount);
      setDueDate(response.data.dueDate);
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
                  <CardHeader>Task Details</CardHeader>
                  <Form onSubmit={handleSubmit}>
                    <CardBody>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="displayName">Display Name</Label>
                            <Input
                              type="text"
                              name="displayName"
                              id="displayName"
                              defaultValue={displayName}
                              required
                              readOnly
                              onChange={(e) => setDisplayName(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="type">Type</Label>
                            <Input
                              type="text"
                              name="type"
                              id="type"
                              defaultValue={type}
                              required
                              readOnly
                              onChange={(e) => setType(e.target.value)}
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
                              defaultValue={status}
                              required
                              readOnly
                              onChange={(e) => setStatus(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="progress">Progress</Label>
                            <Input
                              type="text"
                              name="progress"
                              id="progress"
                              defaultValue={progress}
                              required
                              readOnly
                              onChange={(e) => setProgress(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="currentStep">Current Step</Label>
                            <Input
                              type="number"
                              name="currentStep"
                              id="CurrentStep"
                              defaultValue={currentStep}
                              required
                              readOnly
                              onChange={(e) => setCurrentStep(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="totalStep">TotalStep</Label>
                            <Input
                              type="number"
                              name="totalStep"
                              id="totalStep"
                              defaultValue={totalStep}
                              required
                              readOnly
                              onChange={(e) => setTotalStep(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="totalErrorCount">
                              Total Error Count
                            </Label>
                            <Input
                              type="number"
                              name="totalErrorCount"
                              id="totalErrorCount"
                              defaultValue={totalErrorCount}
                              required
                              readOnly
                              onChange={(e) =>
                                setTotalErrorCount(e.target.value)
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
                              name="dueDate"
                              id="dueDate"
                              defaultValue={dueDate}
                              required
                              readOnly
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
