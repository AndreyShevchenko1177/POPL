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
/// ////////////////////////////////////////////////////////
/// //// Functions and variables
/// ////////////////////////////////////////////////////////

var FORCE = (function (nsp) {
  let width = 1080;
  let height = 800;
  let zoomTrans = { x: 0, y: 0, scale: 1 };
  let color = d3.scaleOrdinal(d3.schemeCategory10);
  let initForce = (nodes, links) => {
    nsp.force = d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-200))
      .force("link", d3.forceLink(links)
        .id((d, i) => d.id)
        .distance(35)
        .strength(1))
      .force("many", d3.forceManyBody().distanceMin(5).distanceMax(10))
      .force("center", d3.forceCenter().x(nsp.width / 2).y(nsp.height / 2))
      .force("collide", d3.forceCollide([5]).iterations([5]));
  };

  let enterNode = (selection) => {
    let circle = selection.select("circle")
      .attr("r", (d) => {
        if (typeof d.id === "string") {
          return 25;
        }
        return 5;
      })
      .style("fill", (d) => {
        if (typeof d.id === "string") {
          return "tomato";
        } return "green";
      })
      .style("stroke", "bisque")
      .style("stroke-width", "0px");

    selection.select("text")
      .style("fill", "honeydew")
      .style("font-weight", "600")
      .style("text-transform", "uppercase")
      .style("text-anchor", "middle")
      .style("alignment-baseline", "middle")
      .style("font-size", "10px")
      .style("font-family", "cursive");
  };

  let updateNode = (selection) => {
    selection
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .attr("cx", (d) => d.x = Math.max(30, Math.min(width - 30, d.x)))
      .attr("cy", (d) => d.y = Math.max(30, Math.min(height - 30, d.y)));
  };

  let enterLink = (selection) => {
    selection
      .attr("stroke-width", 1)
      .attr("stroke", "bisque");
  };

  let updateLink = (selection) => {
    selection
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);
  };

  let updateGraph = (selection) => {
    selection.selectAll(".node")
      .call(updateNode);
    selection.selectAll(".link")
      .call(updateLink);
  };

  let dragStarted = (d) => {
    if (!d3.event.active) nsp.force.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  };

  let dragging = (d) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  };

  let dragEnded = (d) => {
    if (!d3.event.active) nsp.force.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  };

  let drag = () => d3.selectAll("g.node")
    .call(d3.drag()
      .on("start", dragStarted)
      .on("drag", dragging)
      .on("end", dragEnded));

  let tick = (that) => {
    that.d3Graph = d3.select(ReactDOM.findDOMNode(that));
    nsp.force.on("tick", () => {
      that.d3Graph.call(updateGraph);
    });
  };

  const zoom = () => {
    let svg = d3.select("#mainGraph");
    let g = d3.select("#mainGraph").selectAll(".child");
    let zoom = d3.zoom()
      .scaleExtent([0.25, 2.25])
      .on("zoom", () => {
        zoomTrans.x = d3.event.transform.x;
        zoomTrans.y = d3.event.transform.y;
        zoomTrans.scale = d3.event.transform.k;
        g.attr("transform", d3.event.transform);
      });

    svg.call(zoom)
      .on("dblclick.zoom", null);
  };

  nsp.width = width;
  nsp.height = height;
  nsp.enterNode = enterNode;
  nsp.updateNode = updateNode;
  nsp.enterLink = enterLink;
  nsp.updateLink = updateLink;
  nsp.updateGraph = updateGraph;
  nsp.initForce = initForce;
  nsp.dragStarted = dragStarted;
  nsp.dragging = dragging;
  nsp.dragEnded = dragEnded;
  nsp.drag = drag;
  nsp.tick = tick;
  nsp.zoom = zoom;

  return nsp;
}(FORCE || {}));

/// /////////////////////////////////////////////////////////////////////////
/// //// class App is the parent component of Link and Node
/// /////////////////////////////////////////////////////////////////////////

class App extends React.Component {
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
      <div className="graph__container">
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

/// ////////////////////////////////////////////////////////
/// //// Link component
/// ////////////////////////////////////////////////////////

class Link extends React.Component {
  componentDidMount() {
    this.d3Link = d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .call(FORCE.enterLink);
  }

  componentDidUpdate() {
    this.d3Link.datum(this.props.data)
      .call(FORCE.updateLink);
  }

  render() {
    return (
      <line className='link' />
    );
  }
}

/// ////////////////////////////////////////////////////////
/// //// Node component
/// ////////////////////////////////////////////////////////

class Node extends React.Component {
  componentDidMount() {
    this.d3Node = d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .call(FORCE.enterNode);
  }

  componentDidUpdate() {
    this.d3Node.datum(this.props.data)
      .call(FORCE.updateNode);
  }

  render() {
    return (
      <g className='node'>
        <circle onClick={this.props.addLink} />
        <text>{this.props.data.name}</text>
      </g>
    );
  }
}

export default App;
