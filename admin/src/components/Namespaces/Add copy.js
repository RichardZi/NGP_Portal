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


export default function NamespacesAdd() {
    // const Input = () => {
    //     return (<Row from>
    //         <Col md={6}>
    //             <Label for="tenantz">File</Label>
    //             <FilePicker
    //                 // onChange={FileObject => (uploadFile(FileObject))}
    //                 onError={errMsg => (console.log(errMsg))}
    //             >
    //                 <button type='button'>
    //                     Choose File
    //                 </button>
    //             </FilePicker>
    //         </Col>
    //         <Col md={6}>
    //             <FormGroup>
    //                 <Label for="metadata">Metadata</Label>
    //                 <Input type="text" name="metadata" id="metadata" required 
    //                 // onChange={e => setMetadataValue(e.target.value)}
    //                 />
    //             </FormGroup>
    //         </Col>
    //     </Row>);
    //   };
    const [namespaces_name, setNamespaceName] = useState();
    const [namespaces_ref, setNamespaceRef] = useState();
    const [tenantz, setTenantz] = useState();
    const [fileurl, setFileurl] = useState();
    const [options, setOptions] = useState([]);
    const [metadata, setMetadata] = useState();
    const [selectedOption, setSelectedOption] = useState(null);
    const [inputList, setInputList] = useState([]);
    // const [images_list, setImagesList] = useState([]);
    let images_list =[{
        "metaData": "",
        "awsURL": ""
    }];
    const handleSubmit = async e => {
      e.preventDefault();
      
      await AddNamespace({
        namespaces_name,
        namespaces_ref,
        tenantz: [
            9,10
        ],//selectedOption.value,
        fileurl,
        images_list

      });
    };
    const onAddBtnClick = event => {
        setInputList(inputList.concat(<Input key={inputList.length} />));
      };
    useEffect(() => {
        getData();
      }, []);
    
      const getData = async () => {
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

      function uploadFile (file) {
        getBase64(file)
            .then(result => {
                images_list[0]["files"] = result;
                console.log("File Is", file);
                // this.setState({
                // base64URL: result,
                // file
                // });
            })
            .catch(err => {
                console.log(err);
            });
      }
      function setMetadataValue(metaValue) {
        images_list[0]["metaData"] = metaValue;
        images_list[0]["awsURL"] = "";
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
                                                        // isMulti
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
                                            <CardHeader>
                                                Namespace Files
                                                <div className=''>
                                                    <button onClick={onAddBtnClick}><i className='pe-7s-plus'></i></button>
                                                </div>
                                            </CardHeader>
                                            <CardBody>
                                                <Row from>
                                                    <Col md={6}>
                                                        <Label for="tenantz">File</Label>
                                                        <FilePicker
                                                            onChange={FileObject => (uploadFile(FileObject))}
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
                                                            onChange={e => setMetadataValue(e.target.value)}
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
