import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Graph from "./Graph";

const Campaigns = () => {
  const connections = useSelector(({ connectionsReducer }) => connectionsReducer.connections.data?.allConnections);
  const profiles = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const [data, setData] = useState();

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

  return (
    <>
      {data && <Graph data={data} />}
    </>
  );
};

export default Campaigns;
