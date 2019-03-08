import React, { Component } from 'react';
import CommentItem from './commentItem';

class CommentFeed extends Component {
  render() {
    const { comments, post } = this.props;

    return comments.map((comment,i) => (
      <CommentItem key={i} comment={comment} postId={post._id} admin={post.user} />
    ));
  }
}


export default CommentFeed;
