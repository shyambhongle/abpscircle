import React,{Component} from 'react';
import classes from './post.css';
import {connect} from 'react-redux';
import {newPost} from './../../actions/postAction';



class Post extends Component {

state={
  text:"",
  img:null
}


changeHandler=(e)=>{
  this.setState({
    text:e.target.value
  })
}

imageHandle=(e)=>{
  this.setState({
    img: e.target.files[0]
  })  }



submitHandler=(e)=>{
  e.preventDefault();
  const data = new FormData()
  data.append('img', this.state.img);
  data.append('text',this.state.text);
  let senddata=this.state.img?data:{text:this.state.text};
  this.props.newPost(senddata,this.state.img);
  this.setState({
    text:"",
    img:null
  })
}




  render(){
    return (
      <div>
      <div className={classes.Post}>
      <div className={classes.Title}>Create A Post</div>
      <form onSubmit={this.submitHandler}>
      <textarea rows="4" cols="50"
      placeholder-="create a new post..." name="text" onChange={this.changeHandler}
      value={this.state.text}>
      </textarea>
      <input type='file' name="img" onChange={this.imageHandle}/>
      <button type="submit">Post</button>
      </form>
      </div>
      </div>
    );
  }
}


export default connect(null,{newPost})(Post);
