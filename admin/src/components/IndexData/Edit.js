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
import Select from "react-select";

export default function IndexDataEdit() {
  const params = useParams();
  const [title, setTitle] = useState();
  const [link, setLink] = useState();
  const [content_type, setContentType] = useState();
  const [hci_uri, setHciUri] = useState();
  const [hci_data_source_name, setHciDataSourceName] = useState();
  const [hci_data_source_uuid, setHciDataSourceUuid] = useState();
  const [hci_display_name, setHciDisplayName] = useState();
  const [hci_doc_version, setHciDocVersion] = useState();
  const [hci_id, setHciId] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let Data = {
      title,
      link,
      content_type,
      hci_uri,
      hci_data_source_name,
      hci_data_source_uuid,
      hci_display_name,
      hci_doc_version,
      hci_id,
    };
    axios({
      method: "PUT",
      url: "http://127.0.0.1:8000/apiViewSet/IndexData/" + params.IndexId + "/",
      data: Data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function(response) {
        //handle success
        console.log(response.data.refresh);

        window.location.href = "/index-datas";
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
      "http://127.0.0.1:8000/apiViewSet/IndexData/" + params.IndexId + "/"
    ).then(function(response) {
      setTitle(response.data.title);
      setLink(response.data.link);
      setContentType(response.data.content_type);
      setHciUri(response.data.hci_uri);
      setHciDataSourceName(response.data.hci_data_source_name);
      setHciDataSourceUuid(response.data.hci_data_source_uuid);
      setHciDisplayName(response.data.hci_display_name);
      setHciDocVersion(response.data.hci_doc_version);
      setHciId(response.data.hci_id);
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
                  <CardHeader>Index Data Details</CardHeader>
                  <Form onSubmit={handleSubmit}>
                    <CardBody>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                              type="text"
                              name="title"
                              id="title"
                              required
                              defaultValue={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="link">Link</Label>
                            <Input
                              type="text"
                              name="link"
                              id="link"
                              required
                              defaultValue={link}
                              onChange={(e) => setLink(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="content_type">Content Type</Label>
                            <Input
                              type="text"
                              name="content_type"
                              id="content_type"
                              required
                              defaultValue={content_type}
                              onChange={(e) => setContentType(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="hci_uri">HCI URI</Label>
                            <Input
                              type="text"
                              name="hci_uri"
                              id="hci_uri"
                              required
                              defaultValue={hci_uri}
                              onChange={(e) => setHciUri(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="hci_data_source_name">
                              HCI Data Source Name
                            </Label>
                            <Input
                              type="text"
                              name="hci_data_source_name"
                              id="hci_data_source_name"
                              required
                              defaultValue={hci_data_source_name}
                              onChange={(e) =>
                                setHciDataSourceName(e.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="hci_data_source_uuid">
                              HCI Data Source UUID
                            </Label>
                            <Input
                              type="text"
                              name="hci_data_source_uuid"
                              id="hci_data_source_uuid"
                              required
                              defaultValue={hci_data_source_uuid}
                              onChange={(e) =>
                                setHciDataSourceUuid(e.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="hci_display_name">
                              HCI Display Name
                            </Label>
                            <Input
                              type="text"
                              name="hci_display_name"
                              id="hci_display_name"
                              required
                              defaultValue={hci_display_name}
                              onChange={(e) =>
                                setHciDisplayName(e.target.value)
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="hci_doc_version">HCI Doc Version</Label>
                            <Input
                              type="text"
                              name="hci_doc_version"
                              id="hci_doc_version"
                              required
                              defaultValue={hci_doc_version}
                              onChange={(e) => setHciDocVersion(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="hci_id">HCI ID</Label>
                            <Input
                              type="text"
                              name="hci_id"
                              id="hci_id"
                              required
                              defaultValue={hci_id}
                              onChange={(e) => setHciId(e.target.value)}
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
