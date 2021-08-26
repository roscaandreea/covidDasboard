
import { FormControl, Select, MenuItem } from '@material-ui/core';
import './App.css';
import Cards from './Cards';
import Map from './Map';
import covidImage from './images/image.png';
import React, {useEffect, useState} from 'react';

function App() {
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState(['global']);
  // https://disease.sh/v3/covid-19/countries
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
        setCountries(countries);
      });
    };
    getCountriesData();
  },[]);

  const onCountryChange = (event) =>{
    const countryCode = event.target.value;
    setCountry(countryCode);
  }
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
              <Cards title="Coronavirus cases:" cases={123} total={2000} />
              <Cards title="Recovered:" cases={1235} total={3000} />
              <Cards title="Deaths:" cases={1234} total={1000}/>
            </div>
            {/* Map */}
          <Map />
      </div>
      <div className="app__right">
        {/* Table */}
        {/* Graph */}
      </div>
    </div>
  );
}

export default App;
