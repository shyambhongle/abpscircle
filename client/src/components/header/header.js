import React from 'react';
import classes from './header.css';
import {connect} from 'react-redux';
import {logoutUser} from './../../actions/authAction';
import {Link,withRouter} from 'react-router-dom';

const Header=(props)=>{
console.log(  props.match.path==="/profile");
  return (
    <div className={classes.Header}>
    <div className={classes.HeaderWrapper}>
    <div className={classes.CompanyName}>ABPS Circle</div>
    <button className={classes.Logout} onClick={()=>{props.logoutUser(props.history)}}>Logout</button>
    <Link to={props.match.path==="/profile"?"/":"/profile"}><button className={classes.ProfileButton}>{
      props.match.path==="/profile"?"Home":"Profile"
    }</button></Link>

    </div>
    </div>
  );
}

export default connect(null,{logoutUser})(withRouter(Header));
