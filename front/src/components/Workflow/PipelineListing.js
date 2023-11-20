import React, { Component, Fragment, useEffect, useState } from "react";
import axios from "axios";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { useParams } from "react-router-dom";

import {
  Row,
  Col,
  Container,
  Card,
  CardHeader,
  Table,
  CardBody,
} from "reactstrap";

export default function PipelineListing() {
  const params = useParams();
  let [data, setData] = useState([]);
  const [arrayIndex, setAarrayIndex] = useState(0);
  data = [
    {
        name: "workflow-1",
        modelVersion: "modelVersion",
        description: "description",
        uuid: "1",
        pipelines: [
            {
                name: "pipeline-1",
                modelVersion: "modelVersion",
                type: "type",
                uuid: "2",
                description: "description"

            },
            {
                name: "pipeline-2",
                modelVersion: "modelVersion",
                type: "type",
                uuid: "3",
                description: "description"
            },
            {
                name: "pipeline-3",
                modelVersion: "modelVersion",
                type: "type",
                uuid: "4",
                description: "description"
            }
        ]
    },
    {

        name: "workflow-2",
        modelVersion: "modelVersion",
        description: "description",
        uuid: "5",
        pipelines: [
            {
                name: "pipeline-4",
                modelVersion: "modelVersion",
                type: "type",
                uuid: "6",
                description: "description"

            },
            {
                name: "pipeline-5",
                modelVersion: "modelVersion",
                type: "type",
                uuid: "7",
                description: "description"
            },
            {
                name: "pipeline-6",
                modelVersion: "modelVersion",
                type: "type",
                uuid: "8",
                description: "description"
            }
        ]
    },
]
  

  useEffect(() => {
    data.map((v, i) => {
        if(params.workflowId === v['uuid']) {
            setAarrayIndex(i);
        }
    })
    setTimeout(function() {
      $("#workflows").DataTable();
    }, 1000);
  });
  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardHeader>Workflows</CardHeader>
              <CardBody>
                <Table
                  id="workflows"
                  responsive
                  hover
                  striped
                  borderless
                  className="align-middle mb-0"
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>UUID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data[arrayIndex].pipelines.map((listValue, index) => {
                      return (
                        <tr key={index}>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              window.open(
                                "/workflow/" + params.workflowId + "/pipeline/" + listValue.uuid + "/stage/",
                                "_self"
                              )
                            }
                          >
                            {listValue.name}
                          </td>
                          <td>{listValue.uuid}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
