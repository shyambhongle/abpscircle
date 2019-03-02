import React from 'react';
import classes from './postdisplay.css';



const PostDisplay=(props)=>{

  let post;
  if (props.data.length>0) {
    post=props.data.map((singlePost,i)=>{
      return (
        <div className={classes.Post} key={singlePost._id}>
        <div className={classes.PostArea} >
        <div className={classes.Avatar}><img src={singlePost.avatar} alt="avatar"/></div>
        <div className={classes.Name}>{singlePost.name}</div>
        <div className={classes.Article}>{singlePost.text}</div>
        </div>
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





export default PostDisplay;
