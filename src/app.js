import React from 'react';
import axios from 'axios';

import Graph from './components/chart';

const countries = ['in', 'cn', 'de', 'hu', 'br', 'us', 'sa'];

const gdpApi = (country) => axios.create({
  baseURL: `http://api.worldbank.org/v2/country/${country}/indicator/NY.GDP.MKTP.CD?format=json&date=2017`
})

const populationApi = (country) => axios.create({
  baseURL: `http://api.worldbank.org/v2/country/${country}/indicator/SP.POP.TOTL?format=json&date=2017`
})

class App extends React.Component {
  state = {
    countriesData: []
  }
  componentDidMount(){
    let countriesData = countries.map(country => Promise.all([gdpApi(country).get(), populationApi(country).get()]));
    Promise.all(countriesData).then(values => {
      let stats = values.map(value => {
        let gdpData = value[0].data[1][0];
        let populationData = value[1].data[1][0];
        console.log(gdpData, populationData);
        let countryStat = {
          country: gdpData.country.value ,
          gdp: gdpData.value / 1000000000,
          population: populationData.value / 1000000
        }
        return countryStat;
      })
      this.setState(() => {
        return { countriesData: stats}
      })
    });
  }
  
  render(){
    const { countriesData } = this.state;
  
    return <div>{countriesData.length > 0 ? <Graph data={this.state.countriesData} /> : null}</div>
  }

}


export default App;