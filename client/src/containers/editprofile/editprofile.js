import React,{Component} from 'react';
import classes from './editprofile.css';
import {connect} from 'react-redux';
import {editprofiledata} from './../../actions/profileAction';

class EditProfile extends Component{
  state={
    profileInfo:{
      school:"",
      classof:"",
      dob:"",
      bio:"",
      lives:"",
      email:"",
      facebook:"",
      twitter:"",
      linkedin:""
    }
  }

  componentDidMount(){
    this.setState({
      profileInfo:this.props.profile.profileInfo
  })}

  inputChange=(e)=>{
    let updatedValue={...this.state.profileInfo};
    updatedValue[e.target.name]=e.target.value
    this.setState({
        profileInfo:updatedValue
    })
  }

  submitHandler=(e)=>{
    e.preventDefault();
    this.props.editprofiledata(this.state.profileInfo)
    this.props.close();
  }


  render(){
    return (
      <div className={classes.EditProfile}>
      <div className={classes.Backdrop} onClick={this.props.close}></div>
      <div className={classes.EditBox}>
      <div className={classes.Header}>
      <div>  Edit {this.props.editbox} info</div>
      </div>
      {this.props.editbox==="Basic"?

      <div className={classes.BasicInfo}>

      <label htmlFor='school'>Where did you studied</label>
      <div className={classes.DisplayEdit}>
      <div className={classes.SchoolIcon}></div>
      <input type="text" placeholder={this.state.profileInfo.school} name="school"
      onChange={this.inputChange}/>
      </div>

      <label htmlFor='classof'>Class of</label>
      <div className={classes.DisplayEdit}>
      <div className={classes.BatchIcon}></div>
      <input type="text" placeholder={this.state.profileInfo.classof} name="classof"
      onChange={this.inputChange}/>
      </div>

      <label htmlFor='livesin'>Your current location</label>
      <div className={classes.DisplayEdit}>
      <div className={classes.PlaceIcon}></div>
      <input type="text" placeholder={this.state.profileInfo.lives} name="lives"
      onChange={this.inputChange} />
      </div>

      <label htmlFor='dob'>Your BirthDate:</label>
      <div className={classes.DisplayEdit}>
      <div className={classes.DobIcon}></div>
      <input type="text" placeholder={this.state.profileInfo.dob} name="dob"
      onChange={this.inputChange}/>
      </div>

      <label htmlFor='about'>About you</label>
      <div className={classes.DisplayEdit}>
      <div className={classes.BioIcon}></div>
      <input type="text" placeholder={this.state.profileInfo.bio} name="bio"
      onChange={this.inputChange}/>
      </div>
      </div>:

      <div className={classes.ContactInfo}>
      <label htmlFor='email'>Your email</label>
      <div className={classes.DisplayEdit}>
      <div className={classes.EmailIcon}></div>
      <input type="text" placeholder={this.state.profileInfo.email} name="email"
      onChange={this.inputChange}/>
      </div>
      <label htmlFor='follow'>Social network</label>
      <div className={classes.FbIcon}></div>
      <input type="text" placeholder={this.state.profileInfo.facebook} name="facebook"
      onChange={this.inputChange}/><br/>
      <div className={classes.TwitterIcon}></div>
      <input type="text" placeholder={this.state.profileInfo.twitter} name="twitter"
      onChange={this.inputChange}/><br/>
      <div className={classes.LinkedIcon}></div>
      <input type="text" placeholder={this.state.profileInfo.linkedin} name="linkedin"
      onChange={this.inputChange}/>
      </div>}
      <button type="submit" onClick={this.submitHandler}>save</button>
      </div>
      </div>
    );
  }
}



const mapStateToProps=state=>({
  profile:state.profile.profile
})



export default connect(mapStateToProps,{editprofiledata})(EditProfile);
