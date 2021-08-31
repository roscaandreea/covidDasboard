import React from 'react';
import {Map,GeoJSON} from 'react-leaflet';
import './VaccineMap.css';
import "leaflet/dist/leaflet.css";

const VaccineMap = ({ countries }) =>{
    const mapStyle = {
        fillColor: "white",
        weight: 0.3,
        color: "black",
        fillOpacity: 1,
      };
      const onEachCountry = (country, layer) => {
        layer.options.fillColor = country.properties.color;
        const name = country.properties.ADMIN;
        const vaccineText = country.properties.vaccineText;
        layer.bindPopup(`${name} : <strong>${vaccineText}</strong> doses administrated`);
      };
    return(
        <Map style={{ display: "flex",height: "100vh", width:"176vh"}} zoom={2} center={[40,10]}>
            <GeoJSON data={countries} style={mapStyle} onEachFeature={onEachCountry}/>
        </Map>
    );
}

export default VaccineMap;
