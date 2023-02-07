const data = await d3.csv("../data/best_selling_artists_final.csv");
var genras={}
data.forEach(element => {
    var str= element.Genre;
    var str=str.toLowerCase();
    var searchKeyword = "/";

    var startingIndices = [];
    
    var indexOccurence = str.indexOf(searchKeyword, 0);

    while(indexOccurence >= 0) {
        startingIndices.push(indexOccurence);
        
        indexOccurence = str.indexOf(searchKeyword, indexOccurence + 1);
    }
    
    var number = startingIndices.length
   
    //console.log(str)
    var genres=[]
    var value=0
    var start=0
    var end=1
    if((str.slice(0,startingIndices[start]).trim())in genras)
    {

        //genres.push(str.slice(0,startingIndices[start]))
        
        var temp=str.slice(0,startingIndices[start]).trim().replace('/','')
        genras[str.slice(0,startingIndices[start]).trim().replace('/','')]+=1
       // value+=1
       //genres.push({'genre':temp,'value':1})
    }
    else
    {
        var temp=str.slice(0,startingIndices[start]).trim().replace('/','')
        genras[str.slice(0,startingIndices[start]).trim().replace('/','')]=1
       // value+=1
       // genres.push({'genre':temp,'value':1})
        
    }

    if (number==1)
    {
        
        if((str.slice(startingIndices[start]+1).trim())in genras)
    {
        //genres.push(str.slice(startingIndices[start]+1))
        
      
        genras[str.slice(startingIndices[start]+1).trim().replace('/','')]+=1
        
    }
    else
    {
        genras[str.slice(startingIndices[start]+1).trim().replace('/','')]=1
        
}
    }
    else if (number>1)
    while(number>0){
        number-=1
        if(str.slice(startingIndices[start]+1,startingIndices[end]).trim() in genras)
        {
        //genres.push(str.slice(startingIndices[start]+1,startingIndices[end]))
        genras[str.slice(startingIndices[start]+1,startingIndices[end]).trim().replace('/','')]+=1
        }
        else
        genras[str.slice(startingIndices[start]+1,startingIndices[end]).trim().replace('/','')]=1

        start+=1;
        end+=1;
        
    }
  //  console.log(genras )
    
    
});


