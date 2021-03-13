import React, { useEffect, useRef } from "react";
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

  return (
        <div className={classes.wizardContainer} ref={ref} onBlur={blurHandler} tabIndex={1}>
            <div>
                <WizardPanel
                    data={data.reduce((sum, current) => {
                      sum.push(...current.social, ...current.business);
                      return sum;
                    }, [])}
                />
            </div>
        </div>
  );
}

export default CustomWizard;
