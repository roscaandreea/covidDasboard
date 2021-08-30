
import { FormControl, Select, MenuItem, Card, CardContent,Typography} from '@material-ui/core';
import './App.css';
import Cards from './Cards';
import Table from './Table';
import Map from './Map';
import LineGraph from './LineGraph';
import VaccineMap from './component/VaccineMap';
import covidImage from './images/image.png';
import React, {useEffect, useState} from 'react';
import {sortData} from './util';
import "leaflet/dist/leaflet.css";
import {prettyPrintStat,prettyPrintStat2 } from './util';


function App() {
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState(['global']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [vaccine,setVaccine] = useState();
  
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
         setMapCountries(data);
         setCountries(countries);
      });
    };
    getCountriesData();
  },[]);

  useEffect(() =>{
  const getVaccineData = async() => {
    await fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1")
    .then((response) => response.json())
    .then((data) =>{
      const vaccines = data.map((vaccine) =>({
        country: vaccine.country,
        value: vaccine.timeline
      }));
      setVaccine(vaccines);
    });
  };
  getVaccineData();
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
      setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
      setMapZoom(4);
    });
  };
  console.log(countryInfo);
  console.log(vaccine);
  return (
    <div className="container">
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
              <Cards isBlue active={casesType === 'cases'} onClick={(e) => setCasesType("cases")} title="New cases:" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat2(countryInfo.cases)} />
              <Cards active={casesType === 'recovered'} onClick={(e) => setCasesType("recovered")} title="New recovered:" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat2(countryInfo.recovered)} />
              <Cards isRed active={casesType === 'deaths'} onClick={(e) => setCasesType("deaths")} title=" New deaths:" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat2(countryInfo.deaths)}/>     
          </div>
            {/* Map */}
          <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
          {/*
          <CardContent>
            <Typography className="textDate" varian="body2">Last Updated at:</Typography>
            <Typography className="dateTime" color="textSecondary">{new Date().toLocaleString()}</Typography>                       
          </CardContent> */}

      </div>
      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Active cases by country</h3>
          <Table countries={tableData} />
          {/* Graph */}
          <h3 className="app__right_title">Global new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
      <div className="app__bottom">
      </div>
    </div>
     <div className="app__bottom">
       <VaccineMap />
     </div>
  </div>
  );
}

export default App;
