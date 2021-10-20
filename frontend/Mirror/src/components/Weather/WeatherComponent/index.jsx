import React from 'react'
import Wrapper from './styles'
import {Grid, Typography} from '@material-ui/core'

function App(props) {
    let {item, idx} = props
    const day =['일','월','화','수','목','금','토']
    return(
        <Wrapper>
            <Grid container>
                <Grid item md={6}>
                    <Typography className='typography' style={{marginTop: "15px"}}>{item.date.getMonth()+1}/{item.date.getDate()}</Typography>
                    <Typography variant='h5' className='typography' style={{letterSpacing:"-1px", marginTop: "-9px"}}>{day[item.date.getDay()]}</Typography>
                </Grid>
                <Grid item md={6}>
                    <img src={'http://openweathermap.org/img/wn/'+item.weather.icon+'@2x.png'} alt='' id='weather-icon'></img>
                </Grid>
            </Grid>
            {/* <img src={'http://openweathermap.org/img/wn/'+item.weather.icon+'@2x.png'} alt='' id='weather-icon'></img> */}
            {/* <div id='min-max-temp'>
            <span style={{color:'blue'}}>{Math.ceil(item.minTemp)}°</span>/
            <span style={{color:'red'}}>{Math.ceil(item.maxTemp)}°</span>
            </div> */}
            {/* <p>{item.date.getMonth()+1}/{item.date.getDate()}({day[item.date.getDay()]})</p> */}
        </Wrapper>
    );
}
export default App