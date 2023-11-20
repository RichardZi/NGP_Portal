import { useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useParams } from "react-router-dom";

const handleStyle = { left: 10 };

function CustomNode({ data }) {
  const params = useParams();
  console.log(data);
  const onChange = useCallback((evt) => {
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div
        onClick={() =>
          window.open(
            "/workflow/" +
              params.workflowId +
              "/pipeline/" +
              params.pipelineId +
              "/stage-details/" + data.stageId,
            "_blank"
          )
        }
      >
        <label htmlFor="text">{data.label}</label>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
      />
    </div>
  );
}

export default CustomNode;
