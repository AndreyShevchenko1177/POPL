import * as d3 from "d3";
import ReactDOM from "react-dom";

function initGraph(nodes, links) {
  let width = window.innerWidth - 340;
  let height = window.innerHeight - 40;
  let svg = d3.select("#mainGraph");
  let simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-50))
    .force("link", d3.forceLink(links)
      .id((d, i) => d.id)
      .distance(35)
      .strength(1))
    .force("many", d3.forceManyBody().distanceMin(10).distanceMax(15))
    .force("center", d3.forceCenter().x(width / 2).y(height / 2))
    .force("collision", d3.forceCollide().radius((d) => d.radius + 10));

  const link = svg.append("g")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke-width", 1)
    .style("stroke", "bisque");

  let node = svg.selectAll(".node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node");
    // .call(simulation.drag);

  node.append("image")
    .attr("xlink:href", "https://github.com/favicon.ico")
    .attr("x", -8)
    .attr("y", -8)
    .attr("width", 16)
    .attr("height", 16);

  node.append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text((d) => d.name);

  simulation
    .nodes(nodes)
    .on("tick", ticked)
    .force("link")
    .links(links);

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
    fix_nodes(d);
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = d.x;
    d.fy = d.y;
  }

  // Preventing other nodes from moving while dragging one node
  function fix_nodes(this_node) {
    node.each((d) => {
      if (this_node != d) {
        d.fx = d.x;
        d.fy = d.y;
      }
    });
  }

  function ticked() {
    link.attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("transform", (d) => `translate(${d.x},${d.y})`);
  }
}

export default initGraph;
