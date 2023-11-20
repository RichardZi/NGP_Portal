import React, {Component, Fragment, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import Flowchart from "flowchart-react";
import { ConnectionData, NodeData } from "flowchart-react/dist";
import { useParams } from "react-router-dom";
import {
    Row, Col,
    Container,
    Card,
    CardHeader, CardBody
} from 'reactstrap';
import Select from "react-select";

export default function Stage() {
  const params = useParams();
  let [data, setData] = useState([]);
  const [workflowIndex, setWorkflowIndex] = useState(0);
  const [pipelineIndex, setPipelineIndex] = useState(0);
  let [nodes, setNodes] = useState([]);
  let [conns, setConns] = useState([]);
  data = [
    {
      name: "workflow-1",
      uuid: "1",
      pipelines: [
        {
          name: "pipeline-1",
          uuid: "2",
          stage: [
            {
              name: "stage-1",
              uuid: "9",
            },
            {
              name: "stage-2",
              uuid: "10",
            },
            {
              name: "stage-3",
              uuid: "11",
            },
            {
              name: "stage-4",
              uuid: "12",
            },
            {
              name: "stage-5",
              uuid: "13",
            }
          ]
        },
        {
          name: "pipeline-2",
          uuid: "3",
          stage: [
            {
              name: "stage-1",
              uuid: "9",
            },
            {
              name: "stage-2",
              uuid: "10",
            },
            {
              name: "stage-3",
              uuid: "11",
            },
            {
              name: "stage-4",
              uuid: "12",
            },
            {
              name: "stage-5",
              uuid: "13",
            }
          ]
        },
        {
          name: "pipeline-3",
          uuid: "4",
          stage: [
            {
              name: "stage-1",
              uuid: "9",
            },
            {
              name: "stage-2",
              uuid: "10",
            },
            {
              name: "stage-3",
              uuid: "11",
            },
            {
              name: "stage-4",
              uuid: "12",
            },
            {
              name: "stage-5",
              uuid: "13",
            }
          ]
        },
      ],
    },
    {
      name: "workflow-2",
      uuid: "5",
      pipelines: [
        {
          name: "pipeline-4",
          uuid: "6",
          stage: [
            {
              name: "stage-1",
              uuid: "9",
            },
            {
              name: "stage-2",
              uuid: "10",
            },
            {
              name: "stage-3",
              uuid: "11",
            },
            {
              name: "stage-4",
              uuid: "12",
            },
            {
              name: "stage-5",
              uuid: "13",
            }
          ]
        },
        {
          name: "pipeline-5",
          uuid: "7",
          stage: [
            {
              name: "stage-1",
              uuid: "9",
            },
            {
              name: "stage-2",
              uuid: "10",
            },
            {
              name: "stage-3",
              uuid: "11",
            },
            {
              name: "stage-4",
              uuid: "12",
            },
            {
              name: "stage-5",
              uuid: "13",
            }
          ]
        },
        {
          name: "pipeline-6",
          uuid: "8",
          stage: [
            {
              name: "stage-1",
              uuid: "9",
            },
            {
              name: "stage-2",
              uuid: "10",
            },
            {
              name: "stage-3",
              uuid: "11",
            },
            {
              name: "stage-4",
              uuid: "12",
            },
            {
              name: "stage-5",
              uuid: "13",
            }
          ]
        },
      ],
    },
  ];
  
  const wheelTimeout = useRef()

  const onWheel = e => {
      // ... some code I needed ...

      // while wheel is moving, do not release the lock
      clearTimeout(wheelTimeout.current)

      // flag indicating to lock page scrolling (setTimeout returns a number)
      wheelTimeout.current = setTimeout(() => {
        wheelTimeout.current = false
      }, 300)
  }

  // block the body from scrolling (or any other element)
  useEffect(() => {
    const cancelWheel = e => wheelTimeout.current && e.preventDefault()
    document.body.addEventListener('wheel', cancelWheel, {passive:false})
    return () => document.body.removeEventListener('wheel', cancelWheel)
  }, [])

  useEffect(() => {
    data.map((v, i) => {
        if(params.workflowId === v['uuid']) {
          setWorkflowIndex(i);
        }
    });
    // console.log(data[params.workflowId]);
    data[workflowIndex]['pipelines'].map((pv, pi) => {
      if(params.pipelineId === pv['uuid']) {
        setPipelineIndex(pi)
      }
    });

    let xval = 150;
    console.log(data[workflowIndex]['pipelines'][pipelineIndex]['stage']);
    data[workflowIndex]['pipelines'][pipelineIndex]['stage'].map((sv, si) => {
      nodes.push({
        key: si + 1,
        type: "operation",
        title: sv.name,
        id: si + 1,
        x: xval,
        y: 190
      })
      xval += 150;

      if(typeof data[workflowIndex]['pipelines'][pipelineIndex]['stage'][si+1] === 'undefined') {
        // does not exist
      }
      else {
        conns.push({
          key: si + 1,
          source: { id: si + 1, position: "right" },
          destination: { id: si + 2, position: "left" },
          type: "success",
        });
      }
    })
  });
    
     
    return (
        <Fragment>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card className="main-card mb-3">
                            <CardHeader>
                                Workflow
                            </CardHeader>
                            <CardBody>
                                <Flowchart
                                    style={{ width: "100%", height: 600 }}
                                    nodes={nodes}
                                    connections={conns}
                                    showToolbar={false}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
