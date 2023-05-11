const dataUrl = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Display demographic info
function displayDemographicInfo(id) {
  d3.json(dataUrl).then(function (data) {
    const sampleData = data;
    const metadata = sampleData.metadata;
    const filteredMetadata = metadata.filter(sample => sample.id.toString() === id)[0];
    const panel = d3.select('#sample-metadata');
    panel.html('');
    Object.entries(filteredMetadata).forEach(([key, value]) => {
      panel.append('h6').text(`${key}: ${value}`);
    });
  });
};

// Create bar plot
function createBarPlot(id) {
  d3.json(dataUrl).then(function (data) {
    const sampleData = data;
    const samples = sampleData.samples;
    const filteredSamples = samples.filter(sample => sample.id === id)[0];
    const OTUvalues = filteredSamples.sample_values.slice(0, 10).reverse();
    const OTUids = filteredSamples.otu_ids.slice(0, 10).reverse();
    const labels = filteredSamples.otu_labels.slice(0, 10).reverse();
    const barTrace = {
      x: OTUvalues,
      y: OTUids.map(object => 'OTU ' + object),
      name: labels,
      type: 'bar',
      orientation: 'h'
    };
    const barData = [barTrace];
    Plotly.newPlot('bar', barData);
  });
};

// Create bubble plot
function createBubblePlot(id) {
  d3.json(dataUrl).then(function (data) {
    const sampleData = data;
    const samples = sampleData.samples;
    const filteredSamples = samples.filter(sample => sample.id === id)[0];
    const bubbleTrace = {
      x: filteredSamples.otu_ids,
      y: filteredSamples.sample_values,
      mode: 'markers',
      marker: {
        size: filteredSamples.sample_values,
        color: filteredSamples.otu_ids,
        colorscale: 'Portland'
      },
      text: filteredSamples.otu_labels,
    };
    const bubbleData = [bubbleTrace];
    Plotly.newPlot('bubble', bubbleData);
  });
};

// Update plots and demographic info based on selected ID
function updatePlotsAndDemographicInfo(id) {
  createBarPlot(id);
  createBubblePlot(id);
  displayDemographicInfo(id);
};

// Initialize the webpage with default plots and demographic info
function initialize() {
  const dropDown = d3.select('#selDataset');
  d3.json(dataUrl).then(function (data) {
    const sampleData = data;
    const names = sampleData.names;
    Object.values(names).forEach(value => {
      dropDown.append('option').text(value);
    });
    updatePlotsAndDemographicInfo(names[0]);
  });
};


initialize();
