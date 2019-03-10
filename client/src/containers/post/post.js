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
      <div className={classes.Post}>

      <div className={classes.PostHeader}>
      <div><span className={classes.PostIcon}></span>
       create post</div>
      </div>

      <div className={classes.PostContent}>
      <form onSubmit={this.submitHandler}>
      <textarea
      placeholder="create a new post..." name="text" onChange={this.changeHandler}
      value={this.state.text}>
      </textarea>
      <div className={classes.PostButton}>
      <button type="submit">Post</button>
      </div>
      </form>
      </div>

      <div className={classes.PostFooter}>
      <div className={classes.DividerPost}></div>

      <div className={classes.UplaodImage}>
      <div className={classes.UploadLabel}>
      <span className={classes.imageIcon}></span>
      Add image</div>
      <input type="file" name="imageUpload" onChange={this.imageHandle}/>
      </div>

      </div>


      </div>
    );
  }
}


export default connect(null,{newPost})(Post);
