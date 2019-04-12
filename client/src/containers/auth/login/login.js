import React,{Component} from 'react';
import classes from './login.css';
import {connect} from 'react-redux';
import {loginUser,clearErrors} from './../../../actions/authAction';
import {Link} from  'react-router-dom';

class Login extends Component{

state={
  email:'',
  password:''
}


componentDidMount(){
  if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
  }
  this.props.clearErrors();
}



inputChangeHandler=(e)=>{
this.setState({
  [e.target.name]:e.target.value
})
}

submitHandler=(e)=>{
  e.preventDefault();
  let userCredit={
    email:this.state.email,
    password:this.state.password
  }
  this.props.loginUser(userCredit,this.props.history);
}

  render(){
    return(
      <div className={classes.AuthBox}>
      <div className={classes.LoginSection}>
      <div className={classes.CompanyLogo}>
      <div className={classes.Logo}></div>
      </div>
      <form onSubmit={this.submitHandler} className={classes.LoginBox}>
      {this.props.errors.email!==undefined?
      <span className={classes.errorMessage}>{this.props.errors.email}</span>:null}
      <div className={classes.LoginInput}>
      <input type="text" name="email" onChange={this.inputChangeHandler}
      placeholder='email' value={this.state.email}
      style={{border:this.props.errors.email!==undefined?"1px solid red":null}}/>
      </div>
      {this.props.errors.password!==undefined?
      <span className={classes.errorMessage}>{this.props.errors.password}</span>:null}
      <div className={classes.LoginInput}>
      <input type="password" name="password" onChange={this.inputChangeHandler}
      placeholder='password' value={this.state.password}
      style={{border:this.props.errors.password!==undefined?"1px solid red":null}} />
      </div>


      <div className={classes.Login}>
      <button type="submit">Login</button>
      </div>

      </form>

      <div className={classes.ForgotPassword}>
      Forgot password?
      </div>
      </div>

      <div className={classes.SignupBox}>
        Don't have an account?<span><Link to="/auth/register">Sign up
        </Link></span>
      </div>
      </div>
    );
  }
}

const mapStateToProps=state=>({
  auth:state.auth,
  errors:state.errors,
  load:state.loading
})

export default connect(mapStateToProps,{loginUser,clearErrors})(Login);
