import React from 'react';
import Chart from 'chart.js';

let backGroundColors = [ 
  'rgba(255, 99, 132, 0.7)',
  'rgba(54, 162, 235, 0.7)',
  'rgba(255, 206, 86, 0.7)',
  'rgba(75, 192, 192, 0.7)',
  'rgba(153, 102, 255, 0.7)',
  'rgba(255, 159, 64, 0.7)',
  'rgba(255, 192, 86, 0.7)',
]

class Graph extends React.Component {
  componentDidMount() {
    const node = this.node;
    const data = this.props;
    let dataset = data.data.map(({country, gdp, population}, index) => {
      return {
        label: country,
        data: [{x: population, y: gdp, r: 20}],
        backgroundColor: [backGroundColors[index]]
      }
    })
    var myChart = new Chart(node, {
      type: "bubble",
      data: {
        datasets: dataset
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              fontSize: 20,
              labelString: 'Population in Millions'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              fontSize: 20,
              labelString: 'GDP(US $) in Billons'
            }
          }]
        },
        legend: {
          position: 'bottom'
        }
      }
    });
  }

  render() {
    return (
      <div>
        <canvas
          style={{ width: 800, height: 300, marginTop: '50px', paddingTop: '20px' }}
          ref={node => (this.node = node)}
        />
      </div>
    );
  } 
}

export default Graph;