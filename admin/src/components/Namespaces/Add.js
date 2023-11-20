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
import { FilePicker } from 'react-file-picker'

async function AddNamespace(Data) {

    axios({
        method: "post",
        url: "http://127.0.0.1:8000/create_namespace_api/",
        data: Data,
        headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + sessionStorage.getItem('token') },
      }).then(function (response) {          
            window.location.href = '/namespaces';
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

let images_list =[];
let base64List = [];
let metaList = [];
export default function NamespacesAdd() {
    const [namespaces_name, setNamespaceName] = useState();
    const [namespaces_ref, setNamespaceRef] = useState();
    const [tenantz, setTenantz] = useState();
    const [fileurl, setFileurl] = useState();
    const [options, setOptions] = useState([]);
    const [metadata, setMetadata] = useState();
    const [selectedOption, setSelectedOption] = useState(null);
    const [inputList, setInputList] = useState([]);
    const [IndexListing, setIndexListing] = useState(0);
    const [images, setImages] = useState([]);
    const [fileCount, setFileCount] = useState(0);
    const [permissions, setPermissions] = useState([]);
    const FileComponent = () => {
        return <Row from>
        <Col md={6}>
            <Label for="tenantz">File</Label>
            <FilePicker
                onChange={FileObject => (uploadFile(FileObject, fileCount))}
                onError={errMsg => (console.log(errMsg))}
            >
                <button type='button'>
                    Choose File
                </button>
            </FilePicker>
        </Col>
        <Col md={6}>
            <FormGroup>
                <Label for="metadata">Metadata</Label>
                <Input type="text" name="metadata" id="metadata" required 
                onChange={e => setMetadataValue(e.target.value, fileCount)}
                />
            </FormGroup>
        </Col>
        {setFileCount(fileCount+1)}
    </Row>
      };
    
    const handleSubmit = async e => {
      e.preventDefault();
      base64List.map((option, index) => {
          images_list.push({
              'awsURL': '',
              'metaData': metaList[index],
              'files': option
          })
        });
        let selectionList = [];
        selectedOption.map((option, index) => {
            selectionList.push(option.value)
        })
        console.log(selectionList);
      await AddNamespace(
        JSON.stringify({
        namespaces_name,
        namespaces_ref,
        tenantz: selectionList,
        fileurl,
        images_list
      }));
    };
    const onAddBtnClick = event => {
        event.preventDefault();
        setIndexListing(IndexListing+1);
        setInputList(inputList.concat(<FileComponent key={inputList.length} />));
      };
    useEffect(() => {
        getData();
      }, []);
    
      const getData = async () => {
        setPermissions(sessionStorage.getItem("permissions"))
        axios({
            method: "get",
            url: "http://127.0.0.1:8000/get_tenants/",
            headers: {"Authorization": 'Bearer ' + sessionStorage.getItem('token') },
          }).then((res) => {
            let optionData = [];
            console.log(res.data);
            res.data.map((option, index) => {
                optionData.push({ value: option.id, label: option.tenants_name});
              });
              setOptions(optionData);
          });
      };

      const getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            console.log("Called", reader);
            baseURL = reader.result;
            console.log(baseURL);
            resolve(baseURL);
          };
          console.log(fileInfo);
        });
      };

      function uploadFile (file, index) {
        getBase64(file)
            .then(result => {
                console.log(index);
                // images_list[index] = {
                //     "files": result
                // }
                base64List[index] = result;
                console.log("File Is", file);
                console.log(images_list);
                // this.setState({
                // base64URL: result,
                // file
                // });
            })
            .catch(err => {
                console.log(err);
            });
      }
      function setMetadataValue(metaValue, index) {
        console.log(index);
        metaList[index] = metaValue;
        // images_list[index] = {
        //     "metaData": metaValue,
        //     "awsURL": ""
        // }
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
                                            Add Namespace
                                        </CardHeader>
                                        <Form onSubmit={handleSubmit}>
                                            <CardBody>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="regionName">Namespaces Name</Label>
                                                            <Input type="text" name="regions_name" id="regionName" required 
                                                            onChange={e => setNamespaceName(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="regionRef">Namespaces Ref</Label>
                                                            <Input type="text" name="regions_ref" id="regionRef" required 
                                                            onChange={e => setNamespaceRef(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row from>
                                                    <Col md={6}>
                                                    <Label for="tenantz">Tenants</Label>
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
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="Fileurl">File Url</Label>
                                                            <Input type="text" name="Fileurl" id="Fileurl" required 
                                                            onChange={e => setFileurl(e.target.value)}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                            {permissions.includes(52) === true ? (
                                            <Card>
                                                <CardHeader>
                                                    Namespace Files
                                                    {permissions.includes(49) === true ? (
                                                        <div className=''>
                                                            <button onClick={onAddBtnClick}><i className='pe-7s-plus'></i></button>
                                                        </div>
                                                    ) : ''}
                                                </CardHeader>
                                                <CardBody>
                                                    {inputList}
                                                </CardBody>
                                            </Card>
                                            ) : ''}
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
