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
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


async function AddTask(Data) {

    axios({
        method: "post",
        url: "http://127.0.0.1:8000/getTasks/",
        data: Data,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
          //handle success
          console.log(response.data.refresh);
          
          window.location.href = '/tasks';
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

export default function TasksAdd() {
    const [type, setType] = useState();
    const [displayName, setDisplayName] = useState();
    const [status, setStatus] = useState();
    const [currentStep, setCurrentStep] = useState();
    const [totalStep, setTotalStep] = useState();
    const [progress, setProgress] = useState();
    const [totalErrorCount, setTotalErrorCount] = useState();
    const [dueDate, setDueDate] = useState();
    
    const handleSubmit = async e => {
      e.preventDefault();
      let date = dueDate.getFullYear() + '-' + (dueDate.getMonth() + 1) + "-" + dueDate.getDate()
    //   console.log(date);
      await AddTask({
        type,
        displayName,
        status,
        currentStep,
        totalStep,
        progress,
        totalErrorCount,
        dueDate: date
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
                    transitionLeave={false}>
                    <Fragment>
                        <Container fluid>
                            <Row>
                                <Col md="12">
                                    <Card className="main-card mb-3">
                                        <CardHeader>
                                            Add Task
                                        </CardHeader>
                                        <Form onSubmit={handleSubmit}>
                                            <CardBody>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="displayName">Display Name</Label>
                                                            <Input type="text" name="displayName" id="displayName" required 
                                                            onChange={e => setDisplayName(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="type">Type</Label>
                                                            <Input type="text" name="type" id="type" required 
                                                            onChange={e => setType(e.target.value)}/>
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
                                                            <Label for="progress">Progress</Label>
                                                            <Input type="text" name="progress" id="progress" required
                                                            onChange={e => setProgress(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="currentStep">Current Step</Label>
                                                            <Input type="number" name="CurrentStep" id="CurrentStep" required
                                                            onChange={e => setCurrentStep(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="totalStep">TotalStep</Label>
                                                            <Input type="number" name="totalStep" id="totalStep" required
                                                            onChange={e => setTotalStep(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="totalErrorCount">Total Error Count</Label>
                                                            <Input type="number" name="totalErrorCount" id="totalErrorCount" required
                                                            onChange={e => setTotalErrorCount(e.target.value)}/>
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
