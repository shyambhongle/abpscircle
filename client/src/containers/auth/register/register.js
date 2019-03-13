import React,{Component} from 'react';
import classes from './register.css';
import {registerUser} from './../../../actions/authAction';
import {connect} from 'react-redux';
import {Link} from  'react-router-dom';


class Register extends Component{

state={
  firstName:"",
  lastName:"",
  email:'',
  password:''
}


componentDidMount(){
  if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
  }
}



inputChangeHandler=(e)=>{
this.setState({
  [e.target.name]:e.target.value
})
}

submitHandler=(e)=>{
  e.preventDefault();
  let userDetails={
    email:this.state.email,
    password:this.state.password,
    firstName:this.state.firstName,
    lastName:this.state.lastName
  }
  this.props.registerUser(userDetails,this.props.history);
}

  render(){
    return(
      <div className={classes.AuthBox}>
      <div className={classes.RegsiterationSection}>
      <div className={classes.CompanyLogo}>
      <div className={classes.Logo}></div>
      </div>
      <div className={classes.AppDetails}>
      Sign up to connect with your friends.
      </div>

      <form onSubmit={this.submitHandler} className={classes.RegisterationBox}>

      <div className={classes.RegisterationInput}>
      <input type="text" className={classes.TextInput} name="firstName" onChange={this.inputChangeHandler}
      placeholder='first name' value={this.state.firstName} />
      </div>

      <div className={classes.RegisterationInput}>
      <input type="text" className={classes.TextInput} name="lastName" onChange={this.inputChangeHandler}
      placeholder='last name' value={this.state.lastName} />
      </div>

      <div className={classes.RegisterationInput}>
      <input type="text" className={classes.TextInput} name="email" onChange={this.inputChangeHandler}
      placeholder='email' value={this.state.email} />
      </div>


      <div className={classes.RegisterationInput}>
      <input type="password" className={classes.TextInput}name="password" onChange={this.inputChangeHandler}
      placeholder='password' value={this.state.password} />
      </div>

      <div className={classes.SignUp}>
      <button type="submit">Sign up</button>
      </div>

      </form>

      <div className={classes.Agrrement}>
      By signing up, you agree to our Terms , Data Policy and Cookies Policy.
      </div>
      </div>

      <div className={classes.LoginLinkBox}>
        Have an account?<span><Link to="/auth/login">Log in
        </Link></span>
      </div>

      </div>

    );
  }
}

const mapStateToProps=state=>({
  auth:state.auth
})

export default connect(mapStateToProps,{registerUser})(Register);
