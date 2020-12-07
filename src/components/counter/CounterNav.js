import React from "react";
import { useDispatch } from "react-redux";
import { increase, decrease, reset } from "./store/counterAction";

export const CounterNav = () => {
  const dispatch = useDispatch();
  return (
    <div className="counter-nav">
      <button onClick={() => dispatch(decrease(1))}>Decrease</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <button onClick={() => dispatch(increase(1))}>Increase</button>
    </div>
  );
};

export default React.memo(CounterNav);
