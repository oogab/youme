import React,{useState,useEffect}  from 'react';
import Layout from '../../layout';
import Wrapper from './styles';
import socketIOClient from "socket.io-client";
import TurtlebotSetting from '../../components/YoumeSetting/TurtlebotSetting'

const socket = socketIOClient("http://localhost:8000/")
function App () {
  

  useEffect(()=>{
    socket.emit("roomjoin", "react");
  })

  const send =(msg)=>{
    socket.emit("turtlebot", msg)
  }
  return(
    <Wrapper>
      <Layout>
        <div className='menu daily-menu'><h3>YOUME 연결</h3></div>
        <hr/>
        <button onClick={()=>{send("start")}}>시작</button>
        <button onClick={()=>{send("stop")}}>중지</button>
        <TurtlebotSetting/>
      </Layout>
    </Wrapper>
  )
}
export default App;