import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { defineDarkColor } from "../../utils";
import Graph from "./Graph";

const Campaigns = () => {
  const connections = useSelector(({ connectionsReducer }) => connectionsReducer.connections.data?.allConnections);
  const connectionsObject = useSelector(({ connectionsReducer }) => connectionsReducer.connections.data?.connectionsObject);
  const profiles = useSelector(({ profilesReducer }) => profilesReducer.dataProfiles.data);
  const generalSettingsData = useSelector(({ generalSettingsReducer }) => generalSettingsReducer.companyInfo.data);
  const [data, setData] = useState();

  useEffect(() => {
    if (connections && profiles) {
      const data = connections;// [...connections.slice(0, 10)];
      const connectionNodes = {};
      const result = {
        nodes: profiles.map((profile) => ({
          id: profile.id.toString(), isConnected: !!connectionsObject[profile.id]?.length, size: 300, color: generalSettingsData && generalSettingsData[1] ? generalSettingsData[1] : "#000000", image: `${process.env.REACT_APP_BASE_FIREBASE_PHOTOS_URL + profile.image}?alt=media`,
        })),
        links: [],
      };

      // profiles.forEach((profile) => profileNodes[profile.id] = []);
      data.forEach((con, i) => {
        connectionNodes[con.customId] = [];
        result.nodes.push({ id: con.customId, isConnected: true });
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
