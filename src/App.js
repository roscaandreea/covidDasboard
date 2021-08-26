
import { FormControl, Select, MenuItem } from '@material-ui/core';
import './App.css';
import covidImage from './images/image.png';

function App() {
  return (
    <div className="app">
      <img className="image" src={covidImage} alt="covid-19" />
      <h1 className="text">current status</h1>
      <FormControl className="app__dropdown">
          <Select
            variant="outlined"
            value="abc" 
          >
            <MenuItem value="worldwide">WorldWide</MenuItem>
            <MenuItem value="worldwide">Option 2</MenuItem>
            <MenuItem value="worldwide">Option 3</MenuItem>
            <MenuItem value="worldwide">YOOOOO</MenuItem>
          </Select>
      </FormControl>
      {/* Header*/}
      {/* Title + select input dropdown field */}


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
