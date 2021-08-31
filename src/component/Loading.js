import React from 'react';
import { CircularProgress } from '@material-ui/core';
import "./Loading.css";


const Loading = () =>{
    return(
        <div className="loading_bar">
            <CircularProgress color="primary" />
            <CircularProgress color="secondary" />
            <CircularProgress color="primary"/>
        </div>
    );
}
 export default Loading;