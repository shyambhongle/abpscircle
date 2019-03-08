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
          <p className="text-center">{comment.name}</p>
          </div>
          <div className={classes.CommentData}>
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id || admin===auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button">delete
              </button>
            ) : null}
          </div>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
