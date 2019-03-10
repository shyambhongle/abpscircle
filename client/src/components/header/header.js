import React,{Component} from 'react';
import classes from './header.css';
import {connect} from 'react-redux';
import * as actionCreators from './../../actions/index';
import {Link,withRouter} from 'react-router-dom';





class Header extends Component{

state={
  inputShow:false
}






inputShowToogle=(e)=>{
  if (e.target.value.length>2) {
    this.setState({inputShow:true})
  }else{
    this.setState({inputShow:false})
  }
}

inputClick=(id)=>{
  this.props.searchProfile(id,this.props.history)
}



acceptRequest=(id,name)=>{
  let data={
    id,
    name
  }
  console.log(data);
  this.props.acceptRequest(data)
}


render(){
  let searchInputList=this.props.search.map(profile=>{
    return <li key={profile.id} onClick={()=>{this.inputClick(profile.id)}}>{profile.friend}</li>;
  })

if (this.props.profile.friendRequest!==undefined) {
  var request=this.props.profile.friendRequest.map((req,i)=>{
    return(<div key={i}>
      <li>{req.name.firstName}</li>
      <button onClick={()=>{this.acceptRequest(req.id,req.name.firstName)}}>yo</button>
    </div>);
})
}

  return (
    <div className={classes.Header} >
    <div className={classes.HeaderWrapper}>

    <Link style={{textDecoration:'none'}} to="/">
    <div className={classes.CompanyName}>
    <div className={classes.CompanyCircle}></div>
    <div className={classes.Divider}></div>
    <div className={classes.CompanyTitle}>ABPS circle</div>
    </div></Link>

    <div className={classes.SearchBox}>
    <input type="text" placeholder="search"
     onChange={(e)=>{this.props.searchInput(e); this.inputShowToogle(e)}}/>
     {
       this.state.inputShow?<div className={classes.SearchContainer}>
          <span className={classes.SearchArrow}></span>
          {
            this.props.search.length>0?searchInputList:<li>No User Found</li>
          }
          </div>:null
     }

    </div>

    <div className={classes.IconTray}>
    <div className={classes.RequestIcon}></div>
    <div className={classes.MessageIcon}></div>
    <div className={classes.NotificationIcon}></div>
    </div>

    <Link style={{textDecoration:'none'}} to="/profile"><div className={classes.ProfileIcon}>
    <div className={classes.Avatar}>
    <img src={this.props.auth.user.avatar} alt="Profile"/>
    </div>
    <div className={classes.UserName}>{this.props.auth.user.name.firstName}</div>
    </div></Link>


    <div className={classes.SettingContainer}>
    <div className={classes.SettingIcon}></div>
    <div className={classes.SettingBox}>
    <div className={classes.some}>setting</div>
    <div className={classes.LogoutTray} onClick={()=>{this.props.logoutUser(this.props.history)}}>logout</div>
    </div>
    </div>




    <div className={classes.NotificsationIcon}>
    <div className={classes.Notification}>{request}
    </div>
    </div>



    </div>
    </div>
  );
}

}


const mapStateToProps=state=>({
  auth:state.auth,
  search:state.search.searchList,
  profile:state.profile.profile
})



const mapDispatchToProps=dispatch=>({
  logoutUser:(history)=>{dispatch(actionCreators.logoutUser(history))},
  searchInput:(e)=>{dispatch(actionCreators.searchPerson(e))},
  searchProfile:(id,history)=>{dispatch(actionCreators.searchProfile(id,history))},
  acceptRequest:(data)=>{dispatch(actionCreators.acceptRequest(data))}
})


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Header));
