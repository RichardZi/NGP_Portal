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
import Multiselect from 'multiselect-react-dropdown';
import Select from "react-select";

export default function RegionEdit() {
  const params = useParams();
  const [tenants_name, setTenantName] = useState();
  const [tenants_ref, setTenantRef] = useState();
  const [regionz, setRregionz] = useState();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let selectionList = [];
        selectedOption.map((option, index) => {
            selectionList.push(option.value)
        })
    let Data = {
      tenants_name,
      tenants_ref,
      regionz: selectionList
    };
    axios({
      method: "PUT",
      url:
        "http://127.0.0.1:8000/apiViewSet/tenant/" + params.tenantId + "/",
      data: Data,
      headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + sessionStorage.getItem('token')  },
    })
      .then(function(response) {
        //handle success
        console.log(response.data.refresh);

        window.location.href = "/tenants";
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
    await axios(
      {
        method: "get",
        url: "http://127.0.0.1:8000/apiViewSet/tenant/" + params.tenantId + "/",
        headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
      }
    ).then(function(response) {
      console.log(response);
      setTenantName(response.data.tenants_name);
      setTenantRef(response.data.tenants_ref);
      setRregionz(response.data.regionz);

      axios({
        method: "get",
        url: "http://127.0.0.1:8000/apiViewSet/region/",
        headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
      }).then((res) => {
        let optionData = [];
        console.log(res.data);
        let selectedOptionsArr = [];
        res.data.map((option, index) => {
            optionData.push({ value: option.id, label: option.regions_name});
            
            if (response.data.regionz.indexOf(option.id) > -1 ) {
              selectedOptionsArr.push({ value: option.id, label: option.regions_name});
            }
          });
          setOptions(optionData);
          setSelectedOption(selectedOptionsArr);
      });
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
                  <CardHeader>Tenant Details</CardHeader>
                  <Form onSubmit={handleSubmit}>
                  <CardBody>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="regionName">Tenants Name</Label>
                                <Input type="text" name="tenants_name" id="tenantName" required 
                                defaultValue={tenants_name}
                                onChange={e => setTenantName(e.target.value)}/>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="regionRef">Tenants Ref</Label>
                                <Input type="text" name="tenants_ref" id="tenantRef" required 
                                defaultValue={tenants_ref}
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
  );
}
