import React from 'react';
import classes from './loading.css';



const Loading=()=>{
  return (
    <div className={classes.spinner}>
    <div className={classes.bounce1}></div>
    <div className={classes.bounce2}></div>
    <div className={classes.bounce3}></div>
    </div>
);
}

export default Loading;
