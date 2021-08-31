import {features} from '../data/countries.json';
import papaparse from 'papaparse';
import legendItems from '../entities/LegendItems';

class LoadCountries{
    covidUrl =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/vaccine.csv";
    setState= null;
    mapCountries= features;

    load =(setState) =>{
        this.setState= setState;

        papaparse.parse(this.covidUrl, {
            download: true,
            header: true,
            complete: (result) => this.#processCovidData(result.data)
        });
       
    }
    #processCovidData = (covidCountries) => {
        for (let i = 0; i < features.length; i++) {
          const country = features[i];
          //console.log(country);
          const covidCountry = covidCountries.find(
            (covidCountry) => country.properties.ISO_A3 === covidCountry.iso3
          );
    
          country.properties.vaccine = 0;
          country.properties.vaccineText = 0;

          if (covidCountry != null) {
            let vaccine = Number(covidCountry.Doses_Admin);
            country.properties.vaccine = vaccine;
            country.properties.vaccineText = this.#formatNumberWithCommas(vaccine);
              
          }
          this.#setCountryColor(country);
        }
    
        this.setState(features);
      };
      #setCountryColor = (country) => {
        const legendItem = legendItems.find((item) =>
          item.isFor(country.properties.vaccine)
        );
    
        if (legendItem != null) country.properties.color = legendItem.color;
      };

      #formatNumberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
    }

export default LoadCountries;