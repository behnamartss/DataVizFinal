
var w = 1200
var h = 700
var numCols = 5;

var margin = {
  right: 40,
  left: 20,
  top: 70,
  bottom: 40
}

var div = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
var width = w - margin.right - margin.left;
var height = h - margin.top - margin.bottom;


var svg=d3.select("#waffleChart").append('svg')
.attr('width',w)
.attr('height',h)
.style('margin-top',50);
  






 //(async function() {
    
 const data = await d3.csv("../data/best_selling_artists_final.csv");
  data.forEach(element=>{
    element['Genre']=element['Genre'].replace('R&B','r_b')
  })
    var tree_percentage=[]
    var temp=[]
 
    
    ///////////////////// Getting top N Genres

    var genras={}
    
    var genres=[]
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
            {genras[str.slice(startingIndices[start]+1,startingIndices[end]).trim().replace('/','')]=1
          }
           
    
            start+=1;
            end+=1;
            
        }
        
       
    });
    





    data.forEach(element => {
     var temp_genras={}
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
      
      var value=0
      var start=0
      var end=1
      if((str.slice(0,startingIndices[start]).trim())in temp_genras)
      {
  
          //genres.push(str.slice(0,startingIndices[start]))
          
          var temp=str.slice(0,startingIndices[start]).trim().replace('/','')
          
          temp_genras[str.slice(0,startingIndices[start]).trim().replace('/','')]+=1
         // value+=1
         //genres.push({'genre':temp,'value':1})
      }
      else
      {
          var temp=str.slice(0,startingIndices[start]).trim().replace('/','')
          
          temp_genras[str.slice(0,startingIndices[start]).trim().replace('/','')]=1
         // value+=1
         // genres.push({'genre':temp,'value':1})
          
      }
  
      if (number==1)
      {
          
          if((str.slice(startingIndices[start]+1).trim())in temp_genras)
      {
          //genres.push(str.slice(startingIndices[start]+1))
          
        
          
          temp_genras[str.slice(startingIndices[start]+1).trim().replace('/','')]+=1
          
      }
      else
      {
          
          temp_genras[str.slice(startingIndices[start]+1).trim().replace('/','')]=1
          
  }
      }
      else if (number>1)
      while(number>0){
          number-=1
          if(str.slice(startingIndices[start]+1,startingIndices[end]).trim() in temp_genras)
          {
          //genres.push(str.slice(startingIndices[start]+1,startingIndices[end]))
          
          temp_genras[str.slice(startingIndices[start]+1,startingIndices[end]).trim().replace('/','')]+=1
          }
          else
          
          temp_genras[str.slice(startingIndices[start]+1,startingIndices[end]).trim().replace('/','')]=1
  
          start+=1;
          end+=1;
          
      }
     
      
      genres.push(Object.keys(temp_genras))
      
  });
  console.log(genres)

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
        
        


    ///////////////////
    //var Genres=d3.group(data,d=>selected_genras.Includes(d.Genre),d => d.Country) ;  // this worked too d.neighborhood
    var filtered_data=[]
    var indexes=[]
  
    genres.forEach((element,index)=>{
      selected_genras.forEach(element2=>{ 
      //if(element.Genre.toLowerCase().includes(element2) && !indexes.includes(index))
      if(element.includes(element2) )
      {//filtered_data.push(Object.entries(data[index]))
        filtered_data.push({ Genre: element2,Country:data[index].Country})
        indexes.push(index)
      }
      
        })
    })
    //console.log(indexes)

    console.log(filtered_data)
    var selected_countries=[]
    filtered_data.forEach(element=>{
      if(!selected_countries.includes(element.Country))
      selected_countries.push(element.Country)
    })
    console.log(selected_countries)
    //filtered_data.push(data.find(d => d.Genre.toLowerCase().includes(selected_genras)))
    // console.log(filtered_data)
    // var Genres=d3.group(data,function(d){
    //     if(selected_genras.includes(d.Genre))
    //      {console.log(d.Genre)
    //       return d.Genre,d.Country
    //     }

    // }) ; 
   
   // console.log(Genres)
    //neighborhoods.forEach((element,index)=>{console.log(element)}) ;
    //var result = d3.group(data, d => d.properties.neighborhood, d => d.properties.Name);
    var result = d3.group(filtered_data,d=>d.Genre, d => d.Country);
  //   var hello
    
  //   result.forEach((element, index) => {
  //     var temp=[]
  //       element.forEach((value, key) => {
  //        temp.push({Country:key,Count:value.length})
         
  //   });
  //   temp=temp.sort((a, b) => b.Count - a.Count);

  //   console.log(temp)
  // })
  
    console.log(result)
    
    
    //// kaj fahmi part //////
            // neighborhoods.forEach((element, index) => {
            //   element.forEach((value, key) => {
            //     value.forEach(value2=>{ temp.push([value2.neighborhood,value2.Name,d3.range(Math.round( value2.tree_percentage ))]) ;
            //     });
                
                
            //   });
            // });
            

  //// end of kaj fahmi part //////
  var country_percentage=[]
