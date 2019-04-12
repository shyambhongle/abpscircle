import React from 'react';
import classes from './backdropPost.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actionCreator from './../../actions/index';
import CommentForm from './../postdisplay/commentForm/commentForm';
import CommentFeed from './../postdisplay/commentFeed/commentFeed';

const BackdropPost=(props)=>{
  const onLikeClick=(data)=>{
   props.addLike(data);
 }

  const onUnlikeClick=(id)=>{
   props.removeLike(id);
 }

  const inputClick=(id)=>{
   props.fade()
   props.searchProfile(id,props.history)
 }

 const findUserLike=(likes)=>{
       const { auth } = props;
       if (likes.filter(like => like.user === auth.user.id).length > 0) {
         return true;
       } else {
         return false;
       }
     }


  let compDisplay=null;
  if (props.backPost.post!==undefined) {
    compDisplay=
      <div className={classes.MainDiv}>
      <div className={classes.BackdropPostCover}
      onClick={props.fade}></div>
      <div className={classes.BackdropPost}>

      <div className={classes.Post}>
      {props.backPost.post.img.image?<img
        src={props.backPost.post.img.image} alt=""/>:
        <div className={classes.PostText}>
        {props.backPost.post.text}
        </div>
      }
      </div>

      <div className={classes.PostAside}>
      <div className={classes.PostOwner}>
      <img src={props.backPost.post.avatar} alt=""/>
      <div className={classes.PostAvatarName}           onClick={()=>{inputClick(props.backPost.post.user)}}>
      {props.backPost.post.name.firstName+" "+
        props.backPost.post.name.lastName}
      </div>
      </div>

      <div className={classes.PostLikes}>

      <div className={classes.LikeButton}>
      {
        findUserLike(props.backPost.post.likes)?
        <div className={classes.Unlike}
        onClick={()=>{onUnlikeClick(props.backPost.post._id)}}></div>:
        <div className={classes.Like}
        onClick={()=>{onLikeClick(props.backPost.post._id)}}></div>
      }
      <div className={classes.LikesCount}>{props.backPost.post.likes.length} like</div>
      </div>
      </div>

      <div className={classes.PostComments}>
      <div className={classes.CommentForm}>
      <CommentForm postId={props.backPost.post._id} />
      </div>
      <div className={classes.CommentDisplay}>
      <CommentFeed post={props.backPost.post} comments={props.backPost.post.comments} />
      </div>
      </div>

      </div>

      </div>
      </div>
  }
  return (
    <span>
    {compDisplay}
    </span>
  );
}



const mapStateToProps=state=>({
  auth:state.auth,
  backPost:state.backpost
})


const mapDisptachToProps=dispatch=>({
  fade:()=>{dispatch(actionCreator.fade())},
  searchProfile:(id,history)=>{dispatch(actionCreator.searchProfile(id,history))},
  addLike:(data)=>{dispatch(actionCreator.addLike(data))},
  removeLike:(id)=>{dispatch(actionCreator.removeLike(id))},
})

export default connect(mapStateToProps,mapDisptachToProps)(withRouter(BackdropPost));
