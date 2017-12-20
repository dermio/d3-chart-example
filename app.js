let stressors = {
    "stress": "too much work at job",
    "activity": "meditate",
    "duration": 5,
    "preHeartRate": 80,
    "postHeartRate": 70
};

/***************************/

// The chart will be 600 wide, 400 high

let margin = {top: 10, right: 10, bottom: 10, left: 10};
let width = 600 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom;

let xScale = d3.scaleBand()
              .domain(["pre-HR", "post-HR"])
              .range([0, width]);

let yScale = d3.scaleLinear()
              .domain([0, 100])
              .range([0, 400]);

let xAxis = d3.axisBottom(xScale);

let svg = d3.select("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

let g = svg.append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`)
          .attr("class", "parent-group");
/*
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height})`)
    .call(x)
  */