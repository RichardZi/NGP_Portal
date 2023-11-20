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
import Multiselect from 'multiselect-react-dropdown';

async function AddIntegerTable(Data) {

    axios({
        method: "post",
        url: "http://127.0.0.1:8000/apiViewSet/integerTable/",
        data: Data,
        headers: { "Content-Type": "multipart/form-data", "Authorization": 'Bearer ' + sessionStorage.getItem('token') },
      }).then(function (response) {          
          window.location.href = '/integer-tables';
        return response.data.refresh;
        }).catch(function (response) {
          console.log(response);
        });
}

// async function getJobs(records) {
//     axios.get(`http://127.0.0.1:8000/apiViewSet/jobs/`)
//   .then(res => {
//       records = res.data;
    
//   })        
// }

export default function IntegerTableAdd() {
    const [address, setAddress] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [END_POINT, setENDPOINT] = useState();
    const [Access_KEY, setAccessKEY] = useState();
    const [Acess_Secret_key, setAcessSecretkey] = useState();
    const [Attach_bucket, setAttachbucket] = useState();
    const [regions, setRegions] = useState();
    const [ip_add, setIpAdd] = useState();
    const [port, setPort] = useState();
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSubmit = async e => {
      e.preventDefault();
      
      await AddIntegerTable({
        address,
        username,
        password,
        END_POINT,
        Access_KEY,
        Acess_Secret_key,
        Attach_bucket,
        regions:selectedOption.value,
        ip_add,
        port
      });
    };

    useEffect(() => {
        getData();
      }, []);
    
      const getData = async () => {
        axios({
            method: "get",
            url: "http://127.0.0.1:8000/apiViewSet/region/",
            headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
          }).then((res) => {
            let optionData = [];
            console.log(res.data);
            res.data.map((option, index) => {
                optionData.push({ value: option.id, label: option.regions_name});
              });
              setOptions(optionData);
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
                                            Add IntegerTable
                                        </CardHeader>
                                        <Form onSubmit={handleSubmit}>
                                            <CardBody>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="address">Address</Label>
                                                            <Input type="text" name="address" id="address" required 
                                                            onChange={e => setAddress(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="username">Username</Label>
                                                            <Input type="text" name="username" id="username" required 
                                                            onChange={e => setUsername(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="password">Password</Label>
                                                            <Input type="text" name="password" id="password" required 
                                                            onChange={e => setPassword(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="end_point">End Point</Label>
                                                            <Input type="text" name="end_point" id="end_point" required 
                                                            onChange={e => setENDPOINT(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="access_key">Access Key</Label>
                                                            <Input type="text" name="access_key" id="access_key" required 
                                                            onChange={e => setAccessKEY(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="access_secret_key">Access Secret Key</Label>
                                                            <Input type="text" name="access_secret_key" id="access_secret_key" required 
                                                            onChange={e => setAcessSecretkey(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="attach_bucket">Attach Bucket</Label>
                                                            <Input type="text" name="attach_bucket" id="attach_bucket" required 
                                                            onChange={e => setAttachbucket(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Label for="regionz">Regions</Label>
                                                            <Select
                                                                onChange={setSelectedOption}
                                                                name="region"
                                                                id="region-select"
                                                                options={options}
                                                            />
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="ip_address">IP Address</Label>
                                                            <Input type="text" name="ip_address" id="ip_address" required 
                                                            onChange={e => setIpAdd(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="port">Port</Label>
                                                            <Input type="text" name="port" id="port" required 
                                                            onChange={e => setPort(e.target.value)}/>
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
