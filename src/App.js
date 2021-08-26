
import { FormControl, Select, MenuItem, Card, CardContent,Table } from '@material-ui/core';
import './App.css';
import Cards from './Cards';
import Map from './Map';
import covidImage from './images/image.png';
import React, {useEffect, useState} from 'react';

function App() {
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState(['global']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  
  useEffect(() =>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    });
  },[]);
  useEffect(() =>{
    //code inside here will run once when the component is loads and not again
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2,
         }));
         setTableData(data);
        setCountries(countries);
      });
    };
    getCountriesData();
  },[]);

  const onCountryChange = async (event) =>{
    const countryCode = event.target.value;
    const url = countryCode === 'global' ? 'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response => response.json())
    .then(data =>{
      setCountry(countryCode);
      setCountryInfo(data);
    });
  };
  console.log(countryInfo);
  return (
    <div className="app">
      <div className="app__left">
          {/* Header*/}
          {/* Title + select input dropdown field */}
          <div className="app__header">
             <img className="image" src={covidImage} alt="covid-19" />
             <FormControl className="app__dropdown">
                <Select variant="outlined" value={country} onChange={onCountryChange}>
                   <MenuItem value="global">Global</MenuItem>
                      {
                        countries.map(country =>(
                            <MenuItem value={country.value}>{country.name}</MenuItem>
                     ))}
                </Select>
            </FormControl>
          </div>
              {/* InfoBoxs */}
          <div className="app__stats">
              <Cards title="Coronavirus cases:" cases={countryInfo.todayCases} total={countryInfo.cases} />
              <Cards title="Recovered:" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
              <Cards title="Deaths:" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
          </div>
            {/* Map */}
          <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Live casses by country</h3>
          <Table countries={tableData} />
          {/* Graph */}
          <h3>Global new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
