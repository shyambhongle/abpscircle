import React from 'react';
import classes from './onlineFriend.css';
import {connect} from 'react-redux';
import * as actionCreators from './../../actions/index';

export const OnlineFriends=(props)=>{
  let myOnline;
  const messageHandler=({name,id,avatar})=>{
    let data={
      name,
      avatar,
      id
    }

    props.openMsg(data);
  }
  if (props.onlineFriends.length>0) {
    myOnline=props.onlineFriends.map((user,i)=>{
      return <div className={classes.SingleOnline} key={i}
      onClick={()=>{messageHandler(user)}}>
      <span className={classes.Green}></span>
      <img src={user.avatar} alt=''/>
      <div className={classes.Username}>{user.name}</div>
      </div>;
    })  }else {
      myOnline=<div className={classes.SingleOnline}>
      <div className={classes.NoFriends}>No friends online</div>
      </div>
    }

  return (
    <div className={classes.OnlineFriends}>
    <div className={classes.HeaderOnline}>
     Friends online</div>
    <div className={classes.OnlineBody}>
    {myOnline}
    </div>
    </div>
  );
}

const mapStateToProps=state=>({
  onlineFriends:state.search.onlinefriends
})

const mapDispatchToProps=dispatch=>({
  openMsg:(data)=>{dispatch(actionCreators.openMsgBox(data))},
})

export default connect(mapStateToProps,mapDispatchToProps)(OnlineFriends);
