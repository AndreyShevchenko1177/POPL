import poplIcon from "../../../../assets/sidebar/poplIcon_black.png";
import profiles from "../../../../assets/sidebar/profiles.png";
import popls from "../../../../assets/totalPopls.png";
import SvgMaker from "../../../../components/svgMaker/SvgMaker";

const initialState = [
  {
    id: "popsCount",
    title: "Pop Count",
    value: " ",
    isTop: false,
    icon: <img style={{ width: "20px", height: "20px" }} alt='popl' src={poplIcon} />,
  },
  {
    id: "linkTaps",
    title: "Link Taps",
    value: " ",
    isTop: true,
    icon: <SvgMaker name='finger' width={25} height={25} fill="#000000" />,
  },
  {
    id: "views",
    title: "Views",
    value: " ",
    isTop: true,
    icon: <SvgMaker name='overview' width={25} height={25} fill="#000000" />,
  },
  {
    id: "ctr",
    title: "CTR",
    value: " ",
    isTop: true,
    icon: <img style={{ width: "20px", height: "25px" }} alt='popl' src={popls} />,
  },
  {
    id: "totalProfiles",
    title: "Total Accounts",
    value: " ",
    isTop: false,
    icon: <img style={{ width: "25px", height: "30px" }} alt='popl' src={profiles} />,
  },
  {
    id: "totalPopls",
    title: "Total Popls",
    value: " ",
    isTop: true,
    icon: <img style={{ width: "20px", height: "25px" }} alt='popl' src={popls} />,
  },
];

export default initialState;
