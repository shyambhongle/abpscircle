import React,{Component} from 'react';
import Header from './../../components/header/header';
import Post from './../post/post';
import PostDisplay from './../../components/postdisplay/postdisplay';
import {connect} from 'react-redux';
import * as actionCreators from './../../actions/index';
import classes from './profile.css';

class Profile extends Component{

  state={
    profilePostpro:[],
    profilePicture:false
  }

  componentDidMount(){
    this.props.profilePost()
    this.props.setProfile()
  }


ProfileImgUpdate=(e)=>{
  this.setState({
    profilePicture:e.target.files[0]
  })
}

ProfileImageSubmit=(e)=>{
  e.preventDefault()
  const data = new FormData()
  data.append('img',this.state.profilePicture);
  data.append('id',this.props.profile._id);
  this.props.updateProfilePicture(data)
  this.setState({profilePicture:null})
}



componentWillReceiveProps(props){
  this.setState({
    profilePostpro:props.post.profilePost
  })
}


  render(){
    return(
      <div >
      <Header/>

      <div className={classes.ProfileBanner}>
      <div className={classes.ProfileCoverImage}></div>
      <div className={classes.Avatar}>
      <div className={classes.ProfileBackDrop}>
      <form onSubmit={this.ProfileImageSubmit} className={classes.UpdateProfilePicture}>  {this.state.profilePicture?
          <button type="submit" className={classes.UploadImgButton}></button>:
        <span><input type="file"
          name="file" id="file" onChange={this.ProfileImgUpdate}/>
         <label htmlFor="file">+</label></span>
        }</form>
      </div>
      <img src={this.props.profile.avatar} alt="profile pic"/>
      </div>
      </div>

      <div className={classes.ProfileWrapper}>
      <div className={classes.ProfileNav}></div>


      <div className={classes.ProfileDetails}>
      <div className={classes.ProfileName}>
      {this.props.auth.user.name.firstName+" "+this.props.auth.user.name.lastName}
      </div>
      <div className={classes.ProfileIntro}>
      <div className={classes.SchoolIcon}></div>
      <p>Studied at Aditya Birla Public School,Awarpur</p>
      </div>
      <div className={classes.ProfileIntro}>
      <div className={classes.BatchIcon}></div>
      class of 2015
       </div>
      <div className={classes.ProfileIntro}>
      <div className={classes.PlaceIcon}></div>
      Lives in Pune
      </div>

      <div className={classes.ProfileIntro}>
      <div className={classes.FavQuote}>
      "Be the captain of your journey!!"
      <p>-Rabindranath Tagore</p>
      </div>
      </div>

      </div>

      <div className={classes.PostRelated}>
      <div className={classes.ProfilePost}>
      <Post/>
      </div>
      <div className={classes.DisplayPost}>
      <PostDisplay data={this.state.profilePostpro} delete={this.props.deletePost}/>
      </div>
      </div>


      </div>

      </div>
    );
  }
}

const mapStateToProps=state=>({
  auth:state.auth,
  post:state.post,
  profile:state.profile.profile
})

const mapDispatchToProps=dispatch=>({
  profilePost:()=>{dispatch(actionCreators.profilePost())},
  setProfile:()=>{dispatch(actionCreators.setProfile())},
  deletePost:(id)=>{dispatch(actionCreators.deletePost(id))},
  updateProfilePicture:(data)=>{dispatch(actionCreators.updateProfilePicture(data))}
})

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
