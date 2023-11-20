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
import Select from "react-select";
import Multiselect from "multiselect-react-dropdown";
import { useParams } from "react-router-dom";

export default function IntegerTableEdit() {
  const params = useParams();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let Data = {
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
    };
    axios({
      method: "PUT",
      url:
        "http://127.0.0.1:8000/apiViewSet/integerTable/" + params.IntId + "/",
      data: Data,
      headers: { "Content-Type": "multipart/form-data", "Authorization": 'Bearer ' + sessionStorage.getItem('token')  },
    })
      .then(function(response) {
        //handle success
        console.log(response.data.refresh);

        window.location.href = "/integer-tables";
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
        url: "http://127.0.0.1:8000/apiViewSet/integerTable/" + params.IntId + "/",
        headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
      }
    ).then(function(response) {
      console.log(response);
      setAddress(response.data.address);
      setPassword(response.data.password);
      setUsername(response.data.username);
      setENDPOINT(response.data.END_POINT);
      setAccessKEY(response.data.Access_KEY);
      setAcessSecretkey(response.data.Acess_Secret_key);
      setAttachbucket(response.data.Attach_bucket);
      setIpAdd(response.data.ip_add);
      setPort(response.data.port);

      axios(
        {
          method: "get",
          url: "http://127.0.0.1:8000/apiViewSet/region/",
          headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
        }
      ).then(function(responseRegion) {
        let optionData = [];
        responseRegion.data.map((option, index) => {
          optionData.push({ value: option.id, label: option.regions_name });
          if (response.data.regions === option.id) {
            setSelectedOption({ value: option.id, label: option.regions_name });
          }
        });
        setOptions(optionData);
      });
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
                  <CardHeader>Edit IntegerTable</CardHeader>
                  <Form onSubmit={handleSubmit}>
                    <CardBody>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="address">Address</Label>
                            <Input
                              type="text"
                              name="address"
                              id="address"
                              required
                              defaultValue={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                              type="text"
                              name="username"
                              id="username"
                              required
                              defaultValue={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                              type="text"
                              name="password"
                              id="password"
                              required
                              defaultValue={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="end_point">End Point</Label>
                            <Input
                              type="text"
                              name="end_point"
                              id="end_point"
                              required
                              defaultValue={END_POINT}
                              onChange={(e) => setENDPOINT(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="access_key">Access Key</Label>
                            <Input
                              type="text"
                              name="access_key"
                              id="access_key"
                              required
                              defaultValue={Access_KEY}
                              onChange={(e) => setAccessKEY(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="access_secret_key">
                              Access Secret Key
                            </Label>
                            <Input
                              type="text"
                              name="access_secret_key"
                              id="access_secret_key"
                              required
                              defaultValue={Acess_Secret_key}
                              onChange={(e) =>
                                setAcessSecretkey(e.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="attach_bucket">Attach Bucket</Label>
                            <Input
                              type="text"
                              name="attach_bucket"
                              id="attach_bucket"
                              required
                              defaultValue={Attach_bucket}
                              onChange={(e) => setAttachbucket(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <Label for="regionz">Regions</Label>
                          <Select
                          value={selectedOption}
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
                            <Input
                              type="text"
                              name="ip_address"
                              id="ip_address"
                              required
                              defaultValue={ip_add}
                              onChange={(e) => setIpAdd(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="port">Port</Label>
                            <Input
                              type="text"
                              name="port"
                              id="port"
                              required
                              defaultValue={port}
                              onChange={(e) => setPort(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter className="d-block text-right">
                      <Button
                        size="lg"
                        className="btn-shadow-primary"
                        color="primary"
                      >
                        Submit
                      </Button>
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
