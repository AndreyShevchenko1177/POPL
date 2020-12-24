import React from "react";
//uses useSelector hook
import CounterVal from "./CounterValue";
//uses useDispatch hook
import CounterNav from "./CounterNav";
import "./counter.css";

function Counter() {
  // console.log("Counter...", props);
  return (
    <section className="counter">
      <h1>Counter</h1>
      <CounterVal />
      <CounterNav />
    </section>
  );
}

export default React.memo(Counter);
