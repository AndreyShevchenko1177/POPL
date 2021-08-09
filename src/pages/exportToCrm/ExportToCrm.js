import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Papa from "papaparse";
import useStyle from "./styles/styles";
import ChoiceCard from "./components/ExportToCrmCard";
import Header from "../../components/Header";
import SvgMaker from "../../components/svgMaker";
import salesForceIcon from "../../assets/connections/Salesforcecom_logo.png";
import hubspotIcon from "../../assets/connections/519-5197570_hubspot-hubspot-sprocket-clipart.png";

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
        firstChild
        path='/connections'
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
                Icon={() => <SvgMaker width={45} height={45} margin-bottom={"20px"} name={"csv"} fill='#fff' />}
                title='Export to CSV' titleStyle = {{ marginTop: "7px" }}
                // description='Add profiles from existing Popl profiles'
              />
            </div>
            <div className={classes.choiceCardContainer} onClick={() => {}}>
              <ChoiceCard
                Icon={() => <img className={classes.addLink} alt='add-icon' src={salesForceIcon}/>}
                title='Export to Salesforce'
                onClick={() => history.push("/connections/crm-salesforce", { path: "/connections/export-to-crm" })}
                // description='Create new Popl profiles to add'
              />
            </div>
            <div className={classes.choiceCardContainer} onClick={() => {}}>
              <ChoiceCard
                Icon={() => <img className={classes.addLink} alt='add-icon' src={hubspotIcon}/>}
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
