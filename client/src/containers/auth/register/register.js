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
    name:this.state.firstName+" "+this.state.lastName
  }
  this.props.registerUser(userDetails,this.props.history);
}

  render(){
    return(
      <div className={classes.Register}>
      <div className={classes.RegisterBox}>
      <div className={classes.RegisterTitle}>Create an account</div>
      <div className={classes.FormBox}>
      <form onSubmit={this.submitHandler}>
      <input type="text" className={classes.TextInput} name="firstName" onChange={this.inputChangeHandler}
      placeholder='first name' value={this.state.firstName} /><br/>
      <input type="text" className={classes.TextInput} name="lastName" onChange={this.inputChangeHandler}
      placeholder='last name' value={this.state.lastName} /><br/>
      <input type="text" className={classes.TextInput} name="email" onChange={this.inputChangeHandler}
      placeholder='email' value={this.state.email} /><br/>
      <input type="password" className={classes.TextInput}name="password" onChange={this.inputChangeHandler}
      placeholder='password' value={this.state.password} /><br/>
      <br/>
      <button type="submit">Register</button>
      </form>
      <div className={classes.NavigateAuth}>Already registerd?<Link to="/auth/login"> Login here</Link></div>
      </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps=state=>({
  auth:state.auth
})

export default connect(mapStateToProps,{registerUser})(Register);
