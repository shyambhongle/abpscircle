import React,{Component} from 'react';
import classes from './post.css';
import {connect} from 'react-redux';
import {newPost} from './../../actions/postAction';



class Post extends Component {

state={
  text:""
}

changeHandler=(e)=>{
  this.setState({
    text:e.target.value
  })
}

submitHandler=(e)=>{
  e.preventDefault();
  this.props.newPost({text:this.state.text})
  this.setState({
    text:""
  })
}




  render(){
    return (
      <div>
      <div className={classes.Post}>
      <div className={classes.Title}>Create A Post</div>
      <textarea rows="4" cols="50" placeholder-="create a new post..." onChange={this.changeHandler}
      value={this.state.text}>
      </textarea>
      <button onClick={this.submitHandler}>Post</button>
      </div>
      </div>
    );
  }
}


export default connect(null,{newPost})(Post);
