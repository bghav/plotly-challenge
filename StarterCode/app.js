function buildMetadata(sample){
  console.log(sample)

  d3.json("samples.json").then((data) => {
      var samples = data.metadata;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample)
      var result = resultArray[0]

      var PANEL = d3.select("#sample-metadata")
      PANEL.html("");

      Object.entries(result).forEach(([key, values]) => {
          PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
  });

})
}
function buildCharts(sample) {
console.log(sample)
d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample)
    var result = resultArray[0]

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse()
    var barData = [
    {
        y:yticks,
        x:sample_values.slice(0,10).reverse(),
        text:otu_labels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h"
    }
]
    console.log(result)


Plotly.newPlot ("bar",barData);
   var bubbleLayout= {
    title: "Bacteria Cultures Per Sample",
    margin: {t:0},
    hovermode: "closest",
    xaxis: {title: "OTU ID"},
    margin: {t:30}
};
   var bubbleData =[
    {
        x:otu_ids,
        y:sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale:"Earth"
        }
    }
   ];
   Plotly.newPlot("bubble",bubbleData,bubbleLayout);
})
}
function init() {
    //chart
    //select
    var selector =d3.select("#selDataset");
    
    d3.json("samples.json").then((data) => {
      console.log(data)

      var sample_Names = data.names;
      sample_Names.forEach((sample) => {
        selector
            .append("option")
            .text(sample)
            .property("value",sample);


      })

      var firstSample = sample_Names[0]

      buildCharts(firstSample);
    })
}

function optionChanged(newSample) {
    // buildCharts(neeSample);
    // buildMetadata
    
}
init();