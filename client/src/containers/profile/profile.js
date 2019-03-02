import React,{Component} from 'react';
import classes from './profile.css';
import Header from './../../components/header/header';
import Post from './../post/post';
import PostDisplay from './../../components/postdisplay/postdisplay';
import {connect} from 'react-redux';
import * as actionCreators from './../../actions/index';
import axios from 'axios';

class Profile extends Component{

  state={
    profilePostpro:[]
  }

  componentDidMount(){
    this.props.profilePost()
    this.props.setProfile()
  }


componentWillReceiveProps(props){
  console.log(props.post);
  this.setState({
    profilePostpro:props.post.profilePost
  })
}


  render(){
    console.log(this.state);
    return(
      <div>
      <Header/>
      <Post/>
      <PostDisplay data={this.state.profilePostpro}/>
      </div>
    );
  }
}

const mapStateToProps=state=>({
  auth:state.auth,
  post:state.post
})

const mapDispatchToProps=dispatch=>({
  profilePost:()=>{dispatch(actionCreators.profilePost())},
  setProfile:()=>{dispatch(actionCreators.setProfile())}
})

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
