import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Papa from "papaparse";
import useStyle from "./styles/styles";
import ChoiceCard from "./components/ExportToCrmCard";
import Header from "../../components/Header";
import addLinkIcon from "../../assets/add.png";
import SvgMaker from "../../components/svgMaker";

function ChoicePage() {
  const classes = useStyle();
  const history = useHistory();
  const allConnections = useSelector(({ connectionsReducer }) => connectionsReducer.connections.data?.allConnections);

  const getNotFoundProperty = (el) => {
    let elem = el;
    if (!("url" in el)) {
      elem = { ...elem, url: "" };
    }
    if (!("number" in el)) {
      elem = { ...elem, number: "" };
    }
    if (!("bio" in el)) {
      elem = { ...elem, bio: "" };
    }
    if (!("name" in el)) {
      elem = { ...elem, name: "" };
    }
    if (!("email" in el)) {
      elem = { ...elem, email: "" };
    }
    if (!("time" in el)) {
      elem = { ...elem, number: "" };
    }
    if (!("image" in el)) {
      elem = { ...elem, image: "" };
    }
    if (!("views" in el)) {
      elem = { ...elem, views: "" };
    }
    if (!("bioBusiness" in el)) {
      elem = { ...elem, bioBusiness: "" };
    }
    if (!("location" in el)) {
      elem = { ...elem, location: "" };
    }
    if (!("long" in el)) {
      elem = { ...elem, long: "" };
    }
    if (!("lat" in el)) {
      elem = { ...elem, lat: "" };
    }
    if (!("note" in el)) {
      elem = { ...elem, note: "" };
    }
    return elem;
  };

  const exportToCrm = () => {
    const permittedNames = ["name", "email", "number", "bioBusiness", "bio", "url", "time", "location", "lat", "long", "note", "image", "views"];
    const phantomNamesObject = {
      name: 1, email: 2, number: 3, bio: 5, url: 6, time: 7, image: 12, views: 13, bioBusiness: 4, location: 8, lat: 9, long: 10, note: 11,
    };
    let arr = allConnections.map((item) => {
      let newItem = {};
      Object.keys(item).forEach((el) => (permittedNames.includes(el) ? newItem[el] = item[el] : null));
      return newItem;
    });
    const data = [];
    let values = [];
    new Promise((res) => {
      arr.forEach((el, index) => {
        const elem = getNotFoundProperty(el);
        Object.keys(elem).forEach((value) => {
          values.push({ value: String(elem[value]).replace(";", ""), sortNumber: phantomNamesObject[value] });
        });

        data.push(values.sort((a, b) => a.sortNumber - b.sortNumber).map(({ value }) => value));
        values = [];
      });
      let csv = Papa.unparse({
        fields: permittedNames,
        data,
      });
      return res(csv);
    }).then((result) => {
      const svData = new Blob([result], { type: "text/csv" });
      let csvUrl = URL.createObjectURL(svData);
      let link = document.createElement("a");
      link.download = "my_data.csv";
      link.href = csvUrl;
      link.click();
    });
  };

  return (
    <>
      <Header
        rootLink="Connections"
        path='/connections'
        lastChild="Export to CRM"
      />
      <div className={classes.choiceContainer}>
        <div className={classes.choiceWrapper}>
          {/* <div className={classes.choiceHeader}>
            <span>
              What type of profiles do you want to add?
            </span>
          </div> */}
          <div className={classes.choiceCardsWrapper}>
            <div className={classes.choiceCardContainer} onClick={exportToCrm}>
              <ChoiceCard
                Icon={() => <SvgMaker width={30} height={30} name={"csv"} fill='#fff' />}
                title='Export to CSV'
                // description='Add profiles from existing Popl profiles'
              />
            </div>
            <div className={classes.choiceCardContainer} onClick={() => {}}>
              <ChoiceCard
                Icon={() => <img className={classes.addLink} alt='add-icon' src={addLinkIcon}/>}
                title='Export to Salesforce'
                // description='Create new Popl profiles to add'
              />
            </div>
            <div className={classes.choiceCardContainer} onClick={() => {}}>
              <ChoiceCard
                Icon={() => <img className={classes.addLink} alt='add-icon' src={addLinkIcon}/>}
                title='Export to Hubspot'
                // description='Create new Popl profiles to add'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChoicePage;
