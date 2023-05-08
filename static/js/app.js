// Start the ppage with chart

function chart(sample) {
    d3.jason ('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json' ).then((data) =>{
        let samples = data.samples
        let resultarray = samples.filter(sampleObject) => sampleObject.id == sample);
        let result = resultArray[0];
    };

    console.log(resultArray);

    