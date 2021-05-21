import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import useStyle from "./styles/styles";
import ChoiceCard from "./components/ExportToCrmCard";
import Header from "../../components/Header";
import addLinkIcon from "../../assets/add.png";
import SvgMaker from "../../components/svgMaker";

function ChoicePage() {
  const classes = useStyle();
  const history = useHistory();
  const allConnections = useSelector(({ connectionsReducer }) => connectionsReducer.connections.data?.allConnections);

  const exportToCrm = () => {
    const permittedNames = ["name", "email", "bio", "url", "time", "image", "views"];
    let arr = allConnections.map((item) => {
      let newItem = {};
      Object.keys(item).forEach((el) => (permittedNames.includes(el) ? newItem[el] = item[el] : null));
      return newItem;
    });
    const keys = permittedNames;
    let values = [];
    let stringValue = "";
    new Promise((res) => {
      arr.forEach((el, index) => {
        Object.keys(el).forEach((value) => {
          values.push({ value: el[value], key: value });
        });
        stringValue += `${values.sort((a, b) => a.key.localeCompare(b.key)).map(({ value }) => value).join(";")}\r\n`;

        values = [];
      });
      return res(stringValue);
    }).then((result) => {
      const svData = new Blob([`${keys.sort((a, b) => a.localeCompare(b)).join(";")}\r\n${result}`], { type: "text/csv" });
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
