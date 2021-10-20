import React, {useState, useEffect, useCallback, useRef} from 'react';
import 'date-fns';
import {
  makeStyles,
  withStyles,
  Grid,
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
  Radio,
  RadioGroup,
  Button,
  FormHelperText
} from '@material-ui/core/';

import { teal } from '@material-ui/core/colors';
import moment from 'moment';
import Wrapper from './styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ko from "date-fns/locale/ko"
import { categories } from '../../../config/config';
import { ColorButton } from '../../../common/Buttons'

import { useDispatch, useSelector } from 'react-redux';
import { ADD_CHALLENGE_REQUEST, CLEAR_ADD_CHALLENGE_DONE, CLEAR_IMAGE_PATH, UPLOAD_CHALLENGE_IMAGE_REQUEST } from '../../../reducers/challenge';
import { useHistory } from 'react-router-dom';
import { OPEN_CONFIRM_MODAL } from '../../../reducers/modal';

/* ************************ Main Component Start ************************ */
const CreateChallenge = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles();
  const imageInput = useRef()
  const { challengeImagePath, addChallengeDone, addChallengeError } = useSelector((state) => state.challenge)
  const [submitDisable, setSubmitDisable] = useState(true)
  
  // 챌린지 이름
  const [name, setName] = useState('')
  const onChangeName = useCallback((e) => {
    setName(e.target.value)
  }, [])
  
  // 챌린지 카테고리 => 이름 바꾸자
  const [subject, setSubject] = useState('')
  const onChangeSubject = useCallback((e) => {
    setSubject(e.target.value)
  }, [])

  const [certCycle, setCertCycle] = useState('1')
  const onChangeCertCycle = useCallback((e) => {
    setCertCycle(e.target.value)
  }, [])
  
  // 챌린지 시작 Date
  const [startDate, setStartDate] = useState(moment().startOf('day'));
  
  // 챌린지 종료 Date
  const [endDate, setEndDate] = useState(startDate);
  
  // 챌린지 설정 가능 최대 Date
  const [maxDate, setMaxDate] = useState(null)
  
  // 챌린지 기간 startDate ~ endDate
  const [period, setPeriod] = useState(0)
  
  // 챌린지 도전 최대 기간 설정
  useEffect(() => {
    const d = new Date(startDate.valueOf()+(1000*60*60*24*365))
    setMaxDate(d)
  }, [startDate])

  // 처음 입장하자 마자 이미지 패스 초기화
  useEffect(() => {
    dispatch({
      type: CLEAR_IMAGE_PATH,
    })
  }, [])

  // 총 인증 일 수
  /**
   * 매일 => period
   * 평일 매일 => 시작일 ~ 종료일 사이의 평일의 수 / 없으면 Error
   * 주말 매일 => 시작일 ~ 종료일 사이의 주말의 수 / 없으면 Error
   * 주 6일 => period*(6/7)
   * 주 5일 => period*(5/7)
   * 주 4일 => period*(4/7)
   * 주 3일 => period*(3/7)
   * 주 2일 => period*(2/7)
   * 주 1일 => period*(1/7)
   */
  const [totalNumOfCert, setTotalNumOfCert] = useState(0)
  const [totalCertError, setTotalCertError] = useState(false)

  // 시작일과 종료일 사이 평일의 수
  const getWeekdayNum = () => {
    const tempDate = new Date(startDate.getTime())
    let count = 0
    while (true) {
      if (tempDate.getTime() >= endDate.getTime()) {
        return count
      } else {
        let temp = tempDate.getDay()
        if (temp !== 0 && temp !== 6) {
          count++
        }
      }
      tempDate.setDate(tempDate.getDate()+1)
    }
  }

  // 시작일과 종료일 사이 주말의 수
  const getWeekendNum = () => {
    const tempDate = new Date(startDate.getTime())
    let count = 0
    while (true) {
      if (tempDate.getTime() >= endDate.getTime()) {
        return count
      } else {
        let temp = tempDate.getDay()
        if (temp === 0 || temp === 6) {
          count++
        }
      }
      tempDate.setDate(tempDate.getDate()+1)
    }
  }

  // 인증 기간 주 선택
  const [selectWeek, setSelectWeek] = useState(0)
  const onChangeSelectWeek = useCallback((e) => {
    if (e.target.value === '5') {
      setSelectWeek(e.target.value)
      setWeek(e.target.value*1)
    } else {
      setSelectWeek(e.target.value)
      setWeek(e.target.value*1)
    }
  }, [])

  const [week, setWeek] = useState(0)
  const [weekError, setWeekError] = useState(false)
  const onChangeWeek = useCallback((e) => {
    if (isNaN(e.target.value)) {
      setWeekError(true)
    } else {
      setWeek(e.target.value)
      if (e.target.value > 52 || e.target.value < 5) {
        setWeekError(true)
      } else {
        setWeekError(false)
      }
    }
  }, [])

  // 인증 가능 요일 설정
  const [activeWeekDay, setActiveWeekDay] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true
  })
  const onChangeActiveWeekDay = (e) => {
    setActiveWeekDay({ ...activeWeekDay, [e.target.name]: e.target.checked })
  }
  const { mon, tue, wed, thu, fri, sat, sun } = activeWeekDay
  const activeWeekError = certCycle <= 3 ? false : [mon, tue, wed, thu, fri, sat, sun].filter((v) => v).length < (10 - certCycle)

  // 아 로직 작성한다고 디지는 줄 알았네...
  useEffect(() => {
    if (certCycle*1 <= 3) {
      setPeriod(Math.ceil((endDate - startDate) / (1000*60*60*24)))
    } else {
      setPeriod(week*7)
    }
  }, [certCycle, week, startDate, endDate])

  useEffect(() => {
    if (certCycle*1 <= 3) {
      if (certCycle*1 === 1) {
        setTotalCertError(false)
        setTotalNumOfCert(period)
        setActiveWeekDay({
          mon: true,
          tue: true,
          wed: true,
          thu: true,
          fri: true,
          sat: true,
          sun: true
        })
      } else if (certCycle*1 === 2) {
        const result = getWeekdayNum()
        if (result === 0) setTotalCertError(true)
        else setTotalCertError(false)
        setTotalNumOfCert(result)
        setActiveWeekDay({
          mon: true,
          tue: true,
          wed: true,
          thu: true,
          fri: true,
          sat: false,
          sun: false,
        })
      } else if (certCycle*1 === 3) {
        const result = getWeekendNum()
        if (result === 0) setTotalCertError(true)
        else setTotalCertError(false)
        setTotalNumOfCert(result)
        setActiveWeekDay({
          mon: false,
          tue: false,
          wed: false,
          thu: false,
          fri: false,
          sat: true,
          sun: true,
        })
      }
    } else {
      const tempEnd = new Date(startDate.valueOf() + period*1000*60*60*24)
      setEndDate(tempEnd)
      setTotalNumOfCert(period*(10-certCycle)/7)
    }
  }, [period, certCycle, startDate])

  // 총 인증 일 수 확인...
  // useEffect(() => {
  //   console.log(totalNumOfCert)
  // }, [totalNumOfCert])

  // 인증 가능 시간 모드 선택 (24시간, 사용자 설정)
  const [certTimeMode, setCertTimeMode] = useState('1')
  const onChangeCertTimeMode = useCallback((e) => {
    setCertTimeMode(e.target.value)
  }, [])

  // 인증 가능 시작 시간 설정
  const [certStartTime, setCertStartTime] = useState('00:00')
  const onChangeCertStartTime = useCallback((e) => {
    setCertStartTime(e.target.value)
  }, [])

  // 인증 가능 종료 시간 설정
  const [certEndTime, setCertEndTime] = useState('00:00')
  const onChangeCertEndTime = useCallback((e) => {
    setCertEndTime(e.target.value)
  }, [])

  const certTimeError = certTimeMode === '1' ? false : certStartTime > certEndTime

  useEffect(() => {
    if (certTimeMode === '1') {
      setCertStartTime('00:00')
      setCertEndTime('00:00')
    }
  }, [certTimeMode])

  // 챌린지 소개 내용
  const [content, setIntroduce] = useState('')
  const onChangeIntroduce = useCallback((e) => {
    setIntroduce(e.target.value)
  }, [])

  useEffect(() => {
    if (name === '' || subject === '' || challengeImagePath === '' || content === '' || startDate === '' || endDate === '' || period <= 0 || totalNumOfCert <= 0 || certStartTime === '' || certEndTime === '' || activeWeekError || weekError || certTimeError || totalCertError) {
      setSubmitDisable(true)
    }
    if (name !== '' && subject !== '' && challengeImagePath !== '' && content !== '' && startDate !== '' && endDate !== '' && period !== 0 && totalNumOfCert !== 0 && certStartTime !== '' && certEndTime !== '' && !activeWeekError && !weekError && !certTimeError && !totalCertError) {
      setSubmitDisable(false)
    }
  }, [name, subject, challengeImagePath, content, startDate, endDate, period, totalNumOfCert, certStartTime, certEndTime])
  
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current])

  const onChangeImage = useCallback((e) => {
    console.log('image', e.target.files[0])

    const imageFormData = new FormData()
    imageFormData.append('image', e.target.files[0])

    dispatch({
      type: UPLOAD_CHALLENGE_IMAGE_REQUEST,
      data: imageFormData
    })
  }, [])
  
  const onSubmit = useCallback((e) => {
    e.preventDefault()

    dispatch({
      type: ADD_CHALLENGE_REQUEST,
      data:{
        name: name,
        img_addr: challengeImagePath,
        content: content,
        start_date: startDate,
        end_date: endDate,
        period: period,
        certification_cycle: certCycle,
        total_number_of_certification: totalNumOfCert,
        cert_available: {
          cert_available_start_time: certStartTime,
          cert_available_end_time: certEndTime
        },
        cert_day: [
          {data: mon},
          {data: tue},
          {data: wed},
          {data: thu},
          {data: fri},
          {data: sat},
          {data: sun}
        ],
        CategoryId: subject*1
      }
    })
  }, [name, subject, challengeImagePath, content, startDate, endDate, period, certCycle, totalNumOfCert, certStartTime, certEndTime,
    mon, tue, wed, thu, fri, sat, sun, categories]);

  useEffect(() => {
    if (addChallengeDone) {
      dispatch({
        type: OPEN_CONFIRM_MODAL,
        message: '챌린지를 생성하였습니다!'
      })
      dispatch({
        type: CLEAR_ADD_CHALLENGE_DONE
      })
      history.push('/Home')
    }
    if (addChallengeError) {
      dispatch({
        type: OPEN_CONFIRM_MODAL,
        message: addChallengeError
      })
    }
  }, [addChallengeDone, addChallengeError])

  const onCancel = useCallback(() => {
    history.push('/ChallengeHome')
  }, [])

  return (
    <Wrapper>
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} className="titleGrid">
            <h1>챌린지 생성</h1>
          </Grid>
          {/* ************************ 챌린지 이름 ************************* */}
          <Grid item xs={10}>
            <h3>1. 개설하려는 챌린지에 이름을 붙여주세요!</h3>
            <TealColor
              fullWidth
              id="standard-full-width"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              onChange={onChangeName}
              placeholder="ex. 1일 1커밋"
              value={name}
            />
          </Grid>
          {/* ************************ 챌린지 분류 ************************* */}
          <Grid item xs={12}>
            <h3>2. 어떤 주제와 관련이 있나요?</h3>
            <FormControl component="fieldset" style={{ margin: '10px'}}>
              <RadioGroup name="주제" value={subject} onChange={onChangeSubject}>
                {
                  categories.map((e, i)=>{
                    return  <FormControlLabel key={i} value={e.name} control={<TealRadio />} label={e.label} />
                  })
                }
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* ************************ 챌린지 주기 ************************* */}
          <Grid item xs={12}>
            <h3>3. 얼마나 자주 할건가요?</h3>
            <FormControl component="fieldset" style={{ margin: '10px'}}>
              <RadioGroup name="주제" value={certCycle} onChange={onChangeCertCycle}>
                <FormControlLabel value="1" control={<TealRadio />} label="매일" />
                <FormControlLabel value="2" control={<TealRadio />} label="평일 매일" />
                <FormControlLabel value="3" control={<TealRadio />} label="주말 매일" />
                <FormControlLabel value="4" control={<TealRadio />} label="주 6일" />
                <FormControlLabel value="5" control={<TealRadio />} label="주 5일" />
                <FormControlLabel value="6" control={<TealRadio />} label="주 4일" />
                <FormControlLabel value="7" control={<TealRadio />} label="주 3일" />
                <FormControlLabel value="8" control={<TealRadio />} label="주 2일" />
                <FormControlLabel value="9" control={<TealRadio />} label="주 1일" />
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* ************************ 챌린지 기간 ************************* */}        
          <Grid item xs={12}>
            <h3>4. 얼마동안 할건가요?</h3>
          </Grid>
          {certCycle <= 3
            ? (
            <>
              {/* 여기 최적화 할 수 있음! 시작일 달력은 공통 부분, 종료일 달력만 좀 다르다! */}
              <Grid item xs={12} sm={6} md={3}>
                <h3 className="dateTitle">시작일</h3>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    format="yyyy/MM/dd"
                    invalidDateMessage="날짜 형식에 맞게 입력해주세요!"
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    locale={ko}
                    margin="normal"
                    minDate={Date.now()}
                    onChange={date => setStartDate(date)}
                    selected={startDate}
                    value={startDate}
                    variant="inline"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <h3 className="dateTitle">종료일</h3>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    format="yyyy/MM/dd"
                    invalidDateMessage="날짜 형식에 맞게 입력해주세요!"
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    locale={ko}
                    margin="normal"
                    maxDate={maxDate}
                    maxDateMessage="챌린지 기한은 1년을 넘길 수 없습니다."
                    minDate={startDate}
                    minDateMessage="시작일 보다 이전 일을 선택할 수 없습니다."
                    onChange={date => setEndDate(date)}
                    selected={startDate}
                    value={endDate}
                    variant="inline"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <h2 >도전 기간 {period ? period : 0} 일</h2>
                <h2>필수 인증 {totalNumOfCert ? totalNumOfCert : 0} 일</h2>
                {
                  totalCertError ? <FormHelperText error={totalCertError}>필수 인증 일은 0일 수 없습니다!</FormHelperText> : null
                }
              </Grid>
            </>
            )
            : (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <h3 className="dateTitle">시작일</h3>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy/MM/dd"
                    margin="normal"
                    value={startDate}
                    onChange={date => setStartDate(date)}
                    selected={startDate}
                    minDate={Date.now()}
                    locale={ko}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <h3 className="dateTitle">종료일</h3>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy/MM/dd"
                    margin="normal"
                    value={endDate}
                    maxDate={maxDate}
                    maxDateMessage="챌린지 기한은 1년을 넘길 수 없습니다."
                    locale={ko}
                    disabled
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant='h5' >도전 기간 {period ? period : 0} 일</Typography>
                <Typography variant='h5' >필수 인증 {totalNumOfCert ? totalNumOfCert : 0} 일</Typography>
                {
                  totalCertError ? <FormHelperText error={totalCertError}>필수 인증 일은 0일 수 없습니다!</FormHelperText> : null
                }
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" style={{ margin: '10px'}}>
                  <RadioGroup name="주제" value={selectWeek} onChange={onChangeSelectWeek}>
                    <FormControlLabel value="1" control={<TealRadio />} label="1주" />
                    <FormControlLabel value="2" control={<TealRadio />} label="2주" />
                    <FormControlLabel value="3" control={<TealRadio />} label="3주" />
                    <FormControlLabel value="4" control={<TealRadio />} label="4주" />
                    <FormControlLabel value="5" control={<TealRadio />} label="기타" />
                    {
                      selectWeek === '5'
                        ? 
                        <>
                          <TealColor
                            InputProps={{
                              inputProps: { min: 5, max: 52 }
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="normal"
                            onChange={onChangeWeek}
                            type="number"
                            value={week}
                          />
                          <FormHelperText error={weekError} >
                            5~52주 범위로 설정할 수 있습니다!
                          </FormHelperText>
                        </>
                        : null
                    }
                  </RadioGroup>
                </FormControl>
              </Grid>
            </>
            )
          }
          {/* ************************ 챌린지 인증 가능 요일 ************************* */}
          {
            certCycle >= 4
              ?
              <Grid item xs={12}>
                <h3>+ 어떤 요일에 인증이 가능한가요?</h3>
                <FormControl error={activeWeekError} component="fieldset" style={{ margin: '10px'}}>
                  <FormGroup>
                    <FormControlLabel control={<GreenCheckbox checked={mon} onChange={onChangeActiveWeekDay} name="mon"/>} label="월" />
                    <FormControlLabel control={<GreenCheckbox checked={tue} onChange={onChangeActiveWeekDay} name="tue"/>} label="화" />
                    <FormControlLabel control={<GreenCheckbox checked={wed} onChange={onChangeActiveWeekDay} name="wed"/>} label="수" />
                    <FormControlLabel control={<GreenCheckbox checked={thu} onChange={onChangeActiveWeekDay} name="thu"/>} label="목" />
                    <FormControlLabel control={<GreenCheckbox checked={fri} onChange={onChangeActiveWeekDay} name="fri"/>} label="금" />
                    <FormControlLabel control={<GreenCheckbox checked={sat} onChange={onChangeActiveWeekDay} name="sat"/>} label="토" />
                    <FormControlLabel control={<GreenCheckbox checked={sun} onChange={onChangeActiveWeekDay} name="sun"/>} label="일" />
                    {
                      activeWeekError
                        ? <FormHelperText>최소 인증 일 수 보다 요일 수를 적게 고를 수 없습니다!</FormHelperText>
                        : null
                    }
                  </FormGroup>
                </FormControl>
              </Grid>
              : null
          }
          {/* ************************ 챌린지 인증 가능 시간 ************************* */}
          <Grid item xs={12}>
            <h3>5. 언제 인증이 가능한가요?</h3>
            <FormControl className={classes.formControl} style={{ margin: '10px'}}>
              <RadioGroup value={certTimeMode} onChange={onChangeCertTimeMode}>
                <FormControlLabel value="1" control={<TealRadio />} label="24시간" />
                <FormControlLabel value="2" control={<TealRadio />} label="시간 선택" />
              </RadioGroup>
            </FormControl>
          </Grid>
          {
            certTimeMode === '2'
              ?
              <>
                <Grid item xs={12} sm={6} md={3} >
                  <TextField
                    className={classes.textField}
                    id="time"
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="시작"
                    onChange={onChangeCertStartTime}
                    style={{ padding: '10px 0' }}
                    type="time"
                    value={certStartTime}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                  <TextField
                    className={classes.textField}
                    id="time"
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="종료"
                    onChange={onChangeCertEndTime}
                    style={{ padding: '10px 0' }}
                    type="time"
                    value={certEndTime}
                  />
                  <FormHelperText error={certTimeError}>시작 시간을 종료 시간 이전으로 선택해주세요!</FormHelperText>
                </Grid>
              </>
              : null
          }
          {/* ************************ 챌린지 소개 ************************* */}
          <Grid item xs={12} >
            <h3>6. 챌린지를 소개해 주세요!</h3>
          </Grid>
          <Grid item xs={12} sm={3} >
            <ColorButton fullWidth variant="contained" onClick={onClickImageUpload}>챌린지 대표 사진 업로드</ColorButton>
          </Grid>
          <Grid item xs={12} sm={3} >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img accept="image/*" src={challengeImagePath ? challengeImagePath : "/images/camera.png"} style={{ maxHeight: '150px', maxWidth: '150px' }} />
            </div>
            <input type="file" name="image" hidden ref={imageInput} onChange={onChangeImage} />
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField
              id="outlined-multiline-static"
              multiline
              fullWidth
              value={content}
              rows={4}
              variant="outlined"
              onChange={onChangeIntroduce}
            />
          </Grid>
          {/* ************************ 챌린지 개설 완료ㅆㅃ!!! ************************* */}
          <Grid item xs={12} style={{ margin: '20px 0'}}>
            <ColorButton variant="contained" type="submit" disabled={submitDisable} >개설하고 멋있게 도전하기!</ColorButton>
            <Button variant="contained" onClick={onCancel} style={{ margin: '0 10px' }} >취소</Button>
          </Grid>
        </Grid>
      </form>
    </Wrapper>
  );
}

/* ************************ Style Section Start ************************ */

const GreenCheckbox = withStyles({
  root: {
    color: teal[400],
    '&$checked': {
      color: teal[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const TealRadio = withStyles({
  root: {
    color: teal[400],
    '&$checked': {
      color: teal[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

const TealColor = withStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: 'teal',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'teal',
    },     
  },    
}))(TextField)

export default CreateChallenge