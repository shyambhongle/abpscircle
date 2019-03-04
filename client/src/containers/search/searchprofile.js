import React,{Component} from 'react';
import Header from './../../components/header/header';
import Post from './../post/post';
import PostDisplay from './../../components/postdisplay/postdisplay';
import {connect} from 'react-redux';
import * as actionCreators from './../../actions/index';
import classes from './profile.css';

class SearchProfile extends Component{



componentDidMount(){
  this.props.profilePost(this.props.profile.user)
}

componentWillReceiveProps(props){
}

friendRequestHandle=(id,name,query)=>{
  let data={id,name};
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
    <div className={classes.Avatar}>
    <img src={this.props.profile.avatar} alt="profile pic"/>
    </div>
    <div className={classes.ProfileName}>{this.props.profile.name}</div>
    <div className={classes.RequestHandler}>
    <button className={classes.RequestButton}
    onClick={()=>{this.friendRequestHandle(this.props.profile.user,this.props.profile.name,friendButton)}}>
    {friendButton}
    </button>
    </div>
    </div>
    <Post/>
    <PostDisplay data={this.props.post}/>
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
unfriend:(data)=>{dispatch(actionCreators.unfriend(data))}
})

export default connect(mapStateToProps,mapDispatchToProps)(SearchProfile);
