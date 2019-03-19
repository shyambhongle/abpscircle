import React,{Component} from 'react';
import classes from './editprofile.css';



class EditProfile extends Component{
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
      <label htmlFor='livesin'>Your current location</label>
      <div className={classes.DisplayEdit}>
      <div className={classes.PlaceIcon}></div>
      <input type="text" placeholder="My current place"/>
      </div>

      <label htmlFor='dob'>Class of</label>
      <div className={classes.DisplayEdit}>
      <div className={classes.BatchIcon}></div>
      <input type="text" name="dob" placeholder="pass out year"/>
      </div>
      <label htmlFor='about'>About you</label>
      <div className={classes.DisplayEdit}>
      <div className={classes.BioIcon}></div>
      <input type="text" name="about" placeholder="about me"/>
      </div>
      </div>:

      <div className={classes.ContactInfo}>
      <label htmlFor='email'>Your email</label>
      <div className={classes.DisplayEdit}>
      <div className={classes.EmailIcon}></div>
      <input type="text" placeholder="email"/>
      </div>
      <label htmlFor='follow'>Social network</label>
      <div className={classes.FbIcon}></div>
      <input type="text" name="facebook" placeholder="facebook"/><br/>
      <div className={classes.TwitterIcon}></div>
      <input type="text" name="twitter" placeholder="twitter"/><br/>
      <div className={classes.LinkedIcon}></div>
      <input type="text" name="linkedin" placeholder="linekdin"/>
      </div>}
      <button type="submit">save</button>
      </div>
      </div>
    );
  }
}







export default EditProfile;
