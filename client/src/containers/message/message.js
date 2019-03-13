import React,{Component} from 'react';
import classes from './message.css';
import {connect} from 'react-redux';
import * as actionCreators from './../../actions/index.js';


class Message extends Component{

state={
  text:''
}


inputHandler=(e)=>{
    this.setState({
      text:e.target.value
    })
}

sendHandler=()=>{
  let data={
      id:this.props.msg.id,
      name:this.props.fullName,
      text:this.state.text
  }
  this.props.sendMessage(data)
  this.setState({
    text:""
  })
}


render(){
  console.log(this.state.text);
  let userMsg;
  if (this.props.msg.userMessages.length>0) {
    userMsg=this.props.msg.userMessages.map((sing,i)=>{
      return <div className={sing.userName!==this.props.msg.name?
        classes.IndvLeft:classes.IndvRight}>
            <img className={classes.ChatAvatar} src={sing.userName==this.props.msg.name?this.props.msg.avatar:this.props.auth.user.avatar} alt=''/>
            <div className={classes.ChatMsg}>{sing.msg}</div>
            </div>
    })
  }
  return(
    <div className={classes.MessageBox} style={{display:this.props.msg.MsgBox?null:'none'}}>
    <div className={classes.HeaderMsg}>
    <img className={classes.HeaderAvatar}
    src={this.props.msg.avatar} alt=""/>
    <div className={classes.HeaderNameMsg}>{this.props.msg.name}</div>
    </div>
    <div className={classes.BodyMsg}>{userMsg}</div>
    <form className={classes.MsgInputBox}>
    <input type="text" value={this.state.text}
     onChange={this.inputHandler} placeholder="write here..."/>
    <div className={classes.ButtonSend}
    onClick={()=>{this.sendHandler()}}></div>
    </form>
    </div>
  )
}
}



const mapStateToProps=state=>({
  auth:state.auth,
  msg:state.msg
})

const mapDispatchToProps=dispatch=>({
  sendMessage:(data)=>{dispatch(actionCreators.newMessage(data))}
})

export default connect(mapStateToProps,mapDispatchToProps)(Message);
