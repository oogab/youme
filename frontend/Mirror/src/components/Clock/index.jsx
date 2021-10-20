import React from 'react';
import Clock from 'react-live-clock';
import moment from 'moment'

function App(){
    const day =['일','월','화','수','목','금','토']
    return(
        <div style={{textAlign:'right'}}>
            <div>
                <Clock className="am" format={'a'} filter={(date)=>{
                    return date==='am'?'오전':'오후'
                }} ticking={true} /*timezone={'KR/Republic'}*//>
                <Clock className="clock" format={'hh:mm'} ticking={true} /*timezone={'KR/Republic'}*//>
                
            </div>
            <div>
                <Clock className="date" format={'YYYY-MM-DD'} ticking={true} filter={(date)=>{
                    let now = moment(date)
                    return (now.month()+1)+'월 ' +now.date()+'일 '+day[now.day()]+'요일'
                }} /*timezone={'KR/Republic'}*//> &nbsp;
            </div>
        </div>
    )
}
export default App