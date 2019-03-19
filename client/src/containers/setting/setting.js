import React,{Component} from 'react';
import classes from './setting.css';



class SettingBox extends Component{
  render(){
    return (
      <div className={classes.EditProfile}>
      <div className={classes.Backdrop} onClick={this.props.close}></div>
      <div className={classes.SettingBox}>
      <div className={classes.Header}>
      <div>  Edit {this.props.SettingBox} info</div>
      </div>
      <div className={classes.Aside}>
      <div className={classes.OptionsAside}>change password</div>
      </div>
      {!this.props.SettingBox==="Basic"?

      <div className={classes.SettingPassword}>
      <label htmlFor='current password'>current password</label>
      <input type="password" placeholder="current password"/>
      <label htmlFor='newpassword'>new password</label>
      <input type="password" placeholder="new password"/>
      <label htmlFor='confirmpassword'>confirm password</label>
      <input type="password" placeholder="confirm password"/>
      </div>:
      <div className={classes.SettingPassword}>
      <label htmlFor='current password'>current password</label>
      <input type="password" placeholder="current password"/>
      <label htmlFor='newpassword'>new password</label>
      <input type="password" placeholder="new password"/>
      <label htmlFor='confirmpassword'>confirm password</label>
      <input type="password" placeholder="confirm password"/>
      </div>}
      <button type="submit">save</button>
      </div>
      </div>
    );
  }
}







export default SettingBox;
