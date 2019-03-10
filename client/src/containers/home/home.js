import React,{Component} from 'react';
import Post from './../post/post';
import Header from './../../components/header/header';
import classes from './home.css';
import {connect} from 'react-redux';
import * as actionCreators from './../../actions/index';
import PostDisplay from './../../components/postdisplay/postdisplay';

class Home extends Component {

componentDidMount(){
  if (!this.props.auth.isAuthenticated) {
    this.props.history.push('/auth/login');
    return;
  }
  this.props.allPost();
}




render(){


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

    </div>
    </div>
  );
}
}


const mapStateToProps=state=>({
  auth:state.auth,
  post:state.post
})


const mapDispatchToProps=dispatch=>({
  allPost:()=>{dispatch(actionCreators.retrivePost())}
})

export default connect(mapStateToProps,mapDispatchToProps)(Home);
