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

async function EditGroups(Data) {
  const params = useParams();
    
}

// async function getJobs(records) {
//     axios.get(`http://127.0.0.1:8000/apiViewSet/jobs/`)
//   .then(res => {
//       records = res.data;
    
//   })        
// }

export default function GroupsEdit() {
    const params = useParams();
    const [name, setGroupName] = useState();
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [PermissionWithAll, setPermissionWithAll] = useState([]);
    const handleSubmit = async e => {
      e.preventDefault();
      let selectionList = [];
      selectedOption.map((option, index) => {
        selectionList.push(option.value)
      })
      let Data = {
        name,
        permissions: selectionList
      };
      console.log(Data);

      axios({
        method: "PUT",
        url: "http://127.0.0.1:8000/security/groups/" + params.groupId + "/",
        data: Data,
        headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + sessionStorage.getItem('token') },
      }).then(function (response) {          
          window.location.href = '/groups';
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
          url: "http://127.0.0.1:8000/security/groups/" + params.groupId + "/",
          headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
        }).then(function(response) {
          setGroupName(response.data.name);
          axios({
              method: "get",
              url: "http://127.0.0.1:8000/security/permissions",
              headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
            }).then((res) => {
              let cleanedString = res.data.replace(/\\/g, '');
              cleanedString = cleanedString.substring(1, cleanedString.length - 1);
              let results = JSON.parse(cleanedString)
              let optionData = [];
              let selectedOptionsArr = [];
              let PermissionWithAllData = [{value: 'all', label: "All"}];
              results.permissions.map((option, index) => {
                  optionData.push({ value: option.id, label: option.name});
                  PermissionWithAllData.push({ value: option.id, label: option.name});
                  if (response.data.permissions.indexOf(option.id) > -1 ) {
                    selectedOptionsArr.push({ value: option.id, label: option.name});
                  }
                });
              setOptions(optionData);
              setSelectedOption(selectedOptionsArr);
              setPermissionWithAll(PermissionWithAllData);
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
                    transitionLeave={false}>
                    <Fragment>
                        <Container fluid>
                            <Row>
                                <Col md="12">
                                    <Card className="main-card mb-3">
                                        <CardHeader>
                                            Add Groups
                                        </CardHeader>
                                        <Form onSubmit={handleSubmit}>
                                            <CardBody>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="groupName">Group Name</Label>
                                                            <Input type="text" name="group_name" id="groupName" defaultValue={name} required 
                                                            onChange={e => setGroupName(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="permissions">Permissions</Label>
                                                            
                                                            <Select
                                                                    isMulti
                                                                    value={selectedOption}
                                                                    // onChange={setSelectedPermission}
                                                                    onChange={selected => {
                                                                        if (
                                                                          selected.length > 0 &&
                                                                          selected[selected.length - 1].value === 'all'
                                                                        ) {
                                                                          return setSelectedOption(options);
                                                                        }
                                                                        return setSelectedOption(selected);
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
