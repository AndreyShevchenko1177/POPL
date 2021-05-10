import { Paper } from "@material-ui/core";
import { useState } from "react";
import Header from "../../components/Header";
import useStyles from "./styles/styles";
import TemplateItem from "./components/TemplateItem";
import AssignTemplate from "../addTemplate/components/AssignTemplate";

const linksConfig = [
  {
    id: 1,
    name: "Template 1",
  },
  {
    id: 2,
    name: "Template 2",
  },
  {
    id: 3,
    name: "Template 3",
  },
];

function MyTemplates() {
  const classes = useStyles();
  const [isShowAssign, setIsShowAssign] = useState(false);

  return (
    <>
      <Header
        rootLink="Templates"
        path='/templates'
        lastChild="My Templates"
      />
      <div className={classes.container}>
        <Paper className={classes.templatesContainer}>
          {linksConfig.map((template) => <TemplateItem key={template.id} {...template} showAssign={() => setIsShowAssign(true)} />)}
        </Paper>
        <AssignTemplate isShow={isShowAssign} handleClose={() => setIsShowAssign(false)} />
      </div>
    </>
  );
}

export default MyTemplates;
