
import { FormControl, Select, MenuItem } from '@material-ui/core';
import './App.css';
import covidImage from './images/image.png';
import React, {useEffect, useState} from 'react';

function App() {
  const [countries,setCountries] = useState([]);
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
  return (
    <div className="app">
      {/* Header*/}
      {/* Title + select input dropdown field */}
      <div className="app__header">
        <img className="image" src={covidImage} alt="covid-19" />
        <FormControl className="app__dropdown">
          <Select
            variant="outlined"
            value="abc" 
          >
            {
              countries.map(country =>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
       </FormControl>
     </div>
     <h1 className="text">current status</h1>
       {/* InfoBoxs */}
       {/* InfoBoxs */}
       {/* InfoBoxs */}
       
       {/* Table */}
       {/* Graph */}

       {/* Map */}

    </div>
  );
}

export default App;
