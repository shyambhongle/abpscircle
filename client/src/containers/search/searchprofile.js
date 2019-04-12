import React,{Component} from 'react';
import Header from './../../components/header/header';
import Post from './../post/post';
import PostDisplay from './../../components/postdisplay/postdisplay';
import {connect} from 'react-redux';
import * as actionCreators from './../../actions/index';
import classes from './searchprofile.css';
import mobImg from './../../assets/banner1.jpg';


class SearchProfile extends Component{

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
  if (this.props.auth.user.id===this.props.profile.user) {
    this.props.history.push('/profile');
    return;
  }
  this.props.profilePost(this.props.profile.user)
}

componentWillReceiveProps(props){
  this.setState({
    profileInfo:props.profile.profileInfo?props.profile.profileInfo:this.state.profileInfo
  })
}

friendRequestHandle=({user,fullName,avatar},query)=>{
  let data={id:user,fullName,avatar};
  query = query.split(" ").join("")
  switch (query) {
    case "sendrequest":
      this.props.addFriend(data);
      break;
    case "cancelrequest":
      this.props.cancelRequest(data);
      break;
    case "acceptrequest":
      this.props.acceptRequest(data);
      break;
    case "unfriend":
      this.props.unfriend(data);
      break;
    case "reject":
      this.props.reject(data);
      break;
    default:
    return null;
  }
}

messageHandler=()=>{
  let data={
    name:this.props.profile.fullName,
    avatar:this.props.profile.avatar,
    id:this.props.profile.user
  }

  this.props.openMsg(data);
}



render(){

let privateTest=true;


let friendButton;
if (this.props.myprofile.allFriends!==undefined ) {

  if (this.props.myprofile.allFriends.length>0) {
    this.props.myprofile.allFriends.map(friends=>{
      return friends.id===this.props.profile.user?friendButton="unfriend":null
    })
    if (friendButton===undefined) {
      friendButton="send request";
    }
  }else{
    friendButton="send request";
  }

  if (friendButton==="send request" ) {
    this.props.myprofile.sentRequest.map(friends=>{
      return friends.id===this.props.profile.user?friendButton="cancel request":null
    })
  }else if (friendButton==="send request") {
    friendButton="send request";
  }
    if (friendButton==="send request") {
      this.props.myprofile.friendRequest.map(friends=>{
        return friends.id===this.props.profile.user?friendButton="accept request":null
      })
    }else if (friendButton==="send request") {
      friendButton="send request";
    }
}


if (friendButton==="unfriend") {
  privateTest=false;
}else {
  privateTest=true;
}


  return(
    <div className={classes.SearchProfile}>
    <Header/>

    <div className={classes.ProfileBanner}>

    <div className={classes.RequestHandler}>
    <button className={classes.RequestButton}
    onClick={()=>{this.friendRequestHandle(this.props.profile,friendButton)}}>
    {friendButton}
    </button>
    </div>
    <div className={classes.MessageButton}><button onClick={this.messageHandler}>message</button>
   </div>
    <div className={classes.ProfileCoverImage}>
    {this.props.profile.cover?<div className={classes.SearchCoverImg}
    style={{backgroundImage:`url(${this.props.profile.cover.image?
      this.props.profile.cover.image:""})`}}></div>:null}
    </div>
    <div className={classes.MobileProfileBanner}>
    <img  src={mobImg} alt=''/>
    </div>
    <div className={classes.Avatar}>
    <img src={this.props.profile.avatar}
    alt="profile pic"/>
    </div>
    </div>


    <div className={classes.ProfileWrapper}>
    <div className={classes.ProfileNav}></div>


    <div className={classes.ProfileDetails}>
    <div className={classes.ProfileName}>
    {this.props.profile.fullName}
    </div>
    <div className={classes.ProfileIntro}>
    <div className={classes.SchoolIcon}></div>
    <p>{this.state.profileInfo.school}</p>
    </div>
    <div className={classes.ProfileIntro}>
    <div className={classes.BatchIcon}></div>
    {this.state.profileInfo.classof}
     </div>
    <div className={classes.ProfileIntro}>
    <div className={classes.PlaceIcon}></div>
    {this.state.profileInfo.lives}</div>

    <div className={classes.ProfileIntro}>
    <div className={classes.FavQuote}>
    {this.state.profileInfo.bio}
    </div>
    </div>

    <div className={classes.SingleProfileDetails}>
    <div className={classes.OtherName}>
    <p >Get in touch</p>
    </div>
    <div className={classes.ProfileIntro}>
    <div className={classes.EmailIcon}></div>
    <p>{this.state.profileInfo.email}</p>
    </div>

    <div className={classes.ProfileIntro}>
    <div className={classes.ConnectIcon}></div>
    <p>connect with {this.props.profile.name?this.props.profile.name.firstName:"me"}</p>
    </div>

    <div className={classes.Follow}>
    <a href={this.state.profileInfo.facebook} target="_blank">
    <div className={classes.FbIcon}></div>
    </a>
    <a href={this.state.profileInfo.TwitterIcon} target="_blank">
    <div className={classes.TwitterIcon}></div>
    </a>
    <a href={this.state.profileInfo.LinkedIcon} target="_blank">
    <div className={classes.LinkedIcon}></div>
    </a>
    </div>


    </div>




    </div>


    <div  className={classes.PostRelated}>
    {this.props.profile.private && privateTest?<div className={classes.PrivateAcc}>
    This account is private <div className={classes.PrivateLock}></div>
    <p>To see {this.props.profile.name.firstName}'s post you should be friends. </p>
    </div>:
      <div>
      <div className={classes.ProfilePost}>
      <Post OtherPro="true"/>
      </div>
      <div className={classes.DisplayPost}>
      <PostDisplay data={this.props.post} delete={this.props.deletePost}/>
      </div>
      </div>}
    </div>

    </div>

    </div>
  )
}
}

const mapStateToProps=state=>({
  profile:state.search.searchPerson,
  post:state.search.searchPersonPost,
  myprofile:state.profile.profile,
  auth:state.auth
})

const mapDispatchToProps=dispatch=>({
profilePost:(id)=>{dispatch(actionCreators.searchProfilePost(id))},
addFriend:(data)=>{dispatch(actionCreators.addFriend(data))},
acceptRequest:(data)=>{dispatch(actionCreators.acceptRequest(data))},
cancelRequest:(data)=>{dispatch(actionCreators.cancelRequest(data))},
reject:(data)=>{dispatch(actionCreators.reject(data))},
unfriend:(data)=>{dispatch(actionCreators.unfriend(data))},
openMsg:(data)=>{dispatch(actionCreators.openMsgBox(data))}
})

export default connect(mapStateToProps,mapDispatchToProps)(SearchProfile);
