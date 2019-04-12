import React,{Component} from 'react';
import classes from './home.css';
import {connect} from 'react-redux';
import * as actionCreators from './../../actions/index';
import PostDisplay from './../../components/postdisplay/postdisplay';
import Post from './../post/post';
import Header from './../../components/header/header';
import OnlineFriends from './../../components/onlinefriends/onlineFriend';
import {withRouter} from 'react-router-dom';



class Home extends Component {

componentDidMount(){
  if (!this.props.auth.isAuthenticated) {
    this.props.history.push('/auth/login');
    return;
  }
  this.props.allPost();
  this.props.onlineFriendSearch();
  this.props.suggestion();
}


inputClick=(id)=>{
  this.props.searchProfile(id,this.props.history)
}

render(){


  let suggestedUser;
   if (this.props.suggest.length>0) {
     suggestedUser=this.props.suggest.map((singleSuggestion,i)=>{
       return <div className={classes.SuggestedUser} key={singleSuggestion.id}>
       <div className={classes.UserAvatar}>
       <img src={singleSuggestion.avatar} alt=""/>
       </div>
       <div className={classes.UserFullName}
       onClick={()=>{this.inputClick(singleSuggestion.id)}}>
       {singleSuggestion.name}</div>
       <button className={classes.SendRequest}
       onClick={()=>{this.inputClick(singleSuggestion.id)}}>add</button>
       </div>
     })
   }
  return (
    <div className={classes.Home}>
    <Header/>

    <div className={classes.PostWrapper}>

    <div className={classes.Postrelated}>
    <div className={classes.CreatePost}><Post/></div>
    <div className={classes.DisplayPost}>
    <PostDisplay data={this.props.post.allPost}/>
    </div>
    </div>

    <div className={classes.Aside}>
    <div className={classes.SuggestionBox} >
    <div className={classes.SuggestionHeader}>
    <p>Suggestions for You</p>
    </div>
      <div className={classes.SuggestionBody}>
      {suggestedUser}
      </div>
    </div>
    <div className={classes.OnlineFriends}><OnlineFriends/></div>
    </div>
    </div>
    </div>
  );
}
}


const mapStateToProps=state=>({
  auth:state.auth,
  post:state.post,
  suggest:state.suggestion.suggestion,
  profile:state.profile.profile
})


const mapDispatchToProps=dispatch=>({
  allPost:()=>{dispatch(actionCreators.retrivePost())},
  suggestion:()=>{dispatch(actionCreators.suggestion())},
  onlineFriendSearch:()=>{dispatch(actionCreators.onlineFriendSearch())},
  searchProfile:(id,history)=>{dispatch(actionCreators.searchProfile(id,history))},
})

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Home));
