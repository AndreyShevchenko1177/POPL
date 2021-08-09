import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import WizardPanel from "./components/tabPanel";
import useStyles from "./styles/styles";
import icons from "../../pages/profiles/components/profilelsIcons/icons";

function CustomWizard({
  data, setIsOpen, action, styles, campaingsAction,
}) {
  const classes = useStyles();

  return (
    <>
      <div style={styles?.opacityBackground || {}} className={classes.opacityBackground} onClick={(event) => {
        setIsOpen((v) => ({ ...v, open: false }));
      }}></div>
      <div className={classes.wizardContainer}>
        <HighlightOffIcon onClick={() => setIsOpen((v) => ({ ...v, open: false }))} className={classes.closeIcon} />
        <div>
          <WizardPanel
            action={action}
            campaingsAction={campaingsAction}
            closeWizard={() => setIsOpen((v) => ({ ...v, open: false }))}
            data={Object.keys(icons).map((item) => ({ id: item, icon: icons[item] }))}
            profileData={data.reduce((sum, current) => ([...sum, { id: current.id, activeProfile: current.activeProfile }]), [])}
          />
        </div>
      </div>
    </>
  );
}

export default CustomWizard;
