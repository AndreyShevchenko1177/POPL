import React, { useEffect, useRef } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import WizardPanel from "./components/tabPanel";
import useStyles from "./styles/styles";
import icons from "../../pages/profiles/components/profilelsIcons/icons";

function CustomWizard({ data, isOpen, setIsOpen }) {
  const classes = useStyles();
  const ref = useRef();

  const blurHandler = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setIsOpen((v) => ({ ...v, open: false }));
  };

  useEffect(() => {
    ref.current?.focus();
  }, [isOpen]);

  return (
    <>
      <div className={classes.opacityBackground}></div>
      <div className={classes.wizardContainer} ref={ref} onBlur={blurHandler} tabIndex={1}>
        <HighlightOffIcon onClick={() => setIsOpen((v) => ({ ...v, open: false }))} className={classes.closeIcon} />
        <div>
          <WizardPanel
            closeWizard={() => setIsOpen((v) => ({ ...v, open: false }))}
            data={Object.keys(icons).map((item) => ({ id: item, icon: icons[item] }))}
          />
        </div>
      </div>
    </>
  );
}

export default CustomWizard;
