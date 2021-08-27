
import { FormControl, Select, MenuItem, Card, CardContent, Grid,Typography} from '@material-ui/core';
import './App.css';
import Cards from './Cards';
import Table from './Table';
import Map from './Map';
import LineGraph from './LineGraph';
import covidImage from './images/image.png';
import React, {useEffect, useState} from 'react';
import {sortData} from './util';
import "leaflet/dist/leaflet.css";

function App() {
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState(['global']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  
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
         const sortedData = sortData(data);
         setTableData(sortedData);
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
          <h1 className="text">current status</h1>
              {/* InfoBoxs */}
          <div className="app__stats">
              <Cards title="Coronavirus cases:" cases={countryInfo.todayCases} total={countryInfo.cases} />
              <Cards title="Recovered:" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
              <Cards title="Deaths:" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
          </div>
            {/* Map */}
          <Map center={mapCenter} zoom={mapZoom} />
        <CardContent>
            <Typography className="textDate" varian="body2">Last Updated at:</Typography>
            <Typography className="dateTime" color="textSecondary">{new Date().toLocaleString()}</Typography>                       
        </CardContent>

      </div>
      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Active cases by country</h3>
          <Table countries={tableData} />
          {/* Graph */}
          <h3 className="app__right_title">Global new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
