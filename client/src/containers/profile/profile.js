import React,{Component} from 'react';
import Header from './../../components/header/header';
import Post from './../post/post';
import PostDisplay from './../../components/postdisplay/postdisplay';
import {connect} from 'react-redux';
import * as actionCreators from './../../actions/index';
import classes from './profile.css';
import EditProfile from './../editprofile/editprofile';
import mobImg from './../../assets/banner1.jpg';
import Loading from './../../components/loading/loading';
import DummyImg from './../../assets/dummy.png';

class Profile extends Component{

  state={
    profilePostpro:[],
    profileAvatar:"",
    profilePicture:false,
    edit:false,
    editInfo:null,
    profilePic:'',
    preview:false,
    previewUrl:"",
    profileInfo:{
      school:"",
      classof:"",
      dob:"",
      bio:"",
      lives:"",
      email:"",
      facebook:"",
      twitter:"",
      linkedin:""
    },
    test:{},
    coverPicture:false,
    coverPreview:false,
    coverPreviewUrl:""
  }

  componentDidMount(){
    this.props.profilePost()
    this.props.setProfile()
    this.setState({
      profileAvatar:this.props.profile.avatar
    })
  }
  componentWillReceiveProps(props){
    console.log("changed");
    this.setState({
      profilePostpro:props.post.profilePost,
      profileInfo:props.profile.profileInfo?props.profile.profileInfo:this.state.profileInfo
    })
  }


closeEdit=()=>{
  this.setState({edit:false})
}

ProfileImgUpdate=(e)=>{
  this.setState({
    profilePicture:e.target.files[0],
    preview:true,
    previewUrl:URL.createObjectURL(e.target.files[0])
  })
}

CoverImgUpdate=(e)=>{
  this.setState({
    coverPicture:e.target.files[0],
    coverPreview:true,
    coverPreviewUrl:URL.createObjectURL(e.target.files[0])
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

CoverImageSubmit=(e)=>{
  e.preventDefault()
  const data = new FormData()
  data.append('img',this.state.coverPicture);
  data.append('id',this.props.profile._id);
  this.props.updateCoverPicture(data)
  this.setState({coverPicture:null})
}



  render(){
    console.log(this.props.profile.cover?this.props.profile.cover.image:null);
    return(
      <div className={classes.Profile}>
      {this.state.edit?<EditProfile close={this.closeEdit} editbox={this.state.editInfo}/>:null}
      <Header />
      <div className={classes.ProfileBanner}>
      {this.props.profilePicLoading.coverPicLoading?<div className={classes.ProfileCoverLoad}>
      <Loading/></div>:null}
      {this.props.profile.cover?
      this.props.profile.cover.isImage?
      <div className={classes.ProfileCoverImage}>
      <div className={classes.CoverBack} style={{backgroundImage:`url(${this.state.coverPreview?this.state.coverPreviewUrl:this.props.profile.cover.image})`}}></div>
      </div>:
      <div className={classes.DummyCoverImage}
      style={{backgroundImage:`url(${this.state.coverPreview?this.state.coverPreviewUrl:DummyImg})`}}>
      </div>:null}
      <form onSubmit={this.CoverImageSubmit} className={classes.UpdateCoverPicture}>  {this.state.coverPicture?
          <button type="submit" className={classes.UploadCoverButton}>Change</button>:
        <span><input type="file"
          name="file" id="coverPic" onChange={this.CoverImgUpdate}/>
         <label htmlFor="coverPic">Edit</label></span>
        }</form>
      <div className={classes.MobileProfileBanner}>
      <img  src={mobImg} alt=''/>
      </div>
      <div className={classes.Avatar}>
      {this.props.profilePicLoading.profilePicLoading?<div className={classes.AvatarLoading}>
      <Loading/></div>:null}
      <div className={classes.ProfileBackDrop}>
      <form onSubmit={this.ProfileImageSubmit} className={classes.UpdateProfilePicture}>  {this.state.profilePicture?
          <button type="submit" className={classes.UploadImgButton}></button>:
        <span><input type="file"
          name="file" id="avatarFile" onChange={this.ProfileImgUpdate}/>
         <label htmlFor="avatarFile">+</label></span>
        }</form>
      </div>
      <img src={this.state.preview?this.state.previewUrl:this.props.profile.avatar} alt="profile pic"/>
      </div>
      </div>

      <div className={classes.ProfileWrapper}>
      <div className={classes.ProfileNav}></div>


      <div className={classes.ProfileDetails}>

      <div className={classes.SingleProfileDetails}>

      <div className={classes.Edit} onClick={()=>this.setState({edit:true,editInfo:"Basic"})}></div>
      <div className={classes.ProfileName}>
      {this.props.auth.user.name.firstName+" "+this.props.auth.user.name.lastName}
      </div>
      <div className={classes.ProfileIntro}>
      <div className={classes.SchoolIcon}></div>
      <p>{this.state.profileInfo.school}</p>
      </div>
      <div className={classes.ProfileIntro}>
      <div className={classes.BatchIcon}></div>
      {this.state.profileInfo.classof}
       </div>
      <div className={classes.ProfileIntro}>
      <div className={classes.PlaceIcon}></div>
      {this.state.profileInfo.lives}
      </div>

      <div className={classes.ProfileIntro}>
      <div className={classes.FavQuote}>
      {this.state.profileInfo.bio}
      </div>
      </div>
      </div>




      <div className={classes.SingleProfileDetails}>


      <div className={classes.OtherName}>
      <p>Get in touch</p>
      <div className={classes.Edit} onClick={()=>this.setState({edit:true,editInfo:"Contact"})}></div>
      </div>
      <div className={classes.ProfileIntro}>
      <div className={classes.EmailIcon}></div>
      <p>{this.state.profileInfo.email}</p>
      </div>

      <div className={classes.ProfileIntro}>
      <div className={classes.ConnectIcon}></div>
      <p>connect with me</p>
      </div>

      <div className={classes.Follow}>
      <a href={this.state.profileInfo.facebook} target="_blank">
      <div className={classes.FbIcon}></div>
      </a>
      <a href={this.state.profileInfo.twitter} target="_blank">
      <div className={classes.TwitterIcon}></div>
      </a>
      <a href={this.state.profileInfo.linkedin} target="_blank">
      <div className={classes.LinkedIcon}></div>
      </a>
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
  profile:state.profile.profile,
  profilePicLoading:state.profile
})

const mapDispatchToProps=dispatch=>({
  profilePost:()=>{dispatch(actionCreators.profilePost())},
  setProfile:()=>{dispatch(actionCreators.setProfile())},
  deletePost:(id)=>{dispatch(actionCreators.deletePost(id))},
  updateProfilePicture:(data)=>{dispatch(actionCreators.updateProfilePicture(data))},
  updateCoverPicture:(data)=>{dispatch(actionCreators.updateCoverPicture(data))}
})

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
