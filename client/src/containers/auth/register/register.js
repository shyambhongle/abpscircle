import React,{Component} from 'react';
import classes from './register.css';
import {registerUser,clearErrors} from './../../../actions/authAction';
import {connect} from 'react-redux';
import {Link} from  'react-router-dom';





const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};










class Register extends Component{

  state = {
       firstName: null,
       lastName: null,
       email: null,
       password: null,
       disabled:true,
       formErrors: {
         firstName: "",
         lastName: "",
         email: "",
         password: ""
       }}

componentDidMount(){
  if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
  }
  this.props.clearErrors()
}


handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      let userDetails={
        email:this.state.email,
        password:this.state.password,
        firstName:this.state.firstName,
        lastName:this.state.lastName
      }
      this.props.registerUser(userDetails,this.props.history);

    }else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };


  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 5 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
    if (formValid(this.state)){
      this.setState({disabled:false})
    }else {
      this.setState({disabled:true})
    }
  }


  render(){
    const { formErrors } = this.state;
    return(
      <div className={classes.AuthBox}>
      <div className={classes.RegsiterationSection}>
      <div className={classes.CompanyLogo}>
      <div className={classes.Logo}></div>
      </div>
      <div className={classes.AppDetails}>
      Sign up to connect with your friends.
      </div>

      <form onSubmit={this.handleSubmit} className={classes.RegisterationBox}>

      <label htmlFor="firstName">First Name</label>
      <div className={classes.RegisterationInput}>
      <input
      type="text"
      style={formErrors.firstName.length > 0 ? {border:"1px solid red"}: null}
      name="firstName"
      onChange={this.handleChange}
      placeholder='first name'  />
      </div>
      {formErrors.firstName.length > 0 && (
       <span className={classes.errorMessage}>{formErrors.firstName}</span>
           )}

      <label htmlFor="lastName">Last Name</label>
      <div className={classes.RegisterationInput}>
      <input
       type="text"
       style={formErrors.lastName.length > 0 ? {border:"1px solid red"} : null}
       name="lastName"
       onChange={this.handleChange}
       placeholder='last name'  />
      </div>
      {formErrors.lastName.length > 0 && (
                      <span className={classes.errorMessage}>{formErrors.lastName}</span>
            )}


      <label htmlFor="email">Email</label>
      <div className={classes.RegisterationInput}>
      <input
      type="email"
      style={formErrors.email.length > 0 || this.props.errors.email!==undefined? {border:"1px solid red"} : null}
      name="email"
      onChange={this.handleChange}
      placeholder='email' />
      </div>
      {formErrors.email.length > 0 && (
                     <span className={classes.errorMessage}>{formErrors.email}</span>
           )}
     {this.props.errors.email!==undefined?
      <span className={classes.errorMessage}>{this.props.errors.email}</span>:
        null  }
      <label htmlFor="password">Password</label>
      <div className={classes.RegisterationInput}>
      <input
      type="password"
      style={formErrors.password.length > 0 ?{border:"1px solid red"} : null}
      name="password"
      onChange={this.handleChange}
      placeholder='password' />
      </div>
      {formErrors.password.length > 0 && (
          <span className={classes.errorMessage}>{formErrors.password}</span>
      )}
      <div className={classes.SignUp}>
      <button type="submit" disabled={this.state.disabled}>Sign up</button>
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
  auth:state.auth,
  errors:state.errors
})

export default connect(mapStateToProps,{registerUser,clearErrors})(Register);
