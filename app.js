let stressors = {
	"stress": "too much work at job",
	"activity": "meditate",
	"duration": 5,
	"preHeartRate": 80,
	"postHeartRate": 70
};

let stressArr = [
  {activity: "preHeartRate", heartRate: 80},
  {activity: "postHeartRate", heartRate: 70}
];

/***************************/

// The chart will be 600 wide, 400 high

// The dimensions and margins of the chart
let margin = {top: 30, right: 30, bottom: 40, left: 50};
let width = 600 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom;

// Set the scale, domain and range
let xScale = d3.scaleBand()
              //.domain(["pre-HR", "post-HR"])
              .domain(stressArr.map(d => d.activity))
              .range([0, width])
              .padding(0.1); // padding between the discreet bands

let greaterHR = stressArr.map(d => d.heartRate); console.log(greaterHR);
let scaledGreaterHR = d3.max(greaterHR) * 1.1; console.log(scaledGreaterHR);
let yScale = d3.scaleLinear()
              //.domain([0, 100])
              .domain([0, scaledGreaterHR])
              .range([height, 0]);

/* Select the svg element for the chart, and set the width and height.
Optionally append the svg element to a pre-existing element */
let svg = d3.select("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

// Append a group element to the svg element
let g = svg.append("g")
					.attr("transform", `translate(${margin.left}, ${margin.top})`)
          .attr("class", "parent-group");

/* Append two groups to the outer group element.
Add the x-Axis to the first group, and the y-Axis to the second group. */
g.append("g")
	.attr("transform", `translate(0, ${height})`)
	.call(d3.axisBottom(xScale))
	.attr("class", "x-scale-group");

g.append("g")
	.call(d3.axisLeft(yScale))
	.attr("class", "y-scale-group");;
