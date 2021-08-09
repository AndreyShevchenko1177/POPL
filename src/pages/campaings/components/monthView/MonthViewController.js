import React, {
  memo, useCallback, useState,
} from "react";
import { correctDaysDisplay, correctDate, shallowCompare } from "../../helper";

import Context from "../../../../context";

function MonthViewController({
  quantity, children,
}) {
  const [modal, setModal] = useState({
    data: {},
    isShow: false,
  });

  const onModalHandler = useCallback((data, show) => {
    setModal((prevModalData) => {
      if (shallowCompare(data, prevModalData.data) && prevModalData.isShow === show) return prevModalData;
      return {
        data,
        isShow: show,
      };
    });
  }, []);

  const currentDay = correctDate(new Date());

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        data: correctDaysDisplay(quantity), modal, onModalHandler,
      });
    }
    return child;
  });

  return (
    <Context.Provider value={{ currentDay }}>
      {childrenWithProps}
    </Context.Provider>

  );
}

export default memo(MonthViewController);
