/***** Code for D3.js v4.0 *****/

let stressors = {
  "stress": "too much work at job",
  "activity": "meditate",
  "duration": 5,
  "preHeartRate": 80,
  "postHeartRate": 70
};

/* The Array data used by D3 has been previously requested
elsewhere in the code. I put the values in an Array so D3 can
manipulate the data to create the chart. Note: D3 often uses
a requested data file such as CSV, TSV, JSON, etc... */
let stressArr = [
  {typeHR: "preHeartRate", heartRate: 80},
  {typeHR: "postHeartRate", heartRate: 70}
];

/***************************/

// The chart will be 600 wide, 400 high

// The dimensions and margins of the chart
let margin = {top: 30, right: 30, bottom: 60, left: 60};
let width = 600 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom;

// Set the scale, domain, and range
let xScale = d3.scaleBand()
              //.domain(["pre-HR", "post-HR"])
              .domain(stressArr.map(d => d.typeHR))
              .range([0, width])
              .padding(.2); // padding between the discreet bands

let greaterHR = stressArr.map(d => d.heartRate); console.log(greaterHR);
let scaledGreaterHR = d3.max(greaterHR) * 1.2; console.log(scaledGreaterHR);
let yScale = d3.scaleLinear()
              //.domain([0, 100])
              .domain([0, scaledGreaterHR])
              .range([height, 0]);

/* Select the svg element for the chart, and set the width and height.
Optionally append the svg element to a pre-existing element */
let chart = d3.select(".container")
            .append("svg")
              .attr("class", "chart")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom);

// Append a group element to the svg element
let parentG = chart.append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`)
          .attr("class", "parent-group");

/* Append two groups to the outer group element.
Add the x-Axis to the first group, and the y-Axis to the second group. */
parentG.append("g")
	.attr("transform", `translate(0, ${height})`)
	.call(d3.axisBottom(xScale))
  .attr("class", "x-axis");

parentG.append("g")
	.call(d3.axisLeft(yScale))
	.attr("class", "y-axis");

// Append the rectangles for the bar chart
parentG.selectAll(".bar")
    .data(stressArr)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.typeHR))
    .attr("width", xScale.bandwidth())
    .attr("y", d => yScale(d.heartRate))
    .attr("height", d => height - yScale(d.heartRate));

// Add label for x axis
parentG.append("text")
  .attr("transform",
        `translate(${width / 2}, ${height + margin.bottom * 0.7})`)
  .style("text-anchor", "middle")
  .text("heart rates before and after relaxation activity")
  .attr("class", "x-axis-label");

// Add label for y axis
parentG.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - height / 2)
  .attr("dy", "1.5em")
  .style("text-anchor", "middle")
  .text("beats per minute")
  .attr("class", "y-axis-label");
