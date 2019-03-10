import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from './../../../actions/postAction';
import classes from './commentItem.css';

class CommentItem extends Component {
  onDeleteClick=(postId, commentId)=>{
    this.props.deleteComment(postId, commentId);
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
          <p className="text-center">{comment.name.firstName+" "+comment.name.lastName}</p>
          </div>

          <div className={classes.CommentData}>
            <p className="lead">{comment.text}</p>
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

export default connect(mapStateToProps, { deleteComment })(CommentItem);
