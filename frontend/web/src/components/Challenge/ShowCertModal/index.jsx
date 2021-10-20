import React, { forwardRef } from 'react'
import { Grid, IconButton, Paper, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment-timezone'

// forwardRef를 써서 warning을 없애긴 했는데 어떤 문제인지 정확히는 모르겠다...
const ShowCertModal = forwardRef((props, ref) => {
  const { info, closeShowCertModal } = props
  const certDate = moment(info.createdAt).tz('Asia/Seoul').format('YYYY-MM-DD')
  const certTime = moment(info.createdAt).tz('Asia/Seoul').format('HH:mm')
  return (
    <div 
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        position: 'absolute',
        maxWidth: 400,
        minWidth: 300,
        backgroundColor: '#E5E3E3',
        border: '1px solid #66A091',
        padding: "15px",
        borderRadius:'10px',
      }}
    >
      <IconButton style={{ position: 'absoulte', float: 'right', color: '#CCCCCC', padding: 0 }} onClick={closeShowCertModal}>
        <CloseIcon />
      </IconButton>
      <Grid container spacing={3}>
        <Grid item xs={12} style={{ textAlign: 'center' }} >
          <img alt={'인증'} src={info.img_addr} style={{ maxWidth: 200, maxHeight: 200 }} />
        </Grid>
        <Grid item xs={12} >
          <Typography style={{ fontFamily: 'SCDream4', fontSize: 15, marginBottom: 5 }} >인증 메모</Typography>
          <Paper style={{padding: '5px'}}>
            <Typography style={{ fontFamily: 'SCDream4', fontSize: 13 }} >{info.content}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} style={{padding: '12px'}} >
          <Typography style={{ fontFamily: 'SCDream4', fontSize: 15, marginBottom: 5 }} >인증 시간</Typography>
          <Paper style={{padding: '5px'}}>
            <Typography style={{ fontFamily: 'SCDream4', fontSize: 13 }} >{certDate} {certTime}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
})

export default ShowCertModal