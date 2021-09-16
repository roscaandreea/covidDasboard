import React from 'react';  
import { makeStyles } from '@material-ui/core/styles';  
import Paper from '@material-ui/core/Paper';  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TablePagination from '@material-ui/core/TablePagination';  
import TableRow from '@material-ui/core/TableRow';    
import { useState, useEffect } from 'react';
import {sortData} from '../../util';

const useStyles = makeStyles({  
    root: {  
      width: '91%',
      marginLeft: '60px',
      fontWeight: 'bold',
    },  
    container: {  
      maxHeight: 440,
      background: '#626b8b',
    },
    tablehead: {
      background: '#445175',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '1rem',
    },
    tableCellCountry: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '1rem'
    },
    tableCellActive: {
      color: 'rgb(160, 255, 210)',
      fontWeight: 'bold',
      fontSize: '1rem'
    },
    tableCellCritical: {
      color: '#ffc137',
      fontWeight: 'bold',
      fontSize: '1rem'
    },
    tableCellDeaths: {
      color: 'rgb(156, 41, 41)',
      fontWeight: 'bold',
      fontSize: '1rem'
    },
    tableCellVaccine: {
      color: 'rgb(62, 206, 229)',
      fontWeight: 'bold',
      fontSize: '1rem'
    },
    tableCellRecovered: {
      color: '#03cc96',
      fontWeight: 'bold',
      fontSize: '1rem'
    }
  });

const CustomTable = () => {
    const classes = useStyles();  
    const [page, setPage] = React.useState(0);  
    const [data, setData] = useState([]);   
    const [rowsPerPage, setRowsPerPage] = React.useState(5); 
    
    useEffect(() => {    
        const GetData = async () => {    
          const result = await fetch('https://disease.sh/v3/covid-19/countries')
                        .then((response) => response.json())
                        .then((data) =>{
                            const sortedData = sortData(data);
                            setData(sortedData);
                        });    
        }  
        GetData();    
        console.log(data);  
    }, []);
    const handleChangePage = (event, newPage) => {  
        setPage(newPage);  
      };  
      
      const handleChangeRowsPerPage = event => {  
        setRowsPerPage(+event.target.value);  
        setPage(0);  
      };
      return(
        <Paper className={classes.root}> 
        <h1 className="vaccineTitle">World COVID-19 Stats</h1>
        <TableContainer className={classes.container}>  
          <Table stickyHeader aria-label="sticky table">
          <TableHead>  
              <TableRow>  
                <TableCell className={classes.tablehead}>Name</TableCell>  
                <TableCell className={classes.tablehead} align="center">Confirmed</TableCell>  
                <TableCell className={classes.tablehead} align="center">Per.Million</TableCell>  
                <TableCell className={classes.tablehead} align="center">Critical</TableCell>  
                <TableCell className={classes.tablehead} align="center">Per.Million</TableCell>  
                <TableCell className={classes.tablehead} align="center">Deceased</TableCell>  
                <TableCell className={classes.tablehead} align="center">Per.Million</TableCell>  
                <TableCell className={classes.tablehead} align="center">Tests</TableCell> 
                <TableCell className={classes.tablehead} align="center">Per.Million</TableCell> 
                <TableCell className={classes.tablehead} align="center">Recovered</TableCell> 
                <TableCell className={classes.tablehead} align="center">Per.Million</TableCell> 
              </TableRow>  
            </TableHead>  
            <TableBody>  
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
                return (  
             <TableRow >  
                  <TableCell className={classes.tableCellCountry} component="th" scope="row">  
                    {row.country}  
                  </TableCell>  
                  <TableCell className={classes.tableCellActive} align="center">{row.active}</TableCell>  
                  <TableCell className={classes.tableCellActive} align="center">{row.activePerOneMillion}</TableCell>  
                  <TableCell className={classes.tableCellCritical} align="center">{row.critical}</TableCell>  
                  <TableCell className={classes.tableCellCritical} align="center">{row.criticalPerOneMillion}</TableCell>  
                  <TableCell className={classes.tableCellDeaths} align="center">{row.deaths}</TableCell>  
                  <TableCell className={classes.tableCellDeaths} align="center">{row.deathsPerOneMillion}</TableCell>  
                  <TableCell className={classes.tableCellVaccine} align="center">{row.tests}</TableCell>
                  <TableCell className={classes.tableCellVaccine} align="center">{row.testsPerOneMillion}</TableCell> 
                  <TableCell className={classes.tableCellRecovered} align="center">{row.recovered}</TableCell> 
                  <TableCell className={classes.tableCellRecovered} align="center">{row.recoveredPerOneMillion}</TableCell>   
                </TableRow>     
                );  
              })}  
            </TableBody>  
          </Table>  
        </TableContainer>  
        <TablePagination  
          rowsPerPageOptions={[5, 10, 15]}  
          component="div"  
          count={data.length}  
          rowsPerPage={rowsPerPage}  
          page={page}  
          onChangePage={handleChangePage}  
          onChangeRowsPerPage={handleChangeRowsPerPage}  
        />  
      </Paper> 
      );  
}
export default CustomTable;


