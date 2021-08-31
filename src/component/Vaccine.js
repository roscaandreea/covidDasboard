import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import VaccineMap from './VaccineMap';
import Legend from './Legend';
import LoadCountries from '../helper/LoadCountries';
import legendItems from '../entities/LegendItems';
import './Vaccine.css';


const Vaccine = () =>{
    const [countries,setCountries] = useState([]);
    const legendItemsInReverse= [...legendItems].reverse();
    const load = () =>{
        const loadCountries = new LoadCountries();
        loadCountries.load(setCountries);
    }
    useEffect(load,[]);
    console.log(countries);
    return (
        <div>
            <h1 className="vaccineTitle">Current Vaccination Status</h1>
            {
                countries.length === 0 ? 
                    <Loading /> : 
                    <div>
                        <VaccineMap countries={countries} />
                        <Legend legendItems={legendItemsInReverse} />
                    </div>
            }
            
        </div>
    );
}

export default Vaccine;
