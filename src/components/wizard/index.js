import React, { useEffect, useRef } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import WizardPanel from "./components/tabPanel";
import useStyles from "./styles/styles";

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

  const handleFilterDuplicatesLinks = (array) => array.sort((a, b) => a.id - b.id)
    .map((el, i) => {
      if (el.id !== array[i + 1]?.id) return el;
      return undefined;
    })
    .filter((el) => !!el);

  return (
    <>
      <div className={classes.opacityBackground}></div>
      <div className={classes.wizardContainer} ref={ref} onBlur={blurHandler} tabIndex={1}>
        <HighlightOffIcon onClick={() => setIsOpen((v) => ({ ...v, open: false }))} className={classes.closeIcon} />
        <div>
          <WizardPanel
            closeWizard={() => setIsOpen((v) => ({ ...v, open: false }))}
            data={data.reduce((sum, current) => {
              sum.push(...handleFilterDuplicatesLinks([...current.social, ...current.business]));
              return sum;
            }, [])}
          />
        </div>
      </div>
    </>
  );
}

export default CustomWizard;
