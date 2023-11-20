import React, {
  Component,
  Fragment,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container, Card, CardHeader, CardBody, Table } from "reactstrap";

export default function Stage() {
  const params = useParams();
  let [data, setData] = useState([]);
  const [workflowIndex, setWorkflowIndex] = useState(0);
  const [pipelineIndex, setPipelineIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [nodes, setNodes] = useState([]);
  const [edges, setConns] = useState([]);
  const [stageData, setStageData] = useState([]);
  
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
          description: "description",
          stage: [
            {
              name: "stage-1",
              uuid: "9",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-2",
              uuid: "10",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-3",
              uuid: "11",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-4",
              uuid: "12",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-5",
              uuid: "13",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
          ],
        },
        {
          name: "pipeline-2",
          modelVersion: "modelVersion",
          type: "type",
          uuid: "3",
          description: "description",
          stage: [
            {
              name: "stage-1",
              uuid: "9",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-2",
              uuid: "10",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-3",
              uuid: "11",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-4",
              uuid: "12",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-5",
              uuid: "13",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
          ],
        },
        {
          name: "pipeline-3",
          modelVersion: "modelVersion",
          type: "type",
          uuid: "4",
          description: "description",
          stage: [
            {
              name: "stage-1",
              uuid: "9",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-2",
              uuid: "10",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-3",
              uuid: "11",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-4",
              uuid: "12",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-5",
              uuid: "13",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
          ],
        },
      ],
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
          description: "description",
          stage: [
            {
              name: "stage-1",
              uuid: "9",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-2",
              uuid: "10",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-3",
              uuid: "11",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-4",
              uuid: "12",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-5",
              uuid: "13",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
          ],
        },
        {
          name: "pipeline-5",
          modelVersion: "modelVersion",
          type: "type",
          uuid: "7",
          description: "description",
          stage: [
            {
              name: "stage-1",
              uuid: "9",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-2",
              uuid: "10",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-3",
              uuid: "11",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-4",
              uuid: "12",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-5",
              uuid: "13",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
          ],
        },
        {
          name: "pipeline-6",
          modelVersion: "modelVersion",
          type: "type",
          uuid: "8",
          description: "description",
          stage: [
            {
              name: "stage-1",
              uuid: "9",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-2",
              uuid: "10",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-3",
              uuid: "11",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-4",
              uuid: "12",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
            {
              name: "stage-5",
              uuid: "13",
              modelVersion: "modelVersion",
              description: "description",
              pluginName: "pluginName",
              pluginDisplayName: "pluginDisplayName",
              pluginDescription: "pluginDescription",
              pluginLongDescription: "pluginLongDescription",
              pluginCategory: "pluginCategory",
              pluginSubCategory: "pluginSubCategory",
            },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    data.map((v, i) => {
      if (params.workflowId === v["uuid"]) {
        setWorkflowIndex(i);
      }
    });
    // console.log(data[params.workflowId]);
    data[workflowIndex]["pipelines"].map((pv, pi) => {
      if (params.pipelineId === pv["uuid"]) {
        setPipelineIndex(pi);
      }
    });

    data[workflowIndex]["pipelines"][pipelineIndex]["stage"].map((sv, si) => {
      if (params.stageId === sv["uuid"]) {
        setStageIndex(si);
      }
    });

    setStageData(
      data[workflowIndex]["pipelines"][pipelineIndex]["stage"][stageIndex]
    );
  }, []);

  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardHeader>{stageData["name"]}</CardHeader>
              <CardBody>
                <Table
                  id="stage-details"
                  responsive
                  hover
                  striped
                  borderless
                  className="align-middle mb-0"
                >
                  <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{stageData["name"]}</td>
                    </tr>
                    <tr>
                        <th>UUID</th>
                        <td>{stageData["uuid"]}</td>
                    </tr>
                    <tr>
                        <th>Model Version</th>
                        <td>{stageData["modelVersion"]}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>{stageData["description"]}</td>
                    </tr>
                    <tr>
                        <th>Plugin Name</th>
                        <td>{stageData["pluginName"]}</td>
                    </tr>
                    <tr>
                        <th>Plugin Display Name</th>
                        <td>{stageData["pluginDisplayName"]}</td>
                    </tr>
                    <tr>
                        <th>Plugin Description</th>
                        <td>{stageData["pluginDescription"]}</td>
                    </tr>
                    <tr>
                        <th>Plugin Long Description</th>
                        <td>{stageData["pluginLongDescription"]}</td>
                    </tr>
                    <tr>
                        <th>Plugin Category</th>
                        <td>{stageData["pluginCategory"]}</td>
                    </tr>
                    <tr>
                        <th>Plugin Sub Category</th>
                        <td>{stageData["pluginSubCategory"]}</td>
                    </tr>
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
