/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import FORCE from "./components/forceFunction";
import Node from "./components/Node";
import Link from "./components/Link";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { simulation: null };
    this.width = window.innerWidth - 340;
    this.height = window.innerHeight - 40;
  }

  componentDidMount() {
    if (this.props.data) {
      const { data } = this.props;
      this.setState({ simulation: FORCE(data.nodes, data.links) });
      // FORCE.tick(this);
      // FORCE.drag();
      // FORCE.zoom();
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.nodes !== this.state.nodes || prevState.links !== this.state.links) {
  //     const { data } = this.props;
  //     FORCE(data.nodes, data.links);
  //     // FORCE.tick(this);
  //     // FORCE.drag();
  //   }
  // }

  componentWillUnmount() {
    this.state.simulation();
  }

  render() {
    return (
      <div style={{ padding: 20 }} className="graph__container">
        <svg id='mainGraph' className="graph" width={this.width} height={this.height}>
          <g id="links" className='child'></g>
          <g id="nodes" className='child'></g>
        </svg>
      </div>
    );
  }
}

export default Graph;
