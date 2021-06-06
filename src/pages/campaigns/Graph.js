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
    this.state = {};
  }

  componentDidMount() {
    if (this.props.data) {
      const { data } = this.props;
      console.log(data);
      FORCE.initForce(data.nodes, data.links);
      FORCE.tick(this);
      FORCE.drag();
      FORCE.zoom();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.nodes !== this.state.nodes || prevState.links !== this.state.links) {
      const { data } = this.props;
      FORCE.initForce(data.nodes, data.links);
      FORCE.tick(this);
      FORCE.drag();
    }
  }

  render() {
    let links = this.props.data.links.map((link) => (
      <Link
        key={link.id}
        data={link}
      />));
    let nodes = this.props.data.nodes.map((node) => (
      <Node
        data={node}
        name={node.name}
        key={node.id}
      />));
    return (
      <div style={{ padding: 20 }} className="graph__container">
        <svg id='mainGraph' className="graph" width={FORCE.width} height={FORCE.height}>
          <g className='child'>
            {links}
          </g>
          <g className='child'>
            {nodes}
          </g>
        </svg>
      </div>
    );
  }
}

export default Graph;
