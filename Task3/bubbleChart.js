var showNumber=10;

// set the dimensions and margins of the graph
var margin = {top: 40, right: 150, bottom: 60, left: 70},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#bubbleChart")
  .append("svg")
    .attr("width", width+200 + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//const data = await d3.csv("../data/assignment1_final.csv");

// notice: I first calculated the 6 most populated trees among all the neighborhoods in a descending order. 
//And using that list, I extracted rows with the name of selected trees,
const total = await d3.csv("../data/best_selling_artists_final.csv");

const sorted=total.sort(function (a,b) {
    return d3.descending(parseInt(a.Sales),parseInt(b.Sales));
})
var sorted_selected=[]
let filtered_data=[]
for(let i=0;i<showNumber;i++)
sorted_selected.push(sorted[i])
//console.log(sorted_selected)
var sorted_selected_names=[]
sorted_selected.forEach((element,index)=>{
   // console.log(element.Name)
   if(!sorted_selected_names.includes(element.Country))
    sorted_selected_names.push( element.Country);
    filtered_data.push(element)
}) 



//Read the data
//d3.csv("/data/dataPreProcess/assignment2_final.csv", function(data) {
    //const data = await d3.csv("../data/best_selling_artists_final.csv");
    // let data2=[]
    // data2.push(data);
    // sorted_selected_names.forEach(n => {
    //    data2.filter(e => {return n === e.Name})
    //     .forEach(element=>{ filtered_data.push(element)  }
                

     //   )
   // })


  //  data.forEach(element => {
  //   if( sorted_selected_names.includes(element.Country))
  //   filtered_data.push(element)
  //  });
     console.log(filtered_data[3])



  // ---------------------------//
  //       AXIS  AND SCALE      //
  // ---------------------------//

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 70])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(3));

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height+50 )
      .text("Years Active");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 1000])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", 0)
      .attr("y", -20 )
      .text("Sales(Million)")
      .attr("text-anchor", "start")

  // Add a scale for bubble size
  var z = d3.scaleSqrt()
    //.domain([200000, 1310000000])
    .domain([0, 400])
    .range([ 1, 15]);

  // Add a scale for bubble color
  var myColor = d3.scaleOrdinal()
    .domain(sorted_selected_names)
    //.range(d3.schemeSet1);
      .range(['#EF1B0A','#F69D96','#D39550','#834806','#988066','#E7E710','#747459','#AEEB83','#0C64D6','634DBB','#8C4DBB','#180923','#DB06F9','#F906A1','#F90606','orange','gray']);



  // ---------------------------//
  //      TOOLTIP               //
  // ---------------------------//

  // -1- Create a tooltip div that is hidden by default:
  const tooltip = d3.select("#bubbleChart")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")
      .style('z-index',2)
      .style('position','absolute')
     
  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  const showTooltip = function(event,d) {
    console.log('im here')
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html("Artist: " + d.Artist + "<br> TCU:"+ d['TCU'] + "<br> Sales:"+ d['Sales'])
      // .style("left", document.getElementById('#bubbleChart').getBoundingClientRect().x  + "200px")
      // .style("top", document.getElementById('#bubbleChart').getBoundingClientRect().y + "200px")
      .style("left", event.pageX+60)
      .style("top", event.pageY-60)
     
      console.log(event.clientX)
      
  }
  const moveTooltip = function(event, d) {
    tooltip
      // .style("left", (event.x)/2 + "px")
      // .style("top", (event.y)/2-50 + "px")
      // .style("left", document.getElementById('#bubbleChart').getBoundingClientRect().x  + "200px")
      // .style("top", document.getElementById('#bubbleChart').getBoundingClientRect().y+ "200px")
      .style("left", event.pageX+60+'px')
      .style("top", event.pageY-60+'px')
  }
  const hideTooltip = function(event, d) {
    tooltip
      .transition()
      .duration(50)
      .style("opacity", 0)
      .style("left", event.pageX+60)
      .style("top", event.pageY-60)
  }


  // ---------------------------//
  //       HIGHLIGHT GROUP      //
  // ---------------------------//

  // What to do when one group is hovered
  const highlight = function(event, d){
  
    // reduce opacity of all groups
    d3.selectAll("circle").style("opacity", .01)
    // expect the one that is hovered
    // NOTICE: We can not give a class with spaces so replaced it with "-"" . CSS can receive many classes at the same tim, but for d3.selectAll, you have to pass only one class.
    // so we overcome this by replacing spaces with "-" 
    d3.selectAll(".bubbles-" + d.replaceAll(" ", "-")).style("opacity", 1)
  }

  // And when it is not hovered anymore
  const noHighlight = function(event, d){
    d3.selectAll("circle").style("opacity", 1)
  }



  // ---------------------------//
  //       CIRCLES              //
  // ---------------------------//

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(filtered_data)
    .enter()
    .append("circle")
      .attr("class", function(d) {  return "bubbles-" + d.Country.replaceAll(" ", "-") })
      .attr("cx", function (d) { return x(parseFloat(d['years_active'])); } )
      .attr("cy", function (d) { return y(parseFloat(d['Sales'])); } )
      .attr("r", function (d) { return z(parseFloat(d['TCU'])); } )
      .style("fill", function (d) {
        return myColor(d.Country); 
      } )
    // -3- Trigger the functions for hover
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )



    // ---------------------------//
    //       LEGEND              //
    // ---------------------------//

    // Add legend: circles
    const valuesToShow = [10000000, 100000000, 1000000000]
    const xCircle = 500
    const xLabel = 440
    // svg
    //   .selectAll("legend")
    //   .data(valuesToShow)
    //   .join("circle")
    //     .attr("cx", xCircle)
    //     .attr("cy", d => height - 100 - z(d))
    //     .attr("r", d => z(d))
    //     .style("fill", "none")
    //     .attr("stroke", "None")

    // // Add legend: segments
    // svg
    //   .selectAll("legend")
    //   .data(valuesToShow)
    //   .join("line")
    //     .attr('x1', d => xCircle + z(d))
    //     .attr('x2', xLabel)
    //     .attr('y1', d => height - 100 - z(d))
    //     .attr('y2', d => height - 100 - z(d))
    //     .attr('stroke', 'None')
    //     .style('stroke-dasharray', ('2,2'))

    // Add legend: labels
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .join("text")
        .attr('x', xLabel)
        .attr('y', d => height - 100 - z(d))
        .text( d => d/1000000)
        .style("font-size", 10)
        .attr('width',100)
        .attr('alignment-baseline', 'middle')

    // Legend title
    svg.append("text")
      .attr('x', xCircle+30)
      .attr("y", height-420)
      .text("Country")
      .attr('width',100)
      .attr("text-anchor", "middle")

    // Add one dot in the legend for each name.
    const size = 20
    const allgroups = sorted_selected_names
    svg.selectAll("myrect")
      .data(allgroups)
      .join("circle")
        .attr("cx", 500)
        .attr("cy", (d,i) => 10 + i*(size+5)) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", d =>  myColor(d))
        .attr('width',100)
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)

    // Add labels beside legend dots
    svg.selectAll("mylabels")
      .data(allgroups)
      .enter()
      .append("text")
        .attr("x", 500 + size*.8)
        .attr("y", (d,i) =>  i * (size + 5) + (size/2)) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", d => myColor(d))
        .text(d => d)
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)
 // })


 document.getElementById("singers3").onchange =  async function() {onchange_action(this.value)};

 async function onchange_action(e)
{
  
    document.getElementById("bubbleChart").innerHTML=""
    showNumber=e

    var margin = {top: 40, right: 150, bottom: 60, left: 70},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#bubbleChart")
  .append("svg")
    .attr("width", width+200 + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//const data = await d3.csv("../data/assignment1_final.csv");

// notice: I first calculated the 6 most populated trees among all the neighborhoods in a descending order. 
//And using that list, I extracted rows with the name of selected trees,
const total = await d3.csv("../data/best_selling_artists_final.csv");

const sorted=total.sort(function (a,b) {
    return d3.descending(parseInt(a.Sales),parseInt(b.Sales));
})
var sorted_selected=[]
let filtered_data=[]
for(let i=0;i<showNumber;i++)
sorted_selected.push(sorted[i])
//console.log(sorted_selected)
var sorted_selected_names=[]
sorted_selected.forEach((element,index)=>{
   // console.log(element.Name)
   if(!sorted_selected_names.includes(element.Country))
    sorted_selected_names.push( element.Country);
    filtered_data.push(element)
}) 
console.log(sorted_selected_names)
//console.log(sorted_selected_names)


//Read the data
//d3.csv("/data/dataPreProcess/assignment2_final.csv", function(data) {
    //const data = await d3.csv("../data/best_selling_artists_final.csv");
    // let data2=[]
    // data2.push(data);
    // sorted_selected_names.forEach(n => {
    //    data2.filter(e => {return n === e.Name})
    //     .forEach(element=>{ filtered_data.push(element)  }
                

     //   )
   // })


  //  data.forEach(element => {
  //   if( sorted_selected_names.includes(element.Country))
  //   filtered_data.push(element)
  //  });
     console.log(filtered_data[3])



  // ---------------------------//
  //       AXIS  AND SCALE      //
  // ---------------------------//

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 70])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(3));

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height+50 )
      .text("Years Active");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 1000])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", 0)
      .attr("y", -20 )
      .text("Sales(Million)")
      .attr("text-anchor", "start")

  // Add a scale for bubble size
  var z = d3.scaleSqrt()
    //.domain([200000, 1310000000])
    .domain([0, 400])
    .range([ 1, 15]);

  // Add a scale for bubble color
  var myColor = d3.scaleOrdinal()
    .domain(sorted_selected_names)
    .range(['#EF1B0A','#F69D96','#D39550','#834806','cyan','#E7E710','#747459','#AEEB83','#0C64D6','#634DBB','#8C4DBB','#180923','#DB06F9','#F906A1','orange','gray']);


  // ---------------------------//
  //      TOOLTIP               //
  // ---------------------------//

  // -1- Create a tooltip div that is hidden by default:
  const tooltip = d3.select("#bubbleChart")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")
      .style('z-index',2)
      .style('position','absolute')
      
  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  const showTooltip = function(event,d) {
    
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html("Artist: " + d.Artist + "<br> TCU:"+ d['TCU'] + "<br> Sales:"+ d['Sales'])
      // .style("left", document.getElementById('#bubbleChart').getBoundingClientRect().x  + "200px")
      // .style("top", document.getElementById('#bubbleChart').getBoundingClientRect().y + "200px")
      .style("left", event.pageX+60)
      .style("top", event.pageY-60)
     
      console.log(event.clientX)
     
  }
  const moveTooltip = function(event, d) {
    tooltip
      // .style("left", (event.x)/2 + "px")
      // .style("top", (event.y)/2-50 + "px")
      // .style("left", document.getElementById('#bubbleChart').getBoundingClientRect().x  + "200px")
      // .style("top", document.getElementById('#bubbleChart').getBoundingClientRect().y+ "200px")
      .style("left", event.pageX+60+'px')
      .style("top", event.pageY-60+'px')
  }
  const hideTooltip = function(event, d) {
    tooltip
      .transition()
      .duration(50)
      .style("opacity", 0)
      .style("left", event.pageX+60+'px')
      .style("top", event.pageY-60+'px')
  }


  // ---------------------------//
  //       HIGHLIGHT GROUP      //
  // ---------------------------//

  // What to do when one group is hovered
  const highlight = function(event, d){
  
    // reduce opacity of all groups
    d3.selectAll("circle").style("opacity", .01)
    // expect the one that is hovered
    // NOTICE: We can not give a class with spaces so replaced it with "-"" . CSS can receive many classes at the same tim, but for d3.selectAll, you have to pass only one class.
    // so we overcome this by replacing spaces with "-" 
    d3.selectAll(".bubbles-" + d.replaceAll(" ", "-")).style("opacity", 1)
  }

  // And when it is not hovered anymore
  const noHighlight = function(event, d){
    d3.selectAll("circle").style("opacity", 1)
  }



  // ---------------------------//
  //       CIRCLES              //
  // ---------------------------//

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(filtered_data)
    .enter()
    .append("circle")
      .attr("class", function(d) {  return "bubbles-" + d.Country.replaceAll(" ", "-") })
      .attr("cx", function (d) { return x(parseFloat(d['years_active'])); } )
      .attr("cy", function (d) { return y(parseFloat(d['Sales'])); } )
      .attr("r", function (d) { return z(parseFloat(d['TCU'])); } )
      .style("fill", function (d) { 
      return myColor(d.Country);  
    } )
    // -3- Trigger the functions for hover
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )



    // ---------------------------//
    //       LEGEND              //
    // ---------------------------//

    // Add legend: circles
    const valuesToShow = [10000000, 100000000, 1000000000]
    const xCircle = 500
    const xLabel = 440
    // svg
    //   .selectAll("legend")
    //   .data(valuesToShow)
    //   .join("circle")
    //     .attr("cx", xCircle)
    //     .attr("cy", d => height - 100 - z(d))
    //     .attr("r", d => z(d))
    //     .style("fill", "none")
    //     .attr("stroke", "None")

    // // Add legend: segments
    // svg
    //   .selectAll("legend")
    //   .data(valuesToShow)
    //   .join("line")
    //     .attr('x1', d => xCircle + z(d))
    //     .attr('x2', xLabel)
    //     .attr('y1', d => height - 100 - z(d))
    //     .attr('y2', d => height - 100 - z(d))
    //     .attr('stroke', 'None')
    //     .style('stroke-dasharray', ('2,2'))

    // Add legend: labels
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .join("text")
        .attr('x', xLabel)
        .attr('y', d => height - 100 - z(d))
        .text( d => d/1000000)
        .style("font-size", 10)
        .attr('width',100)
        .attr('alignment-baseline', 'middle')

    // Legend title
    svg.append("text")
    .attr('x', xCircle+30)
    .attr("y", height-420)
      .text("Country")
      .attr('width',100)
      .attr("text-anchor", "middle")

    // Add one dot in the legend for each name.
    const size = 20
    const allgroups = sorted_selected_names
    svg.selectAll("myrect")
      .data(allgroups)
      .join("circle")
        .attr("cx", 500)
        .attr("cy", (d,i) => 10 + i*(size+5)) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", d =>  myColor(d))
        .attr('width',100)
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)

    // Add labels beside legend dots
    svg.selectAll("mylabels")
      .data(allgroups)
      .enter()
      .append("text")
        .attr("x", 500 + size*.8)
        .attr("y", (d,i) =>  i * (size + 5) + (size/2)) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", d => myColor(d))
        .text(d => d)
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)
 // })
};