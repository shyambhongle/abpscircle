import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from './../../../actions/postAction';
import classes from './commentItem.css';
import * as actionCreator from './../../../actions/index';
import {withRouter} from 'react-router-dom';

class CommentItem extends Component {
  onDeleteClick=(postId, commentId)=>{
    this.props.deleteComment(postId, commentId);
  }

  inputClick=(id)=>{
    this.props.fade();
    this.props.searchProfile(id,this.props.history)
  }


  render() {
    const { comment, postId, auth ,admin} = this.props;
    return (
      <div className={classes.CommentDiplay}>

          <div className={classes.CommentHeader}>
          <div className={classes.Avatar}>
          <img
            src={comment.avatar}
            alt=""
          />
          </div>
          <p onClick={()=>{this.inputClick(comment.user)}}>
          {comment.name.firstName+" "+comment.name.lastName}</p>
          </div>

          <div className={classes.CommentData}>
            <p>{comment.text}</p>
            {comment.user === auth.user.id || admin===auth.user.id ?
              <div
                className={classes.DeleteComment}
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}></div>
             : null}
          </div>

      </div>
    );
  }
}



const mapStateToProps = state => ({
  auth: state.auth
});

const mapsDispatchToprops=dispatch=>({
  searchProfile:(id,history)=>{dispatch(actionCreator.searchProfile(id,history))},
  deleteComment:(postId, commentId)=>{dispatch(actionCreator.deleteComment(postId, commentId))},
  fade:()=>{dispatch(actionCreator.fade())},
})

export default connect(mapStateToProps,mapsDispatchToprops)(withRouter(CommentItem));
