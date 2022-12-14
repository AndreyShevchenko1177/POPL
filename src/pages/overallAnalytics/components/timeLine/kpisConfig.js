import poplIcon from "../../../../assets/sidebar/poplIcon_black.png";
import popls from "../../../../assets/totalPopls.png";
import SvgMaker from "../../../../components/svgMaker/SvgMaker";

const initialState = [
  {
    id: "popsCount",
    title: "Pop Count",
    value: "",
    isTop: false,
    icon: <img style={{ width: "15px", height: "15px" }} alt='popl' src={poplIcon} />,
  },
  {
    id: "linkTaps",
    title: "Link Taps",
    value: "",
    isTop: true,
    icon: <SvgMaker name='finger' width={20} height={20} fill="#000000" />,
  },
  {
    id: "views",
    title: "Views",
    value: "",
    isTop: true,
    icon: <SvgMaker name='overview' width={20} height={20} fill="#000000" />,
  },
  {
    id: "ctr",
    title: "Tap Through Rate",
    value: "",
    isTop: true,
    icon: <img style={{ width: "15px", height: "15px" }} alt='popl' src={popls} />,
  },
];

export default initialState;
