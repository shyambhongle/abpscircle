import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from './../../../actions/postAction';
import classes from './commentForm.css';

class CommentForm extends Component {
state = {
    text: '',
    errors: {}
  };

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit=(e)=>{
    e.preventDefault();
    const { user } = this.props.auth;
    const { postId } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(postId, newComment);
    this.setState({ text: '' });
  }

  onChange=(e)=>{
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
          <div className={classes.CommentBox}>
          <div className={classes.Avatar}><img src={this.props.auth.user.avatar} alt=""/></div>
            <form onSubmit={this.onSubmit}>
                <input
                  type="text"
                  placeholder="comment on post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              <button type="submit" className="btn btn-dark">
                comment
              </button>
            </form>
          </div>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
