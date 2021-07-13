function init() {
    //chart//select
    var selector =d3.select("#selDataset");
    
        d3.json("StarterCode/samples.json").then((data) => {
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
    buildCharts(newSample);
    // buildMetadata
    
}
init()

function buildCharts(sample) {
    console.log(sample)
    d3.json("StarterCode/samples.json").then((data) => {
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
    var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
        };
        // Use Plotly to plot the data with the layout.
        Plotly.newPlot("bar", barData, barLayout);
    
        //console.log(result)
    
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
           ]
    
       var bubbleLayout= {
        title: "Bacteria Cultures Per Sample",
        margin: {t:0},
        hovermode: "closest",
        xaxis: {title: "OTU ID"},
        margin: {t:30}
    };
       Plotly.newPlot("bubble",bubbleData,bubbleLayout);
    })
    }

function buildMetadata(sample){
  //console.log(sample)

  d3.json("StarterCode/samples.json").then((data) => {
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

