import React,{useState, useEffect} from 'react'
import Wrapper from './styles'
import {Grid} from '@material-ui/core'
import {Mic, Stop} from '@material-ui/icons'
import AudioReactRecorder, {RecordState} from 'audio-react-recorder'
import { useSelector, useDispatch } from 'react-redux'
import {CREATE_SPEAKER_ID_REQUEST, ENTROLL_SPEAKER_REQUEST} from '../../../reducers/user'
function App () {
  const {youmeInfo, createSpeakerIdDone} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  let [stage, setStage] = useState(0)
  let [onRecord, setOnRecord] = useState(null)
  let recordedData = null
  const words = ["유미야, 오늘 루틴 알려줘", "지금 날씨 너무 좋다. 산책 가기 딱 좋은 날이야!", "오늘 내가 해야할 일이 있을까?", "내일도 잘부탁해!"]
  const startRecord = () =>{
    setOnRecord(RecordState.START)
  }
  const stopRecord = () =>{
    setOnRecord(RecordState.STOP)
  }

  async function onStop(audioData){
    console.log(audioData)
    
    const data = new FormData()
    
    data.append('file', audioData.blob)
    if(!youmeInfo.connectedSpeaker){
      dispatch({
        type:CREATE_SPEAKER_ID_REQUEST
      })
    }else{
      dispatch({
        type:ENTROLL_SPEAKER_REQUEST,
        data:data,
        profileId:youmeInfo.SpeakerId
      })
    }
  }
  const entroll = () =>{
    console.log(recordedData)
    dispatch({
      type:ENTROLL_SPEAKER_REQUEST,
      profileId: youmeInfo.SpeakerId,
      audio : recordedData
    })
  }
  useEffect(()=>{
    if(createSpeakerIdDone){
      entroll()
    }
  },[createSpeakerIdDone])
  return(
    <Wrapper>
      
      <Grid xs={12} md={6}>
        <AudioReactRecorder state={onRecord} onStop={onStop} />
        {
          onRecord==RecordState.START?<Stop onClick={stopRecord}/>:<Mic onClick={startRecord}/>
        }
      </Grid>
      <Grid xs={12} md={6}>
        <h4>아래 문장을 말해주세요.</h4>
        <h3>{words[stage]}</h3>
      </Grid>
    </Wrapper>
  )
}
export default App;