import React,{Component} from 'react';
import classes from './post.css';
import {connect} from 'react-redux';
import {newPost} from './../../actions/postAction';
import Loading from './../../components/loading/loading';


class Post extends Component {

state={
  text:"",
  img:null,
  preview:false,
  previewUrl:""
}


changeHandler=(e)=>{
  this.setState({
    text:e.target.value
  })
}

imageHandle=(e)=>{

  this.setState({
    img: e.target.files[0],
    preview:true,
    previewUrl:URL.createObjectURL(e.target.files[0])
  })
 }



submitHandler=(e)=>{
  e.preventDefault();
  const data = new FormData()
  data.append('img', this.state.img);
  data.append('text',this.state.text);
  let someone={
    from:this.props.OtherPro?true:false,
    name:this.props.OtherPro?this.props.searchProfile.fullName:"false",
    avatar:this.props.OtherPro?this.props.searchProfile.avatar:"false",
    id:this.props.OtherPro?this.props.searchProfile.user:"false"
  }
  for ( var key in someone ) {
    data.append(key, someone[key]);
}
  let senddata=this.state.img?data:{text:this.state.text,someone:someone};
  this.props.newPost(senddata,this.state.img);
  this.setState({
    text:"",
    img:null,
    preview:false
  })
}


  render(){
    return (
      <div className={classes.Post}>
      {this.props.loading?<div className={classes.LoadingPost}><Loading/></div>:null}
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
      {this.state.preview?
        <span className={classes.PreviewImage}><img src={this.state.previewUrl} alt=''/></span>:null}
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

const mapStateToProps=state=>({
  loading:state.post.loading,
  searchProfile:state.search.searchPerson
})

export default connect(mapStateToProps,{newPost})(Post);
