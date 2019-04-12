import React,{Component} from 'react';
import classes from './setting.css';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from './../../actions/index';


class SettingBox extends Component{
  state={
    current:"",
    newpassword:"",
    confirmpassword:"",
    error:{password:false},
    toogle:"pwd"
  }

inputChange=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}

submitHandler=(e)=>{
  e.preventDefault();
  if (this.state.confirmpassword!==this.state.newpassword ||
     this.state.confirmpassword==="") {
    this.setState({
      error:{
        password:"confirm password did not match"
      }
    })
  }else{
    this.props.changepassword(this.state,this.props.history);
  }
}

sliderOption=(e,data)=>{
  e.preventDefault();
  this.props.privateacc(data);
}

  render(){
    let styleToggle=[classes.slider,classes.round].join(' ');
    return (
      <div className={classes.EditProfile}>
      <div className={classes.Backdrop} onClick={this.props.close}></div>
      <div className={classes.SettingBox}>
      <div className={classes.Header}>
      <div>  Edit {this.props.SettingBox} info</div>
      </div>
      <div className={classes.Aside}>
      <div className={classes.OptionsAside}
      onClick={()=>{this.setState({toogle:"pwd"})}}>change password</div>
      <div className={classes.OptionsAside}
      onClick={()=>{this.setState({toogle:"privacy"})}}>Account privacy</div>
      </div>
      {this.state.toogle!=="pwd"?
      <div className={classes.SettingPrivacy}>
      <p>Make account Private</p>
      {this.props.profile.private?<label className={classes.switch}>
        <input type="checkbox" checked onChange={(e)=>{this.sliderOption(e,false)}}/>
        <span className={styleToggle}></span>
      </label>:<label className={classes.switch}>
        <input type="checkbox"  onChange={(e)=>{this.sliderOption(e,true)}}/>
        <span className={styleToggle}></span>
      </label>}
      </div>:
      <div className={classes.SettingPassword}>
      <label htmlFor='current'>current password</label>
      <input type="password"
      style={{borderBottom:this.props.errors.message?"1px solid red":"1px solid black"}}
      name="current" onChange={this.inputChange}
      value={this.state.current} placeholder="current password"/>
      <p   style={{color:"red",fontSize:"12px",marginLeft:"10px",
    display:this.props.errors.message?"inline-block":"none"}}>{this.props.errors.message}</p>
      <label htmlFor='newpassword'>new password</label>
      <input type="password" name="newpassword" onChange={this.inputChange}
      value={this.state.newpassword} placeholder="new password"/>
      <label htmlFor='confirmpassword'>confirm password</label>
      <input type="password" name="confirmpassword"
      style={{borderBottom:this.state.error.password?"1px solid red":"1px solid black"}}
      onChange={this.inputChange}
      value={this.state.confirmpassword} placeholder="confirm password"/>
      <p style={{color:"red",fontSize:"12px",marginLeft:"10px"}}>{this.state.error.password}</p>
      <button type="submit" onClick={this.submitHandler}>save</button>
      </div>}
      </div>
      </div>
    );
  }
}





const mapStateToProps=state=>({
  errors:state.errors,
  profile:state.profile.profile
})

const mapDispatchToProps=dispatch=>({
  changepassword:(data,history)=>{dispatch(actionCreators.changepassword(data,history))},
  privateacc:(data)=>{dispatch(actionCreators.privateacc(data))}
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SettingBox));
