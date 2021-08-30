import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import {Grid} from '@material-ui/core';

const constant = 3;

const casesTypeColors = {
    cases: {
      hex: "#636efa",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 800,
    },
    recovered: {
      hex: "#03cc96",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 2000,
    }
  };

export const sortData = (data) =>{
    const sortedData = [...data];
    return sortedData.sort((a,b) =>((a.active > b.active) ? -1 : 1 ))

}

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const prettyPrintStat2 = (stat) =>
stat ? `${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType = "cases") =>(
    data.map((country) => (
        <Circle
          center={[country.countryInfo.lat, country.countryInfo.long]}
          color={casesTypeColors[casesType].hex}
          fillColor={casesTypeColors[casesType].hex}
          fillOpacity={0.4}
          radius={
            (Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier)/constant
          }
        > 
        <Popup>
        <div className="info-container">
          <Grid container direction="row" alignItems="center">
             < Grid item xs={12} sm={10} className="info-name">
               {country.country}
             </Grid>
             < Grid item xs={12} sm={2}  className="info-flag"
                 style={{ backgroundImage: `url(${country.countryInfo.flag})`}}>&nbsp;
             </Grid>
          </Grid>     
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
)));

