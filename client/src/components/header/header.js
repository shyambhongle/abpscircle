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
      <li>{req.name}</li>
      <button onClick={()=>{this.acceptRequest(req.id,req.name)}}>yo</button>
    </div>);
})
}

  return (
    <div className={classes.Header}>
    <div className={classes.HeaderWrapper}>
    <div className={classes.CompanyName}>ABPS Circle</div>

    <div className={classes.SearchBox}>
    <input type="text" placeholder="search"
     onChange={(e)=>{this.props.searchInput(e); this.inputShowToogle(e)}}/>

     {
       this.state.inputShow?<div className={classes.SearchContainer}>
          {
            this.props.search.length>0?searchInputList:<li>No User Found</li>
          }
          </div>:null
     }

    </div>
    <div className={classes.NotificationIcon}>
    <div className={classes.Notification}>{request}
    </div>
    </div>
    <button className={classes.Logout} onClick={()=>{this.props.logoutUser(this.props.history)}}>Logout</button>
    <Link to={this.props.match.path==="/profile"?"/":"/profile"}><button className={classes.ProfileButton}>{
      this.props.match.path==="/profile"?"Home":"Profile"
    }</button></Link>

    </div>
    </div>
  );
}

}


const mapStateToProps=state=>({
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
