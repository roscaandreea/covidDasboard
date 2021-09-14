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
      width: '100%',  
    },  
    container: {  
      maxHeight: 440,  
    },  
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
        <TableContainer className={classes.container}>  
          <Table stickyHeader aria-label="sticky table">  
          <TableHead>  
              <TableRow>  
                <TableCell>Name</TableCell>  
                <TableCell align="right">Confirmed</TableCell>  
                <TableCell align="right">Per.Million</TableCell>  
                <TableCell align="right">Critical</TableCell>  
                <TableCell align="right">Per.Million</TableCell>  
                <TableCell align="right">Deceased</TableCell>  
                <TableCell align="right">Per.Million</TableCell>  
                <TableCell align="right">Tests</TableCell> 
                <TableCell align="right">Per.Million</TableCell> 
                <TableCell align="right">Recovered</TableCell> 
                <TableCell align="right">Per.Million</TableCell> 
              </TableRow>  
            </TableHead>  
            <TableBody>  
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {  
                return (  
             <TableRow >  
                  <TableCell component="th" scope="row">  
                    {row.country}  
                  </TableCell>  
                  <TableCell align="right">{row.active}</TableCell>  
                  <TableCell align="right">{row.activePerMillion}</TableCell>  
                  <TableCell align="right">{row.critical}</TableCell>  
                  <TableCell align="right">{row.criticalPerMillion}</TableCell>  
                  <TableCell align="right">{row.deaths}</TableCell>  
                  <TableCell align="right">{row.deathsPerMillion}</TableCell>  
                  <TableCell align="right">{row.tests}</TableCell>
                  <TableCell align="right">{row.testsPerMillion}</TableCell> 
                  <TableCell align="right">{row.recovered}</TableCell> 
                  <TableCell align="right">{row.recoveredPerMillion}</TableCell>   
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


