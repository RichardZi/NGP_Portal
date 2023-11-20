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

export default function PersonDataEdit() {
    const params = useParams();
    const [grant_type, setGrantType] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [adminPassword, setAdminPassword] = useState();
    const [scope, setScope] = useState();
    const [client_secret, setClientSecret] = useState();
    const [client_id, setClientId] = useState();
    const [realm, setRealm] = useState();
    const [instanceOptions, setInstanceOptions] = useState([]);
    const [selectedInstance, setSelectedInstance] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [groupOptions, setGroupOptions] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [regionOptions, setRegionOptions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState([]);
    const handleSubmit = async e => {
      e.preventDefault();
      let instance = selectedInstance.value;
      let user = selectedUser.value;
      let group = selectedGroup.value;
      let region = selectedRegion.value;
      let Data = {
        grant_type,
        username,
        password,
        adminPassword,
        scope,
        client_secret,
        client_id,
        realm,
        instance,
        user,
        group,
        region
      };

      axios({
        method: "PUT",
        url: "http://127.0.0.1:8000/apiViewSet/PersonData/"+ params.PersonId + "/",
        data: Data,
        headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + sessionStorage.getItem('token') },
      }).then(function (response) {
          //handle success
          console.log(response.data.refresh);
          
          window.location.href = '/person-data-list';
        return response.data.refresh;
        }).catch(function (response) {
          //handle error
          console.log(response);
        });
    };
    
    useEffect(() => {
        getData();
      }, [])

      const getData=async()=>{
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/apiViewSet/PersonData/"+ params.PersonId + "/",
          headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
        }).then((personData) => {
          setGrantType(personData.data.grant_type);
          setUsername(personData.data.username);
          setPassword(personData.data.password);
          setAdminPassword(personData.data.adminPassword);
          setScope(personData.data.scope);
          setClientSecret(personData.data.client_secret);
          setClientId(personData.data.client_id);
          setRealm(personData.data.realm);
          axios({
            method: "get",
            url: "http://127.0.0.1:8000/apiViewSet/Instances/",
            headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
          }).then((ins) => {
            let optionData = [];
            ins.data.map((option, index) => {
                optionData.push({value:option.id, label:option.id})
                if (personData.data.instance === option.id) {
                  setSelectedInstance({ value: option.id, label: option.id });
                }
            });
            setInstanceOptions(optionData)
        });
          
          axios({
              method: "get",
              url: "http://127.0.0.1:8000/apiViewSet/user/",
              headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
            })
          .then(function(userRes) {
              let optionData = [];
              userRes.data.map((option, index) => {
                  optionData.push({value:option.id, label:option.email})
                  if (personData.data.user === option.id) {
                      setSelectedUser({ value: option.id, label: option.email });
                  }
              });
              setUserOptions(optionData)
          });
  
          axios({
              method: "get",
              url: "http://127.0.0.1:8000/apiViewSet/groups/",
              headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
            })
          .then(function(groupRes) {
              let optionData = [];
              groupRes.data.map((option, index) => {
                  optionData.push({value:option.id, label:option.name})
                  if (personData.data.group === option.id) {
                      setSelectedGroup({ value: option.id, label: option.name });
                  }
              });
              setGroupOptions(optionData)
          });
  
          axios({
              method: "get",
              url: "http://127.0.0.1:8000/apiViewSet/region/",
              headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
            })
          .then(function(regionRes) {
              let optionData = [];
              regionRes.data.map((option, index) => {
                  optionData.push({value:option.id, label:option.regions_name})
                  if (personData.data.region === option.id) {
                      setSelectedRegion({ value: option.id, label: option.regions_name });
                  }
              });
              setRegionOptions(optionData)
          });
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
                                            Add Person Data
                                        </CardHeader>
                                        <Form onSubmit={handleSubmit}>
                                            <CardBody>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="grantType">Grant Type</Label>
                                                            <Input type="text" name="grantType" id="grantType" 
                                                            required defaultValue={grant_type}
                                                            onChange={e => setGrantType(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="username">Username</Label>
                                                            <Input type="text" name="username" id="username"
                                                            defaultValue={username} required 
                                                            onChange={e => setUsername(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="password">Password</Label>
                                                            <Input type="text" name="password" id="password"
                                                            defaultValue={password} required 
                                                            onChange={e => setPassword(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="adminPassword">Admin Password</Label>
                                                            <Input type="text" name="adminPassword" id="adminPassword"
                                                            defaultValue={adminPassword} required
                                                            onChange={e => setAdminPassword(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="scope">Scope</Label>
                                                            <Input type="text" name="scope" id="scope"
                                                            defaultValue={scope} required
                                                            onChange={e => setScope(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="client_secret">Client Secret</Label>
                                                            <Input type="client_secret" name="client_secret"
                                                            defaultValue={client_secret} id="client_secret" required
                                                            onChange={e => setClientSecret(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="clientId">Client Id</Label>
                                                            <Input type="text" name="clientId" id="clientId"
                                                            defaultValue={client_id} required
                                                            onChange={e => setClientId(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="realm">Realm</Label>
                                                            <Input type="text" name="realm" id="realm"
                                                            defaultValue={realm} required
                                                            onChange={e => setRealm(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="instance">Instance</Label>
                                                            <Select
                                                                value={selectedInstance}
                                                                onChange={setSelectedInstance}
                                                                name="instance"
                                                                id="instance-select"
                                                                options={instanceOptions}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="user">User</Label>
                                                            <Select
                                                                value={selectedUser}
                                                                onChange={setSelectedUser}
                                                                name="user"
                                                                id="user-select"
                                                                options={userOptions}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="group">Group</Label>
                                                            <Select
                                                                value={selectedGroup}
                                                                onChange={setSelectedGroup}
                                                                name="group"
                                                                id="group-select"
                                                                options={groupOptions}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="region">Region</Label>
                                                            <Select
                                                                value={selectedRegion}
                                                                onChange={setSelectedRegion}
                                                                name="region"
                                                                id="region-select"
                                                                options={regionOptions}
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
