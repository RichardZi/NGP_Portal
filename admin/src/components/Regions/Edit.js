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
import { useParams } from "react-router-dom";

// async function getJobs(records) {
//     axios.get(`http://127.0.0.1:8000/apiViewSet/jobs/`)
//   .then(res => {
//       records = res.data;
    
//   })        
// }

export default function RegionsEdit() {
  const params = useParams();
    const [regions_name, setRegionName] = useState();
    const [regions_ref, setRegionRef] = useState();
    const [search_url, setSearchUrl] = useState();
    const [admin_url, setAdminUrl] = useState();
    const [workflow_url, setWorkflowUrl] = useState();

    const handleSubmit = async e => {
      e.preventDefault();
      let Data = {
        regions_name,
        regions_ref,
        search_url,
        admin_url,
        workflow_url
      };
      axios({
        method: "PUT",
        url:
          "http://127.0.0.1:8000/apiViewSet/region/" + params.regionId + "/",
        data: Data,
        headers: { "Content-Type": "multipart/form-data", "Authorization": 'Bearer ' + sessionStorage.getItem('token')  },
      }).then(function (response) {          
        window.location.href = '/regions';
        return response.data.refresh;
      }).catch(function (response) {
        console.log(response);
      });
    };

    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      await axios(
        {
          method: "get",
          url: "http://127.0.0.1:8000/apiViewSet/region/" + params.regionId + "/",
          headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
        }).then(function(response) {
          console.log(response);
          setRegionName(response.data.regions_name);
          setRegionRef(response.data.regions_ref);
          setSearchUrl(response.data.search_url);
          setAdminUrl(response.data.admin_url);
          setWorkflowUrl(response.data.workflow_url);
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
                                            Add Region
                                        </CardHeader>
                                        <Form onSubmit={handleSubmit}>
                                            <CardBody>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="regionName">Regions Name</Label>
                                                            <Input type="text"
                                                            defaultValue={regions_name} name="regions_name" id="regionName" required 
                                                            onChange={e => setRegionName(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="regionRef">Regions Ref</Label>
                                                            <Input type="text"
                                                            defaultValue={regions_ref} name="regions_ref" id="regionRef" required 
                                                            onChange={e => setRegionRef(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="searchUrl">Search URL</Label>
                                                            <Input type="text"
                                                            defaultValue={search_url} name="search_url" id="searchUrl" 
                                                            onChange={e => setSearchUrl(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="adminUrl">Admin URL</Label>
                                                            <Input type="text"
                                                            defaultValue={admin_url} name="admin_url" id="adminUrl"
                                                            onChange={e => setAdminUrl(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="workflowUrl">Workflow URL</Label>
                                                            <Input type="text"
                                                            defaultValue={workflow_url} name="workflow_url" id="workflowUrl" 
                                                            onChange={e => setWorkflowUrl(e.target.value)}/>
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
