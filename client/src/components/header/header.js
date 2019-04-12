import React,{Component} from 'react';
import classes from './header.css';
import {connect} from 'react-redux';
import * as actionCreators from './../../actions/index';
import {Link,withRouter} from 'react-router-dom';
import SettingBox from './../../containers/setting/setting';




class Header extends Component{

state={
  inputShow:false,
  requestShow:false,
  notification:false,
  messageNotification:false,
  setting:false,
  search:false,
  menu:false
}






inputShowToogle=(e)=>{
  if (e.target.value.length>2) {
    this.setState({inputShow:true})
  }else{
    this.setState({inputShow:false})
  }
}

inputClick=(id)=>{
  this.props.searchProfile(id,this.props.history)
}

blurHandler=()=>{
  setTimeout(()=>{
    this.setState({
      inputShow:false,
      requestShow:false,
      notification:false,
      search:false,
      menu:false
    })
  },200)
}


acceptRequest=(id,name)=>{
  let data={
    id,
    name
  }
  this.props.acceptRequest(data)
}

rejectRequest=(id,name)=>{
  let data={
    id,
    name
  }
  this.props.reject(data)
}



messageHandler=({name,user,avatar})=>{
  let data={
    name,
    avatar,
    id:user
  }

  this.props.openMsg(data);
}

render(){
  let searchInputList=this.props.search.map(profile=>{
    return <div className={classes.SingleUser} key={profile.id} onClick={()=>{this.inputClick(profile.id)}}>
    <div className={classes.Avatar}>
    <img src={profile.avatar} alt="" />
    </div>
    <div className={classes.UserName}>{profile.friend}</div>
    </div>;
  })
let request;
if (this.props.profile.friendRequest!==undefined) {
  request=this.props.profile.friendRequest.map((req,i)=>{
    return(
      <div key={i} className={classes.RequestUser}>
        <img src={req.avatar} alt=""/>
       <div className={classes.ReName} onClick={()=>{this.inputClick(req.id)}}>
       {req.name}</div>
        <button className={classes.AcceptButton} onClick={()=>{this.acceptRequest(req.id,req.name)}}>accept</button>
        <button className={classes.RejectButton} onClick={()=>{this.rejectRequest(req.id,req.name)}}>reject</button>
        </div>
    );
});
if (!this.props.profile.friendRequest.length>0) {
   request=<div className={classes.RequestUser}><div className={classes.ReNo}>No friend request</div></div>
}
}

let notificationCount;
if (this.props.profile.allnotification!==undefined) {
  let noOfNotification=this.props.profile.allnotification.reverse().slice(0,5);
  notificationCount=noOfNotification.map((req,i)=>{
    return(
      <div key={i}
       className={classes.RequestUser}
       onClick={()=>{
      this.props.displayBackPost(req.data)
      }}>
       <div className={classes.NotiName}>{req.message}</div>
        </div>
    );
})
if (!this.props.profile.allnotification.length>0) {
   notificationCount=<div className={classes.RequestUser}><div className={classes.ReNo}>No Notification</div></div>
}
}

let messageCount;
if (this.props.msg.inbox.length>0) {
  messageCount=this.props.msg.inbox.map((messages,i)=>{
    return(
      <div key={i} className={classes.RequestInbox}
       onClick={()=>{this.messageHandler(messages.user)}}>
      <img src={messages.user.avatar} alt=""/>
      <div className={classes.ReName}>{messages.user.name}</div>
       <div className={classes.NotiName}>{
         messages.message.msg.length>40?messages.message.msg.substring(0,30)+"...":
           messages.message.msg}</div>
        </div>
    );
})
if (!this.props.profile.allnotification.length>0) {
   notificationCount=<div className={classes.RequestUser}><div className={classes.ReNo}>No Notification</div></div>
}
}else {
  messageCount=<div className={classes.RequestInbox}>
  <div className={classes.ReNo}>No messgaes to show</div></div>
}





  return (





    <div className={classes.Header} >
    {this.state.setting?<SettingBox close={()=>{this.setState({setting:false})}}/>:null}
    <div className={classes.HeaderWrapper}>

    <Link style={{textDecoration:'none'}} to="/">
    <div className={classes.CompanyName}>
    <div className={classes.CompanyCircle}
     onClick={this.blurHandler}></div>
    <div className={classes.Divider}></div>
    <div className={classes.CompanyTitle}>ABPS circle</div>
    </div>
    </Link>



    <div className={classes.SearchBox}   onBlur={this.blurHandler}>
    <div className={classes.MobileSearch} onClick={()=>{this.setState({search:this.state.search?false:true})}}>
    </div>
    <div className={classes.MobileInput} style={{display:this.state.search?"inline-block":"none"}}><input type="text" placeholder="search for friends"
         onChange={(e)=>{this.props.searchInput(e); this.inputShowToogle(e)}}/></div>
    <input type="text" placeholder="search"
     onChange={(e)=>{this.props.searchInput(e); this.inputShowToogle(e)}}/>
     {
       this.state.inputShow?<div className={classes.SearchContainer}>
          <span className={classes.SearchArrow}></span>
          {
            this.props.search.length>0?searchInputList:<li>No User Found</li>
          }
          </div>:null
     }

    </div>

    <div className={classes.IconTray}>

    <div className={classes.RequestIcon} onClick={()=>{this.setState({
      requestShow:this.state.requestShow?false:true,messageNotification:false,notification:false});
      this.props.clearNotification(this.props.profile._id,"friendRequest")}}>
    {this.props.profile.friendRequest?this.props.profile.notification.friendRequest>0?
    <span className={classes.RequestCount}>{this.props.profile.notification.friendRequest}</span>:null:null}
    <span className={classes.RequestArrow} style={{display:this.state.requestShow?'inline-block':'none'}}></span>
    {this.state.requestShow?
    <div className={classes.RequestBox}>
    {request}
    </div>:null}

    </div>

    <div className={classes.MessageIcon} onClick={()=>{this.setState({
      messageNotification:this.state.messageNotification?false:true,requestShow:false,notification:false}); this.props.clearNotification(this.props.profile._id,"newmessage");
      this.props.inboxMsg(this.props.profile.commonId,this.props.auth.user.id)}}>
      {this.props.profile.notification?this.props.profile.notification.newmessage>0?
      <span className={classes.NoificationCount}>{this.props.profile.notification.newmessage}</span>:null:null}
      <span className={classes.RequestArrow} style={{display:this.state.messageNotification?'inline-block':'none'}}></span>
      {this.state.messageNotification?
      <div className={classes.RequestBox}>
      {messageCount}
      </div>:null}
      </div>




    <div className={classes.NotificationIcon} onClick={()=>{this.setState({
      notification:this.state.notification?false:true,messageNotification:false,requestShow:false}); this.props.clearNotification(this.props.profile._id,"newnotification")}}>
    {this.props.profile.notification?this.props.profile.notification.newnotification>0?
    <span className={classes.NoificationCount}>{this.props.profile.notification.newnotification}</span>:null:null}
    <span className={classes.RequestArrow} style={{display:this.state.notification?'inline-block':'none'}}></span>
    {this.state.notification?
    <div className={classes.RequestBox}>
    {notificationCount}
    </div>:null}
    </div>


    </div>

    <Link style={{textDecoration:'none'}} to="/profile"><div className={classes.ProfileIcon}>
    <div className={classes.Avatar}>
    <img src={this.props.auth.user.name?this.props.auth.user.avatar:null} alt="Profile"/>
    </div>
    <div className={classes.UserName}>{this.props.auth.user.name?this.props.auth.user.name.firstName:null}</div>
    </div></Link>


    <div className={classes.SettingContainer}>
    <div className={classes.SettingIcon}></div>

    <div className={classes.MobileSettingIcon} onClick={()=>{this.setState({menu:this.state.menu?false:true})}}>
    <div className={classes.MobileMenu}
    style={
    {transform:this.state.menu?
      "translateX(-58vw)":"translateX(20vw)"}}
    >
    <div className={classes.ProfileMobile}>
    <Link to='/profile'>Profile</Link>
    </div>
    <div className={classes.some} onClick={()=>{this.setState({setting:true})}}>Setting</div>
    <div className={classes.LogoutTray} onClick={()=>{this.props.logoutUser(this.props.history)}}>Log Out</div>
    </div>
    </div>

    <div className={classes.SettingBox}>
    <div className={classes.some} onClick={()=>{this.setState({setting:true})}}>Setting</div>
    <div className={classes.LogoutTray} onClick={()=>{this.props.logoutUser(this.props.history)}}>Log Out</div>
    </div>
    </div>




    <div className={classes.NotificsationIcon}>
    <div className={classes.Notification}>{request}
    </div>
    </div>



    </div>
    </div>
  );
}

}


const mapStateToProps=state=>({
  auth:state.auth,
  search:state.search.searchList,
  profile:state.profile.profile,
  msg:state.msg
})



const mapDispatchToProps=dispatch=>({
  logoutUser:(history)=>{dispatch(actionCreators.logoutUser(history))},
  searchInput:(e)=>{dispatch(actionCreators.searchPerson(e))},
  searchProfile:(id,history)=>{dispatch(actionCreators.searchProfile(id,history))},
  acceptRequest:(data)=>{dispatch(actionCreators.acceptRequest(data))},
  reject:(data)=>{dispatch(actionCreators.reject(data))},
  clearNotification:(id,query)=>{dispatch(actionCreators.clearNotification(id,query))},
  inboxMsg:(data,id)=>{dispatch(actionCreators.inboxMsg(data,id))},
  openMsg:(data)=>{dispatch(actionCreators.openMsgBox(data))},
  displayBackPost:(data)=>{dispatch(actionCreators.displayBackPost(data))}

})


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Header));