let topCountriesPercentage = 0;
result.forEach((element, index) => {
  var temp=[]
  topCountriesPercentage = 0;
  var total=1
  topN.forEach(element=>{ if(element[0]==index) total=element[1]})
  
    element.forEach((value, key) => {
      temp.push({Country:key,Count:value.length})
       temp=temp.sort((a, b) => b.Count - a.Count);})
       temp=temp.slice(0,4)
       console.log(temp)
       temp.forEach((value, key) => {
       // if (selected_genras.includes(key)) {
            country_percentage.push({
                genre: index,
                Country: value.Country,
                //percentage: Math.round(parseFloat(value[0]['tree_percentage']))
                percentage: Math.round((value.Count/total)*100)
            });
            topCountriesPercentage += Math.round((value.Count/total)*100)
      //  }
    });
    country_percentage.push({
      genre: index,
      Country: "otherCountries",
      percentage: 100 - topCountriesPercentage
    });
});
console.log(country_percentage)
//console.log(data[0]['neighborhood'])     kar ham kard okeye

   // var neighborhoods=d3.group(data,d=>d.neighborhood)   // this worked too d.neighborhood


   //////////////////////test part is heeeeeere//////////////////////

  //  tree_percentage.forEach((element,index)=>{
  //   element.forEach((value,key) => {
  //     value.forEach(( value2)=>{console.log( value2[2]);} )
      
      
  //     })
  //     console.log(value);
  // })
 //console.log(tree_percentage);
 //var test=d3.group(tree_percentage,d=>d.neighborhood);
 //console.log(test);


// console.log(tree_percentage);

//tree_percentage.forEach(element=>{return element;});
/////////////////// end of test part is hereeeee ///////////////////



// var charts=svg.select('rect')
// .data(neighborhoods)
// .enter()
// .append('rect')
// .attr('class','mainRect')
// .attr('width',100)
// .attr('height',100)
// .attr('x',0)
// .attr('y',0);
//const colors = ["#FF8E79", "#0000FF", "#000000", "#DB1D25","#FF0000"];

    //  var scaleColor = d3.scaleOrdinal()
    //   .domain(
    //     tree_percentage.forEach((element,index)=>{
    //       element.forEach((value,key) => {
    //         //value.forEach(( value2)=>{return value2;} )
    //         return value;
    //         })
    //        // console.log(value);
    //     })
    //   )
    //   .range(colors);

var chart=svg.selectAll('rect')  
    .data(selected_genras)
    .enter()
    .append('g')
    .attr('id',d=>d)
    .attr("transform", function (d, i) {
        if (d == "pop") {
            return "translate(100," + ((i * 20)) + ")"
        }
      if(d == "rock"){

        {return "translate(100," + ((i * 20)) + ")"
        }
      }
      if(d == "r_b"){
        console.log(i)
        return "translate(300," + ((i * 20)) + ")"

      }
      if(d == "hip-hop"){
        return "translate(400," + ((i * 20)) + ")"
      }
      if(d== "hard-rock"){
        return "translate(500," + ((i * 20)) + ")"
      }

       else {
        return "translate(10," + ((i * 150)) + ")"
      }
    })
     .attr('width',1200)
     .attr('height',900)
    .attr("width", 300)
    .attr("height", 300)
    .style("fill-opacity", .2) // set the fill opacity
    .style("stroke", "red")    // set the line colour
    .style("fill", "green")  // set the fill colour
    .attr("transform", function (d,i) {
      var translate= [140*i,0];
     return "translate(" + translate[0] + ", " + translate[1] + ")"
    })
    .append('text')
    .text(d=>d)
	//   .attr("x", function(d){
  //       return d3.select(this).node().getBoundingClientRect().x 
  //   })
	//   .attr("y", function(d){
  //     return d3.select(this).node().getBoundingClientRect().y 
  // })
  //   .attr("dx", 8*20)
	//   .attr("dy",-100)
    
    .attr("x", 40)
	  .attr("y", 500)
   // .attr('margin-left','500px')
    
    
   // .attr("transform", "rotate(90)" );

