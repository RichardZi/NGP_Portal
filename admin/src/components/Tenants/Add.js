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

async function AddTenant(Data) {

    axios({
        method: "post",
        url: "http://127.0.0.1:8000/apiViewSet/tenant/",
        data: Data,
        headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + sessionStorage.getItem('token') },
      }).then(function (response) {          
          window.location.href = '/tenants';
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

export default function TenantsAdd() {
    const [tenants_name, setTenantName] = useState();
    const [tenants_ref, setTenantRef] = useState();
    const [regionz, setRregionz] = useState();
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSubmit = async e => {
      e.preventDefault();
      let selectionList = [];
        selectedOption.map((option, index) => {
            selectionList.push(option.value)
        })
      console.log(regionz);
      await AddTenant({
        tenants_name,
        tenants_ref,
        regionz: selectionList
      });
    };
    
    useEffect(() => {
        getData();
      }, []);
    
      const getData = async () => {
        axios({
            method: "get",
            url: "http://127.0.0.1:8000/get_regions/",
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
                                            Add Tenant
                                        </CardHeader>
                                        <Form onSubmit={handleSubmit}>
                                            <CardBody>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="regionName">Tenants Name</Label>
                                                            <Input type="text" name="regions_name" id="regionName" required 
                                                            onChange={e => setTenantName(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="regionRef">Tenants Ref</Label>
                                                            <Input type="text" name="regions_ref" id="regionRef" required 
                                                            onChange={e => setTenantRef(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row from>
                                                    <Col md={6}>
                                                    <Label for="regionz">Regions</Label>
                                                    <Select
                                                        isMulti
                                                        value={selectedOption}
                                                        onChange={setSelectedOption}
                                                        name="job"
                                                        id="job-select"
                                                        options={options}
                                                        className="basic-multi-select"
                                                        />
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
