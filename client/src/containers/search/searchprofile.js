import React,{Component} from 'react';
import Header from './../../components/header/header';
import Post from './../post/post';
import PostDisplay from './../../components/postdisplay/postdisplay';
import {connect} from 'react-redux';
import * as actionCreators from './../../actions/index';
import classes from './searchprofile.css';

class SearchProfile extends Component{



componentDidMount(){
  this.props.profilePost(this.props.profile.user)
}

componentWillReceiveProps(props){
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






  return(
    <div>
    <Header/>

    <div className={classes.ProfileBanner}>
    <div className={classes.RequestHandler}>
    <button className={classes.RequestButton}
    onClick={()=>{this.friendRequestHandle(this.props.profile,friendButton)}}>
    {friendButton}
    </button>
    </div>
    <button className={classes.MessageButton} onClick={this.messageHandler}>message</button>
    <div className={classes.ProfileCoverImage}></div>
    <div className={classes.Avatar}>
    <img src={this.props.profile.avatar} alt="profile pic"/>
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
    <p>Studied at Aditya Birla Public School,Awarpur</p>
    </div>
    <div className={classes.ProfileIntro}>
    <div className={classes.BatchIcon}></div>
    class of 2015
     </div>
    <div className={classes.ProfileIntro}>
    <div className={classes.PlaceIcon}></div>
    Lives in Pune
    </div>

    <div className={classes.ProfileIntro}>
    <div className={classes.FavQuote}>
    "Be the captain of your journey!!"
    <p>-Rabindranath Tagore</p>
    </div>
    </div>

    </div>


    <div className={classes.PostRelated}>
    <div className={classes.ProfilePost}>
    <Post/>
    </div>
    <div className={classes.DisplayPost}>
    <PostDisplay data={this.props.post} delete={this.props.deletePost}/>
    </div>
    </div>

    </div>

    </div>
  )
}
}

const mapStateToProps=state=>({
  profile:state.search.searchPerson,
  post:state.search.searchPersonPost,
  myprofile:state.profile.profile
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