let finalData = [];
let tempData = [];

selected_genras.forEach(n => {
    country_percentage.filter(e => {return n === e.genre})
        .forEach(element => {
            for (let i=0; i < element.percentage; i++) tempData.push(element);
        });
    finalData.push(tempData);
    tempData = [];
});
console.log(finalData)
//const colors = d3.schemeSpectral[selected_trees.length+1];

const color = d3.scaleOrdinal()
.domain(selected_countries)
.range(['#EF1B0A','#F69D96','#D39550','#834806','cyan','#E7E710','#747459','#AEEB83','#0C64D6','#634DBB','#8C4DBB','#180923','#DB06F9','#F906A1','orange','gray']);



// ************ Tool Tip ************** //

const tooltip = d3.select("#waffleChart")
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

    var elements = document.getElementsByClassName((d.genre+d.Country).replace(' ',''));
    for (var i = 0; i < elements.length; i++) {
      elements[i].style="stroke:black; stroke-width:2";
    }
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html("Country: " + d.Country + "<br> Percentage:"+''+ d['percentage']+'%')
      // .style("left", document.getElementById('#bubbleChart').getBoundingClientRect().x  + "200px")
      // .style("top", document.getElementById('#bubbleChart').getBoundingClientRect().y + "200px")
      .style("left", event.clientX)
      .style("top", event.clientY)
      
      
      //console.log(event.clientX)
     
  }
  const moveTooltip = function(event, d) {
    
    tooltip
      // .style("left", (event.x)/2 + "px")
      // .style("top", (event.y)/2-50 + "px")
      // .style("left", document.getElementById('#bubbleChart').getBoundingClientRect().x  + "200px")
      // .style("top", document.getElementById('#bubbleChart').getBoundingClientRect().y+ "200px")
      .style("left",event.pageX+60+'px')
      .style("top", event.pageY+60+'px')
  }
  const hideTooltip = function(event, d) {
    var elements = document.getElementsByClassName((d.genre+d.Country).replace(' ',''));
    for (var i = 0; i < elements.length; i++) {
      elements[i].style=" stroke-width:0";
    }
    tooltip
      .transition()
      .duration(20)
      .style("opacity", 0)
      .style("left", event.pageX+60+'px')
      .style("top", event.pageY+60+'px')
  }


  // *********** end of Tool Tip *********** //

for (let i=0; i<selected_genras.length; i++) {
    chart.select("#" + selected_genras[i])
        // .data(tree_percentage,tree_percentage.map(function (d) { return d[2]; }))
        .data(
            finalData[i]
        )
        .enter()
        .append('rect')
        .attr('class',function (element,index) {
            return (element.genre+element.Country).replace(' ','');
        })
        .attr('id',function (element,index) {
            return element.Country;
            // element.forEach((value,key)=>{
            //    value.forEach(value2 => {
            //      return value2;
            //    });
            //   //console.log(value);
            //   //return value;
            // })

        })     
           
        .attr('fill', function(d){ return(color(d.Country)) })
        .attr("width", 10)
        .attr("height", 10)
        .attr("x", function(d, ind){
            var colIndex = ind % numCols
            return (colIndex * 24) + (i * 30 * numCols)
        })
        .attr("y", function(d, ind){
            var rowIndex = Math.floor(ind/numCols)
            return rowIndex * 24
        })
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
       .on("mouseleave", hideTooltip )       
}

  // ********** Legend **********//
svg.selectAll('circle')
.data(selected_countries)
.enter()
.append('circle')
.style('width',30)
.style('height',30)

.attr('fill', function(d){ return(color(d)) })
.attr('cy',function(d,i){
  return i*50
})
.attr('transform','translate(0,30)')
.attr('cx',800)
.attr('r',5)

//adding text next to the legends

svg.selectAll('mylabels')
.data(selected_countries)
.enter()
.append('text')
.text(d=>d)
.style('text-size',15)
.style('width',30)
.style('height',30)
.attr('fill', function(d){ return(color(d)) })
.attr('y',function(d,i){
  return i*50
})
.attr('x',840)
.attr('transform','translate(0,32)')