var showNumber=5
    const topN = Object
      .entries(genras) // create Array of Arrays with [key, value]
      .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
      .slice(0,showNumber) // return only the first 3 elements of the intermediate result
     // .map(([n])=> n); // and map that to an array with only the name
    
      console.log(topN)
      var selected_genras=[]
      topN.forEach((element,index)=> {selected_genras.push( element[0])})
      console.log(selected_genras)
    const total=Object
    .values(genras)
    .reduce((a,b)=> a+b,0)
    
    console.log(total)
    
    
    
    // ****************** Plotting Part ************************
    
    
    const width = 1000,
    height = 800*(topN.length/10),
    margin = 40+showNumber*6;

    
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin;
    
    // append the svg object to the div called 'my_dataviz'
    const svg = d3.select("#pieChart")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", `translate(${width/3}, ${height/2})`);
    
    // create 2 data_set
    //const data1 = {a: 9, b: 20, c:30, d:8, e:12}
    const data1=topN
        
    const data2 = {a: 6, b: 16, c:20, d:14, e:19, f:12}
    
    // set the color scale
    const color = d3.scaleOrdinal()
      .domain(selected_genras)
      .range(['#EF1B0A','#F69D96','#D39550','#834806','cyan','#E7E710','#747459','#AEEB83','#0C64D6','#634DBB','#8C4DBB','#180923','#DB06F9','#F906A1','orange','gray']);
    
    // A function that create / update the plot for a given variable:
    function update(data) {
    
      // Compute the position of each group on the pie:
      const pie = d3.pie()
        .value(function(d) {return d[1][1]; })
        .sort(function(a, b) { return d3.ascending(a.value, b.value);} ) // This make sure that group order remains the same in the pie chart
        
      const data_ready = pie(Object.entries(data))
    
      // map to data
      const u = svg.selectAll("path")
        .data(data_ready)
    
        const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data[1][0])) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
    
    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('text')
      .text(function(d){ return  ((d.data[1][1]/total)*100).toFixed(2) + '%'})
      .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`})
      .style("text-anchor", "middle")
      .style("font-size", 17)
        
    // adding legend
    
    svg.selectAll('rect')
    .data(data_ready)
    .enter()
    .append('rect')
    .style('width',30)
    .style('height',30)
    .attr('fill', function(d){ return(color(d.data[1][0])) })
    .attr('x',topN.length+350)
    .attr('y',d=>d.data[0]*50-100-topN.length*15)
    
    //adding text next to the legends
    
    svg.selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(d=>d.data[1][0])
    .style('width',30)
    .style('height',30)
    .attr('fill', function(d){ return(color(d.data[1][0])) })
    .attr('x',topN.length+400)
    .attr('y',d=>d.data[0]*50-100-topN.length*15)
    
    }
    
    // Initialize the plot with the first dataset
    update(data1)



///// ******** On Change ///////////////////

document.getElementById("singers").onchange =  async function() {onchange_action(this.value)};

 async function onchange_action(e)
{
    document.getElementById("pieChart").innerHTML=""
    var showNumber=e
    const topN = Object
      .entries(genras) // create Array of Arrays with [key, value]
      .sort(([, a],[, b]) => b-a) // sort by value, descending (b-a)
      .slice(0,showNumber) // return only the first 3 elements of the intermediate result
     // .map(([n])=> n); // and map that to an array with only the name
    
      console.log(topN)
      var selected_genras=[]
      topN.forEach((element,index)=> {selected_genras.push( element[0])})
      console.log(selected_genras)
    const total=Object
    .values(genras)
    .reduce((a,b)=> a+b,0)
    
    console.log(total)
    
    
    
    // ****************** Plotting Part ************************
    
    
    const width = 1000,
        height = 800*(topN.length/10),
        margin = 40+showNumber*6;
    
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin;
    
    // append the svg object to the div called 'my_dataviz'
    const svg = d3.select("#pieChart")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", `translate(${width/3}, ${height/2})`);
    
    // create 2 data_set
    //const data1 = {a: 9, b: 20, c:30, d:8, e:12}
    const data1=topN
        
    const data2 = {a: 6, b: 16, c:20, d:14, e:19, f:12}
    
    // set the color scale
    const color = d3.scaleOrdinal()
      .domain(selected_genras)
      .range(['#EF1B0A','#F69D96','#D39550','#834806','cyan','#E7E710','#747459','#AEEB83','#0C64D6','#634DBB','#8C4DBB','#180923','#DB06F9','#F906A1','orange','gray']);
    
    // A function that create / update the plot for a given variable:
    function update(data) {
    
      // Compute the position of each group on the pie:
      const pie = d3.pie()
        .value(function(d) {return d[1][1]; })
        .sort(function(a, b) { return d3.ascending(a.value, b.value);} ) // This make sure that group order remains the same in the pie chart
        
      const data_ready = pie(Object.entries(data))
    
      // map to data
      const u = svg.selectAll("path")
        .data(data_ready)
    
        const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data[1][0])) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
    
    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('text')
      .text(function(d){ return  ((d.data[1][1]/total)*100).toFixed(2) + '%'})
      .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`})
      .style("text-anchor", "middle")
      .style("font-size", 17)
        
    // adding legend
    
    svg.selectAll('rect')
    .data(data_ready)
    .enter()
    .append('rect')
    .style('width',30)
    .style('height',30)
    .attr('fill', function(d){ return(color(d.data[1][0])) })
    .attr('x',topN.length+300)
    .attr('y',d=>d.data[0]*50-100-topN.length*15)
    
    //adding text next to the legends
    
    svg.selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(d=>d.data[1][0])
    .style('width',30)
    .style('height',30)
    .attr('fill', function(d){ return(color(d.data[1][0])) })
    .attr('x',topN.length+350)
    .attr('y',d=>d.data[0]*50-100-topN.length*15)
    
    }
    
    // Initialize the plot with the first dataset
    update(data1)

}
