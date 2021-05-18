import React, { useEffect, useRef } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import WizardPanel from "./components/tabPanel";
import useStyles from "./styles/styles";
import icons from "../../pages/profiles/components/profilelsIcons/icons";

function CustomWizard({
  data, isOpen, setIsOpen, action,
}) {
  const classes = useStyles();
  const ref = useRef();

  const blurHandler = (event) => {
    // if (event.currentTarget.contains(event.relatedTarget)) return;
    // setIsOpen((v) => ({ ...v, open: false }));
  };

  useEffect(() => {
    ref.current?.focus();
  }, [isOpen]);

  return (
    <>
      <div className={classes.opacityBackground} onClick={() => setIsOpen((v) => ({ ...v, open: false }))}></div>
      <div className={classes.wizardContainer} ref={ref} onBlur={blurHandler} tabIndex={1}>
        <HighlightOffIcon onClick={() => setIsOpen((v) => ({ ...v, open: false }))} className={classes.closeIcon} />
        <div>
          <WizardPanel
            action={action}
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
