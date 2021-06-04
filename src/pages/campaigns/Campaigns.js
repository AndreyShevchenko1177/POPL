import { useEffect, useState } from "react";
import { Graph } from "react-d3-graph";
import { useSelector } from "react-redux";
import App from "./Graph";

const Campaigns = () => {
  const connections = useSelector(({ connectionsReducer }) => connectionsReducer.connections.data?.allConnections);
  const profiles = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const [data, setData] = useState();

  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 220,
      highlightStrokeColor: "blue",
      renderLabel: false,
    },
    link: {
      highlightColor: "lightblue",
    },
    initialZoom: 0.3,
    height: 800,
    // panAndZoom: true,
    // focusedNodeId: "nodeIdToTriggerZoomAnimation",
    d3: {
      linkLength: 50,
      // disableLinkForce: true,
    },
  };

  const onZoomChange = function (previousZoom, newZoom) {
    // console.log(previousZoom, newZoom);
    // window.alert(`Graph is now zoomed at ${newZoom} from ${previousZoom}`);
  };

  const onClickNode = function (nodeId) {
    // window.alert(`Clicked node ${nodeId}`);
  };

  const onClickLink = function (source, target) {
    // window.alert(`Clicked link between ${source} and ${target}`);
  };

  useEffect(() => {
    if (connections && profiles) {
      const data = connections;// [...connections.slice(0, 10)];
      // console.log(data);
      const connectionNodes = {};
      const result = {
        nodes: profiles.map((profile) => ({
          id: profile.id.toString(), size: 300, color: "red",
        })),
        links: [],
      };

      // profiles.forEach((profile) => profileNodes[profile.id] = []);
      data.forEach((con, i) => {
        connectionNodes[con.customId] = [];
        result.nodes.push({ id: con.customId });
        Object.keys(con.names).forEach((key, j) => {
          connectionNodes[con.customId].push(key);
          result.links.push({ source: con.customId, target: key, id: `${i}${j}` });
        });
      });
      setData(result);
      // console.log(result, connectionNodes);
    }
  }, [connections, profiles]);

  return (<>{data && <App data={data} />}</>);
  // return null;

//   return data
//     ? <div style={{ width: "100%", heigth: "70vh", marginTop: 100 }}>
//       {data
//         ? <Graph
//           id="graph-id" // id is mandatory
//           data={data}
//           config={myConfig}
//           onClickNode={onClickNode}
//           onClickLink={onClickLink}
//           onZoomChange={onZoomChange}
//         />
//         : null}
//     </div>
//     : null;
};

export default Campaigns;
