import * as d3 from "d3";
import ReactDOM from "react-dom";

function initGraph(nsp) {
  let width = window.innerWidth - 340;
  let height = window.innerHeight - 40;
  let zoomTrans = { x: 0, y: 0, scale: 1 };
  let initForce = (nodes, links) => {
    nsp.force = d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-50))
      .force("link", d3.forceLink(links)
        .id((d, i) => d.id)
        .distance(35)
        .strength(1))
      .force("many", d3.forceManyBody().distanceMin(10).distanceMax(15))
      .force("center", d3.forceCenter().x(nsp.width / 2).y(nsp.height / 2))
      .force("collision", d3.forceCollide().radius((d) => d.radius + 10));
  };

  let node = d3.select("#mainGraph").selectAll("child");

  let enterNode = (selection) => {
    console.log(node);
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
    fix_nodes(d);
  };

  let dragEnded = (d) => {
    if (!d3.event.active) nsp.force.alphaTarget(0);
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  };

  // Preventing other nodes from moving while dragging one node
  function fix_nodes(this_node) {
    d3.selectAll("g.node").each((d) => {
      if (this_node != d) {
        d.fx = d.x;
        d.fy = d.y;
      }
    });
  }

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
}

const FORCE = initGraph({});

export default FORCE;
