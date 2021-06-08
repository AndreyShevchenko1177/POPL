import * as d3 from "d3";

function initGraph(nodes, links) {
  let width = window.innerWidth - 340;
  let height = window.innerHeight - 40;
  let zoomTrans = { x: 0, y: 0, scale: 1 };
  let nodeChild = d3.select("#mainGraph #nodes");
  let linksChild = d3.select("#mainGraph #links");
  let simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-50))
    .force("link", d3.forceLink(links)
      .id((d, i) => d.id)
      .distance(35)
      .strength(1))
    .force("many", d3.forceManyBody().distanceMin(10).distanceMax(15))
    .force("center", d3.forceCenter().x(width / 2).y(height / 2))
    .force("collision", d3.forceCollide().radius((d) => d.radius + 10))
    .force("radial", d3.forceRadial(Math.min(width, height) / 2 - 10)
      .strength((d) => (d.isConnected ? 0 : 2)));
  const link = linksChild
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke-width", 1)
    .style("stroke", "bisque");

  let node = nodeChild.selectAll(".node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node");
    // .call(simulation.drag);
  let defs = node.filter((d) => typeof d.id === "string").append("defs").attr("id", "imgdefs");
  // console.log(node.filter);

  let nodePattern = defs.append("pattern")
    .attr("id", (d) => d.id)
    .attr("height", 1)
    .attr("width", 1)
    .attr("x", "0")
    .attr("y", "0");

  nodePattern.append("image")
    .attr("xlink:href", (d) => {
      if (typeof d.id === "string") {
        if (d.image.includes(d.id)) {
          return d.image;
        }
        return "";
      }
      // return "https://www.clker.com/cliparts/z/l/v/A/K/R/green-circle-md.png";
    })
    .attr("x", (d) => (typeof d.id === "string" ? -25 : 5))
    .attr("y", (d) => (typeof d.id === "string" ? -25 : 5))
    .attr("height", (d) => (typeof d.id === "string" ? 100 : 20))
    .attr("width", (d) => (typeof d.id === "string" ? 100 : 20));
  // .attr("height", 80)
  // .attr("width", 75);

  node.append("circle")
    .attr("r", (d) => (typeof d.id === "string" ? 25 : 5))
    .attr("cy", 0)
    .attr("cx", 0)
    .attr("fill", (d) => {
      if (typeof d.id === "string") {
        if (d.image.includes(d.id)) {
          return `url(#${d.id})`;
        }
        return d.color;
      }
      return "green";
    });

  node.append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .text((d) => d.name);

  simulation
    .nodes(nodes)
    .on("tick", ticked)
    .force("link")
    .links(links);

  d3.selectAll("g.node")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  const zoom = () => {
    let svg = d3.select("#mainGraph");
    let g = d3.selectAll("#mainGraph .child");
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
    // .call(zoom.transform, d3.zoomIdentity.translate((width / 2) - 100, height / 2 - 100).scale(0.3));
  };
  zoom();
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

  return function stopSimulation() {
    simulation.stop();
  };
}

export default initGraph;
