
import { FormControl, Select, MenuItem } from '@material-ui/core';
import './App.css';
import covidImage from './images/image.png';

function App() {
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
            {/* Loop through all the countries and show a
            dropdown list of the options */}
            { /*
            <MenuItem value="worldwide">WorldWide</MenuItem>
            <MenuItem value="worldwide">Option 2</MenuItem>
            <MenuItem value="worldwide">Option 3</MenuItem>
            <MenuItem value="worldwide">YOOOOO</MenuItem> */}
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
