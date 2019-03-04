import React,{Component} from 'react';
import Header from './../../components/header/header';
import Post from './../post/post';
import PostDisplay from './../../components/postdisplay/postdisplay';
import {connect} from 'react-redux';
import * as actionCreators from './../../actions/index';
import classes from './profile.css';

class Profile extends Component{

  state={
    profilePostpro:[]
  }

  componentDidMount(){
    this.props.profilePost()
    this.props.setProfile()
  }




componentWillReceiveProps(props){
  this.setState({
    profilePostpro:props.post.profilePost
  })
}


  render(){
    return(
      <div>
      <Header/>
      <div className={classes.ProfileBanner}>
      <div className={classes.Avatar}>
      <img src={this.props.profile.avatar} alt="profile pic"/>
      </div>
      <div className={classes.ProfileName}>{this.props.profile.name}</div>
      </div>
      <Post/>
      <PostDisplay data={this.state.profilePostpro}/>
      </div>
    );
  }
}

const mapStateToProps=state=>({
  auth:state.auth,
  post:state.post,
  profile:state.profile.profile
})

const mapDispatchToProps=dispatch=>({
  profilePost:()=>{dispatch(actionCreators.profilePost())},
  setProfile:()=>{dispatch(actionCreators.setProfile())}
})

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
