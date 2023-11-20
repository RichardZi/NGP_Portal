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

export default function UserEdit() {
    const params = useParams();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [first_name, setFirstname] = useState();
    const [last_name, setLastname] = useState();
    const [email, setEmail] = useState();
    const [user_type, setUsertype] = useState();
    const [is_active, setActive] = useState();
    const [staff, setStaff] = useState();
    const [selectedOption, setSelectedOption] = useState([]);
    const [selectedPermission, setSelectedPermission] = useState([]);
    const [Permission, setPermission] = useState([]);
    const [options, setOptions] = useState([]);
    const [PermissionWithAll, setPermissionWithAll] = useState([]);

    const handleSubmit = async e => {
      e.preventDefault();
        let selectionList = [];
        selectedOption.map((option, index) => {
            selectionList.push(option.value)
        })

        let selectedPermissionList = [];
        if(selectedPermission.length > 0) {
          selectedPermission.map((option, index) => {
            selectedPermissionList.push(option.value)
          })
        }
        let active = true;
        if(is_active === 'on' || is_active === true) {
            active = true;
        } else {
            active = false;
        }
        
      let Data = {
        username,
        password,
        first_name,
        last_name,
        email,
        user_type: user_type.value,
        is_active: active,
        is_staff: staff.value,
        groups: selectionList,
        user_permissions: selectedPermissionList
      };

      axios({
        method: "PUT",
        url: "http://127.0.0.1:8000/apiViewSet/user/" + params.userId + "/",
        data: Data,
        headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + sessionStorage.getItem('token') },
      }).then(function (response) {          
          window.location.href = '/users';
        return response.data.refresh;
        }).catch(function (response) {
          // console.log(response);
        });

      axios({
        method: "get",
        url: "http://127.0.0.1:8000/security/ClearCache",
        headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + sessionStorage.getItem('token') },
        }).then(function (response) {          
            console.log('cache cleared');
        return response.data.refresh;
        }).catch(function (response) {
            console.log(response);
        });
    };

    useEffect(() => {
        getData();
      }, []);
    
      const getData = async () => {
        axios({
          method: "get",
          url: "http://127.0.0.1:8000/apiViewSet/user/" + params.userId + "/",
          headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
        }).then(function(response) {
          console.log(response.data);
          setUsername(response.data.username);
          setPassword(response.data.password);
          setFirstname(response.data.first_name);
          setLastname(response.data.last_name);
          setEmail(response.data.email);
          setUsertype({value:response.data.user_type, label: response.data.user_type});
          setActive(response.data.is_active);
          if(response.data.is_staff == true) {
            setStaff({value:true, label: 'Yes'});
          } else if(response.data.is_staff == false) {
            setStaff({value:false, label: 'No'});
          } else {
            setStaff({value:response.data.is_staff, label: response.data.is_staff});
          }
          axios({
            method: "get",
            url: "http://127.0.0.1:8000/security/groups",
            headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
          }).then((res) => {
            let optionData = [];
            console.log(res.data);
            let selectedOptionsArr = [];
            if(Array.isArray(res.data) && res.data.length) {
                res.data.map((option, index) => {
                    optionData.push({ value: option.id, label: option.name});
                    if (response.data.groups.indexOf(option.id) > -1 ) {
                      selectedOptionsArr.push({ value: option.id, label: option.name});
                    }
                  });
            }
              setOptions(optionData);
              setSelectedOption(selectedOptionsArr);
          });

          axios({
            method: "get",
            url: "http://127.0.0.1:8000/security/permissions",
            headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
          }).then((res) => {

            let cleanedString = res.data.replace(/\\/g, '');
            cleanedString = cleanedString.substring(1, cleanedString.length - 1);
            let results = JSON.parse(cleanedString)
            let permissionData = [];
            let selectedPermissionArr = [];
            let PermissionWithAllData = [{value: 'all', label: "All"}];
            // console.log(perm);
            console.log(results);
            results.map((result, index) => {
              result.permissions.map((option, index) => {
                  permissionData.push({ value: option.name, label: option.description});
                  PermissionWithAllData.push({ value: option.name, label: option.description});
                  if (response.data.user_permissions.indexOf(option.name) > -1 ) {
                    selectedPermissionArr.push({ value: option.id, label: option.name});
                  }
              });
            });
            console.log(PermissionWithAllData);
            setPermission(permissionData);
            setSelectedPermission(selectedPermissionArr);
            setPermissionWithAll(PermissionWithAllData);
          }).catch(function (error) {
            console.log(error);
          });
        })
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
                                            Add User
                                        </CardHeader>
                                        <Form onSubmit={handleSubmit}>
                                            <CardBody>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="username">Username</Label>
                                                            <Input type="text" name="username" id="username" defaultValue={username} required 
                                                            onChange={e => setUsername(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="password">Password</Label>
                                                            <Input type="password" name="password" id="password" required 
                                                            onChange={e => setPassword(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="confirmPassword">Confirm Password</Label>
                                                            <Input type="password" name="confirmPassword" id="confirmPassword" required 
                                                            // onChange={e => setConfirmPassword(e.target.value)}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Card className="card">
                                                    <CardHeader>
                                                        Personal Info
                                                    </CardHeader>

                                                    <CardBody>
                                                        <Row form>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Label for="firstname">First Name</Label>
                                                                    <Input type="text" name="firstname" id="firstname" defaultValue={first_name} required 
                                                                    onChange={e => setFirstname(e.target.value)}/>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Label for="lastname">Last Name</Label>
                                                                    <Input type="text" name="lastname" id="lastname" defaultValue={last_name} required 
                                                                    onChange={e => setLastname(e.target.value)}/>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row form>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Label for="email">Email Address</Label>
                                                                    <Input type="email" name="email" id="email" defaultValue={email} required 
                                                                    onChange={e => setEmail(e.target.value)}/>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>

                                                <Card className="card">
                                                    <CardHeader>
                                                        Permission
                                                    </CardHeader>

                                                    <CardBody>
                                                        <Row form>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Label for="usertype">User Type</Label>
                                                                    <Select
                                                                        value={user_type}
                                                                        onChange={setUsertype}
                                                                        name="user_type"
                                                                        id="type-select"
                                                                        options={[{ value: 'CLIENT', label: 'CLIENT'},{ value: 'SUBADMIN', label: 'SUBADMIN'}]}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={6}>
                                                                <FormGroup className='mt-4'>
                                                                    <Input type="checkbox" name="active" id="active" defaultChecked={is_active} className='ml-0'
                                                                    onChange={e => setActive(e.target.value)}/>
                                                                    <Label for="active" className='ml-4'>Is Active</Label>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row form>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Label for="isStaff">Is Staff</Label>
                                                                    <Select
                                                                        value={staff}
                                                                        onChange={setStaff}
                                                                        name="is_staff"
                                                                        id="staff-select"
                                                                        options={[{ value: 'unknown', label: 'Unknown'},{ value: true, label: 'Yes'},{ value: false, label: 'No'}]}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Label for="groups">Groups</Label>
                                                                    <Select
                                                                        isMulti
                                                                        value={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        name="job"
                                                                        id="job-select"
                                                                        options={options}
                                                                        className="basic-multi-select"
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row form>
                                                          <Col md={6}>
                                                            <FormGroup>
                                                                <Label for="permissions">Permissions</Label>
                                                                <Select
                                                                    isMulti
                                                                    value={selectedPermission}
                                                                    // onChange={setSelectedPermission}
                                                                    onChange={selected => {
                                                                        if (
                                                                          selected.length > 0 &&
                                                                          selected[selected.length - 1].value === 'all'
                                                                        ) {
                                                                          return setSelectedPermission(Permission);
                                                                        }
                                                                        return setSelectedPermission(selected);
                                                                      }}
                                                                    name="permission"
                                                                    id="permission-select"
                                                                    options={PermissionWithAll}
                                                                    className="basic-multi-select"
                                                                />
                                                            </FormGroup>
                                                          </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
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
