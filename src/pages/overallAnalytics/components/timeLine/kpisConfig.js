import poplIcon from "../../../../assets/sidebar/poplIcon_black.png";
import popls from "../../../../assets/totalPopls.png";
import SvgMaker from "../../../../components/svgMaker/SvgMaker";

const initialState = [
  {
    id: "popsCount",
    title: "Pop Count",
    value: "",
    percentage: "2%",
    isTop: false,
    icon: <img style={{ width: "15px", height: "15px" }} alt='popl' src={poplIcon} />,
  },
  {
    id: "linkTaps",
    title: "Link Taps",
    value: "",
    percentage: "3%",
    isTop: true,
    icon: <SvgMaker name='finger' width={20} height={20} fill="#000000" />,
  },
  {
    id: "views",
    title: "Views",
    value: "",
    percentage: "12%",
    isTop: true,
    icon: <SvgMaker name='overview' width={20} height={20} fill="#000000" />,
  },
  {
    id: "ctr",
    title: "CTR",
    value: "",
    percentage: "6%",
    isTop: true,
    icon: <img style={{ width: "15px", height: "15px" }} alt='popl' src={popls} />,
  },
];

export default initialState;
