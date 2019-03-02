import React,{Component} from 'react';
import Login from './login/login';
import Register from './register/register';
import {Route} from 'react-router-dom';
import classes from './auth.css';
import {connect} from 'react-redux';

class Auth extends Component{

componentDidMount(){
  if (this.props.match.isExact) {
    this.props.history.push('/auth/login');
  }

  if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
  }

}



  render(){
    return (
      <div>
      <div className={classes.Header}>
      <div className={classes.HeaderWrapper}>
      <div className={classes.CompanyName}>
      <div className={classes.CompanyTitle}>ABPS Circle</div>
      </div>
      </div>
      </div>
      <Route path="/auth/login"  component={Login}/>
      <Route path="/auth/register"  component={Register}/>
      <div className={classes.Footer}>

      </div>
      </div>
    )
  }
}

const mapStateToProps=state=>({
  auth:state.auth
})

export default connect(mapStateToProps)(Auth);
