//jshint esversion: 8
// Data from:https://data.giss.nasa.gov/
const xlabels = [];
const ylabels = [];
const zlabels = [];
const pHlabels = [];
const xlabel =[];
const ylabel = [];
chartIt();

async function chartIt() {
  await getData();
  const ctx = document.getElementById('chart').getContext("2d");


  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: xlabels,
      datasets: [{
        label: 'Water Temperature',
        data: zlabels,
        fil: false,
        backgroundColor: "",

        borderColor: 'lightblue',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  const ct1 = document.getElementById('chart1').getContext("2d");
  const chat1 = new Chart(ct1, {
    type: 'line',
    data: {
      labels: xlabels,
      datasets: [{
        label: 'Temperature(Degree Fahrenheit)',
        data: ylabels,
        fil: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',

        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  const ct2 = document.getElementById('chart2').getContext("2d");
  const chat2 = new Chart(ct2, {
    type: 'polarArea',
    data: {
      labels: xlabel,
      datasets: [{
        label: 'Global Average Temperature',
        data: ylabel,
        fil: false,
        backgroundColor: [
                 'rgba(255, 99, 132, 0.2)',
                 'rgba(54, 162, 235, 0.2)',
                 'rgba(255, 206, 86, 0.2)',
                 'rgba(75, 192, 192, 0.2)',
                 'rgba(153, 102, 255, 0.2)',
                 'rgba(255, 159, 64, 0.2)'
             ],

        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


async function getData() {
  let response = await fetch("dataset.csv");
  let data = await response.text();

  let res = await fetch("dataset.csv");
  let data2 = await res.text();

  const table1 = data2.split("\n").slice(1);
  table1.forEach(row1 =>{
    const column1 = row1.split(",");
    const dateTime =column1[0];
    xlabel.push(dateTime);
    const hum =column1[3];
    ylabel.push(Math.abs(parseFloat(hum)) * 9);
    console.log(dateTime, hum);
  });

  const table = data.split("\n").slice(1);
  table.forEach(row => {
    const column = row.split(",");
    const year = column[0];
    xlabels.push(year);
    const temp = column[3];
    ylabels.push(temp);
    const specCond = column[4];
    zlabels.push(specCond);
    const pH = column[8];
    pHlabels.push(pH);
    console.log(year, temp, specCond, pH);
  });

}

var scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: '#navbar-example'
});
