let airports

function fetchData(){
	fetch('/airports.json')//'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3df9fab6-45a1-43ed-8f89-1d3ba6735d1c/airports.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211020%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211020T203444Z&X-Amz-Expires=86400&X-Amz-Signature=107196f61b544a6fdf497800f5f485ec94fcfc6e64e5cfc0bb74fb76c2ce081c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22airports.json%22')
    	.then(response => response.json())
    	.then(data => {
			//airports =data;
        	console.log('airports', data); 
			
		console.log('airports2', data);
	
const margin = ({top: 40, right: 40, bottom: 50, left: 50})
const width = 700 - margin.left - margin.right,
	height = 600- margin.top - margin.bottom; 
	
var svg = d3.select(".chart").append("svg")
	
	.attr("viewBox", [0,0,width,height]) 
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 

const xScale = d3
	.scaleLinear()
	.domain([d3.min(data.nodes, function(d){return d.latitude;}),d3.max(data.nodes, function(d) { return d.latitude; })])
	.range([0,width]);
const yScale =d3
	.scaleLinear()
	.domain([height,0])
	.range([d3.min(data.nodes, function(d){return d.longitude;}),d3.max(data.nodes, function(d) {return d.lognitude;})]);




var link = svg.append("g")
	.attr("class", "links")
  	.selectAll("line")
  	.data(data.links)
  	.enter().append("line")
	  .attr('stroke','black')
	  .attr("stroke-width",1.5)

var node = svg.append("g")
	.attr("class", "nodes")
	.selectAll("circle")
	.data(data.nodes)
	.enter()
	.append("circle")
		.attr('r', function(d){
			var size =5
			size = size +(size* (d.passengers *.00000007))
			return size;
		})
	.style("fill", "orange") 
	.call(d3.drag()
		.on("start", dragstart)
		.on("drag", drag)
		.on("end", dragend));
	console.log("circles",node);

	const simulation = d3.forceSimulation(data.nodes)
	  .force("link", d3.forceLink().id(function(d, i) { return d.index; }))
	  .force("charge", d3.forceManyBody())
    	.force("center", d3.forceCenter(width / 2, height / 2));


	simulation
		.nodes(data.nodes)
		.on("tick", ticked);
	simulation.force("link")
		.links(data.links);

	function ticked() {
			link
				.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });
			node
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
		  }

	function dragstart(d) {
		if (!d3.event.active) simulation.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
	}
	function drag(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}
	function dragend(d) {
		if (!d3.event.active) simulation.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	}

fetch('/world-110m.json')
.then(response => response.json())
    	.then(data => {
		//	var width = 960,
    //height = 1160;
	world = data;
	console.log("worldData", world);
const projection = d3.geoMercator()
	.scale([180])
	//.center(world[0].objects.coordinates)
	.translate([width / 3, height / 3]);
var svg = d3.select("body").append("svg")
    	.attr("width", width)
    	.attr("height", height);

	svg.selectAll('path')
        .data(world.Topology)//.countries)
        //.join('path')
        .attr('d',d3.geoPath(projection))
        .attr('fill', "black")
        //.attr('stroke', landStroke)
        .attr('stroke-width', 1);


   
		
   
  })
  d3.selectAll("input[name=type]").on("change", event=>{
	visType = event.target.value;// selected button
	switchLayout();
});
function switchLayout() {
	if (visType === "map") {
		  // stop the simulation
		  // set the positions of links and nodes based on geo-coordinates
		  // set the map opacity to 1
	  } else { // force layout
		  // restart the simulation
		  // set the map opacity to 0
	  }
  }
  })
}
fetchData();