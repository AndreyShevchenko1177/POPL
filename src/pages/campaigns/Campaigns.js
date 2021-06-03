import { useEffect, useState } from "react";
import { Graph } from "react-d3-graph";
import { useSelector } from "react-redux";

const Campaigns = () => {
  const connections = useSelector(({ connectionsReducer }) => connectionsReducer.connections.data?.allConnections);
  // const [data, setData] = useState();
  const data = {
    nodes: [{ id: "Con1" }, { id: "Con2" }, { id: "Con3" }, { id: "Con4" }, { id: "Con5" }, { id: "Con6" }, { id: "Con7" }, { id: "Con8" }, { id: "Con10" }, { id: "Con9" }],
    links: [
      { source: "Con1", target: "Con9" },
      { source: "Con2", target: "Con1" },
      { source: "Con3", target: "Con7" },
      { source: "Con4", target: "Con3" },
      { source: "Con5", target: "Con6" },
      { source: "Con6", target: "Con5" },
      { source: "Con7", target: "Con8" },
      { source: "Con8", target: "Con2" },
      { source: "Con10", target: "Con9" },
      { source: "Con9", target: "Con10" },
      { source: "Con7", target: "Con1" },
      { source: "Con8", target: "Con4" },
      { source: "Con10", target: "Con1" },
      { source: "Con9", target: "Con5" },
      { source: "Con9", target: "Con9" },
    ],
  };

  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 120,
      highlightStrokeColor: "blue",
    },
    link: {
      highlightColor: "lightblue",
    },
  };

  const onClickNode = function (nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };

  const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  return data
    ? <div style={{ width: "100%", heigth: 500, marginTop: 100 }}>
      <Graph
        id="graph-id" // id is mandatory
        data={data}
        config={myConfig}
        onClickNode={onClickNode}
        onClickLink={onClickLink}
      />
    </div>
    : null;
};

export default Campaigns;
