import React, {
  Component,
  Fragment,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import Flowchart from "flowchart-react";
import { ConnectionData, NodeData } from "flowchart-react/dist";
import { useParams } from "react-router-dom";
import { Row, Col, Container, Card, CardHeader, CardBody } from "reactstrap";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls, ControlButton 
} from "react-flow-renderer";
import CustomNode from './CustomNode.js';
import './CustomNode.css';


export default function Stage() {
  const params = useParams();
  let [data, setData] = useState([]);
  const [workflowIndex, setWorkflowIndex] = useState(0);
  const [pipelineIndex, setPipelineIndex] = useState(0);
  const [nodes, setNodes] = useState([]);
  const [edges, setConns] = useState([]);
  const nodeTypes = { CustomNode: CustomNode };
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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
              pluginSubCategory: "pluginSubCategory"
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

    let xval = 25;
    let yval = 0;
    let nodesData = [];
    let edgesData = [];

    data[workflowIndex]["pipelines"][pipelineIndex]["stage"].map((sv, si) => {
      // if(si % 2 === 0) {
      // yval = 25;
      // } else {
      //   yval = 125;
      // }
      nodesData.push({
        id: "n" + (si + 1).toString(),
        data: { label: sv.name.toString() + "", stageId: sv.uuid },
        type: 'CustomNode',
        position: { x: xval, y: yval },
      });
      xval += 250;
      yval += 100;

      if (
        typeof data[workflowIndex]["pipelines"][pipelineIndex]["stage"][
          si + 1
        ] === "undefined"
      ) {
        // does not exist
      } else {
        edgesData.push({
          id: ("e" + (si + 1)).toString(),
          source: ("n" + (si + 1)).toString(),
          target: ("n" + (si + 2)).toString(),
        });
      }
    });
    setNodes(nodesData);
    setConns(edgesData);
  }, []);

  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardHeader>Workflow</CardHeader>
              <CardBody>
                <div
                  className="reactflow-wrapper"
                  style={{ height: "500px", width: "1000px" }}
                >
                  <ReactFlow nodes={nodes} edges={edges} fitView nodeTypes={nodeTypes}>
                    <Controls>
                      
                    </Controls>
                  </ReactFlow>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
