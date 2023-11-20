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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

async function AddJob(Data) {

    axios({
        method: "post",
        url: "http://127.0.0.1:8000/apiViewSet/jobs/",
        data: Data,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
          //handle success
          console.log(response.data.refresh);
          
          window.location.href = '/jobs';
        return response.data.refresh;
        }).catch(function (response) {
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

export default function JobsAdd() {
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
    const [selectedOption, setSelectedOption] = useState(null);
    
    const handleSubmit = async e => {
      e.preventDefault();
      let taskId = selectedOption.value;
      let date = dueDate.getFullYear() + '-' + (dueDate.getMonth() + 1) + "-" + dueDate.getDate()
    //   console.log(date);
      await AddJob({
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
        task: taskId
      });
    };
    
    useEffect(() => {
        gettasks();
      }, [])

      const gettasks=async()=>{
        await axios("http://127.0.0.1:8000/apiViewSet/tasks/").then(function(
            response
            ) {
            let optionData = [];
            response.data.map((option, index) => {
                optionData.push({ value: option.id, label: option.name });
                if(index === 0) {
                    console.log({ value: option.id, label: option.name });
                    setSelectedOption({ value: option.id, label: option.name });
                }
            });
            setRecords(optionData);
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
                                            Add Job
                                        </CardHeader>
                                        <Form onSubmit={handleSubmit}>
                                            <CardBody>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="type">Type</Label>
                                                            <Input type="text" name="type" id="type" required 
                                                            onChange={e => setType(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="name">Name</Label>
                                                            <Input type="text" name="name" id="name" required 
                                                            onChange={e => setName(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="status">Status</Label>
                                                            <Input type="text" name="status" id="status" required 
                                                            onChange={e => setStatus(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="currentStep">Current Step</Label>
                                                            <Input type="number" name="currentStep" id="currentStep" required
                                                            onChange={e => setCurrentStep(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="totalStep">Total Step</Label>
                                                            <Input type="number" name="totalStep" id="totalStep" required
                                                            onChange={e => setTotalStep(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="steps">Steps</Label>
                                                            <Input type="number" name="steps" id="steps" required
                                                            onChange={e => setSteps(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="stepReports">Step Reports</Label>
                                                            <Input type="number" name="stepReports" id="stepReports" required
                                                            onChange={e => setStepReports(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="totalErrorCount">Total Error Count</Label>
                                                            <Input type="number" name="totalErrorCount" id="totalErrorCount" required
                                                            onChange={e => setTotalErrorCount(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="serviceUnits">Service Units</Label>
                                                            <Input type="number" name="serviceUnits" id="serviceUnits" required
                                                            onChange={e => setServiceUnits(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="executionInstanceId">Execution Instance ID</Label>
                                                            <Input type="number" name="executionInstanceId" id="executionInstanceId" required
                                                            onChange={e => setExecutionInstanceId(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="instanceMetrics">Instance Metrics</Label>
                                                            <Input type="text" name="instanceMetrics" id="instanceMetrics" required
                                                            onChange={e => setInstanceMetrics(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="dueDate" className='d-block'>DueDate</Label>
                                                            <DatePicker dateFormat="yyyy-MM-dd" selected={dueDate} onChange={(date:Date) => setDueDate(date)} className="form-control"/>
                                                            {/* <Input type="text" name="dueDate" id="dueDate" required
                                                            onChange={e => setDueDate(e.target.value)}/> */}
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
