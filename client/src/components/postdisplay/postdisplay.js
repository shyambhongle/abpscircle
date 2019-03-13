import React,{Component} from 'react';
import classes from './postdisplay.css';
import CommentForm from './commentForm/commentForm';
import CommentFeed from './commentFeed/commentFeed';
import {connect} from 'react-redux';
import * as actionCreator from './../../actions/index';

class PostDisplay extends Component{


state={
  like:false
}



   onLikeClick=(data)=>{
    this.props.addLike(data);
  }

   onUnlikeClick=(id)=>{
    this.props.removeLike(id);
  }



    findUserLike=(likes)=>{
      const { auth } = this.props;
      if (likes.filter(like => like.user === auth.user.id).length > 0) {
        return true;
      } else {
        return false;
      }
    }



render(){
    let post;
    if (this.props.data.length>0) {
      post=this.props.data.map((singlePost,i)=>{
        return (
          <div className={classes.Post} key={singlePost._id}>
          <div className={classes.PostArea} >
          <div className={classes.PostDisplayHeader}>

          <div className={classes.Avatar}><img src={singlePost.avatar} alt="avatar"/></div>
          <div className={classes.Name}>{singlePost.name.firstName+" "+
        singlePost.name.lastName}</div>
        {
          this.props.auth.user.id!==singlePost.user?null:
        <div className={classes.DeletePost}>
        <div className={classes.DeleteContainer} onClick={()=>{this.props.delete(singlePost._id)}}>Delete Post</div>
        </div>
        }
          </div>

          <div className={classes.Article}>{singlePost.text}</div>
          {
            singlePost.img.image!==false?<div className={classes.PostImage}>
            <img src={singlePost.img.image!==false?singlePost.img.image:null} alt='postImage'/>
            </div>:null
          }
          <div className={classes.LikeButton}>
          {
            this.findUserLike(singlePost.likes)?
            <div className={classes.Unlike}
            onClick={()=>{this.onUnlikeClick(singlePost._id)}}></div>:
            <div className={classes.Like}
            onClick={()=>{this.onLikeClick(singlePost._id)}}></div>
          }
          {
            singlePost.likes.length>0?
            <div className={classes.LikeHover}>{singlePost.likes.length} likes</div>:<div className={classes.LikeHover}>0 like</div>
          }
          </div>
          </div>
          <CommentForm postId={singlePost._id} />
          <CommentFeed post={singlePost} comments={singlePost.comments} />
          </div>
        )
      })
    }else {
      post=<div className={classes.NoPostDisplay}>
      <div className={classes.NoPost}>No Post To Display</div>
      </div>
    }
  return (
    <div>
    {post}
    </div>
  );
}
}



const mapStateToProps=state=>({
  auth:state.auth
})

const mapsDispatchToprops=dispatch=>({
  addLike:(data)=>{dispatch(actionCreator.addLike(data))},
  removeLike:(id)=>{dispatch(actionCreator.removeLike(id))},
})


export default connect(mapStateToProps,mapsDispatchToprops)(PostDisplay);
