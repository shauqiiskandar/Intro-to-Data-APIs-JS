//1)the function needs to be async because getting the data is async and we need to wait for the data to be loaded
async function getData() {
  //2) get the promise to get file/url asyncly using await
  const resp = await fetch('divorce/female-age-specific-divorce-rate.csv');
  const output = await resp.text();
  //3) wait for the output of the promise and parse it into js as the source is text

  //* to split the data by row we use a new line as the split requirement
  const rows = output.split('\n');

  //* specify the range we want from the array elements
  // const condense = rows.slice(1, 3);
  const condense = rows.slice(1);
  //*v2 were we combine the code
  // const condense = output.split('\n').slice(1, 3);

  //*use forEach to apply something/function to every element of the array
  // condense.forEach(ele =>{
  //   //* split the things in each arr element by the comma into a new array
  //   const row = ele.split(',');
  //   // console.log(row);
  //   const year = row[0];
  //   const range = row[2];
  //   const rate = row[3];
  //   console.log(year, range, rate);
  // })

  const xaxis = [];
  const yaxis = [];
  //! we put these variables into the function instead of the global scope, to localise them.

  //*to pick out every 7th year. (show only 1 range)
  for (let i = 1; i < condense.length; i = i + 7) {

    const row = condense[i].split(',');
    const year = row[0];
    xaxis.push(year);
    const range = row[2];
    const rate = row[3];
    yaxis.push(rate);
    console.log(year, range, rate);

  }
  return {xaxis, yaxis}
  //*to make the output of the  function the values for the xaxis and the y axis
}

// getData();


async function charting() {
  const data = await getData();
  const dchart = document.getElementById('myChart');
  const config = {
    type: 'line',
    data: {
      labels: data.xaxis, //* labels takes in an array
      datasets: [{
        label: 'divorce rate per year',
        data: data.yaxis,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        // yAxisID: 'y',
        fill: true
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          }
        }
    }
  }
  const nChart = new Chart(dchart, config);
}
charting();


