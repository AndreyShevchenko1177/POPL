import React from "react";
import Header from "../../components/Header";
import Popl from "./Popl";

function Landing() {
  return (
    <div className="container">
      <div className="rightBarpopl">
        <div className="container-fluid">
          <Header />
          <div className="row">
            <Popl
              title={"Popl 1"}
              description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  dictum Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Ut dictum`}
            />
            <Popl
              title={"Popl 3"}
              description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  dictum Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Ut dictum`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
