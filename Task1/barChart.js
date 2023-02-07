import * as Chart from "../lib/charts.js";

// load the data here
const data = await d3.csv("../data/best_selling_artists_final.csv");
console.log(data)
data.forEach((value,key)=>{
console.log(value)
})
//const featuresList = data.features;
//console.log(featuresList)

// query from your data here
//var result = d3.group(data, d => d.Name);
var result=data.slice(0,50)
var finalData = [];
/*
result.forEach((value, key) => {
  finalData.push({key: key, value: d3.count(value, d => d.properties["Tree ID"])});
});
console.log(d3.sort(finalData, (a,b) => d3.descending(a.value, b.value)));
*/
result.forEach((value, key) => {
    finalData.push({
        artist: value['Artist'],
        sales: value['Sales'],
        //meanCanopy: d3.mean(value, d => d.properties["Canopy Cover (m2)"])
    });
});
finalData = d3.sort(finalData, (a, b) => d3.descending(a.sales, b.sales));
var showNumber=10
// call the needed chart here
const barChartSVG = await Chart.BarChart(finalData.slice(0,showNumber), {
    x: d => d.artist,
    y: d => d.sales,
    yLabel: "Sales",
    width: 1080,
    height: 800,
    color: "steelblue"
});

// add the chart to html page here
var plottedChart=document.getElementById("barchart").appendChild(barChartSVG);
document.getElementById("singers").onchange =  async function() {onchange_action(this.value)};
 async function onchange_action(e)
{
    showNumber=e
    document.getElementById("barchart").removeChild(plottedChart);
    //var e=document.getElementById("singers")[0];
    
    const barChartSVG =  await Chart.BarChart(finalData.slice(0,showNumber), {
        x: d => d.artist,
        y: d => d.sales,
        yLabel: "Sales",
        width: 1280,
        height: 800,
        color: "steelblue"
    });
    
  plottedChart=document.getElementById("barchart").appendChild(barChartSVG);
    
    //decisiontree.dieasenameencode=e;
};