import axios from 'axios';

import {
  PROFILE_POST,
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  RETRIVE_POST,
  UPDATE_POST,
  POST_LOADING,
  DELETE_POST,
  BACK_POST
} from './actionType';

// Add Post
export const newPost = (payload,img) => dispatch => {
  dispatch(clearErrors());
  dispatch({type:POST_LOADING,payload:true});
  axios.post(`${img?'/post/image':'/post'}`,payload)
    .then(res =>{
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
      window.location.reload();
    }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const retrivePost = () => dispatch => {
  axios
    .get('/post')
    .then(res =>
      dispatch({
        type: RETRIVE_POST,
        payload: res.data
      })
    )
    .catch(err =>
    console.log(err)
    );
};


export const profilePost=()=>{
  return dispatch=>{
    axios.get('/post/profile')
          .then(res=>{
            dispatch({type:PROFILE_POST,payload:res.data})
          })
  }
}





// Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/post/${id}`)
    .then(res =>
      dispatch({
        type: UPDATE_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: UPDATE_POST,
        payload: null
      })
    );
};

// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/post/${id}`)
    .then(res =>{
      dispatch({
        type: DELETE_POST,
        payload: id
      })
      dispatch({
        type:BACK_POST,
        payload:res.data
      })
      }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Like
export const addLike = (id) => dispatch => {
  axios
    .post(`/post/like/${id}`)
    .then(res => {
      dispatch({
        type: UPDATE_POST,
        payload: res.data
      })
      dispatch({
        type:BACK_POST,
        payload:res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/post/unlike/${id}`)
    .then(res =>{
      dispatch({
        type: UPDATE_POST,
        payload: res.data
      })
      dispatch({
        type:BACK_POST,
        payload:res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/post/comment/${postId}`, commentData)
    .then(res =>{
        console.log(res);
        dispatch({
          type: UPDATE_POST,
          payload: res.data
        })
        dispatch({
          type:BACK_POST,
          payload:res.data
        })
    }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/post/comment/${postId}/${commentId}`)
    .then(res =>{
      dispatch({
        type: UPDATE_POST,
        payload: res.data
      })
      dispatch({
        type:BACK_POST,
        payload:res.data
      })
    }
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
