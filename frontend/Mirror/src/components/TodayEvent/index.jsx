import React from 'react'
import moment from 'moment';
import {ListItem, Checkbox }from '@material-ui/core/';

const TodayEvent = (props) => {

    const eventStartDay = props.event.start 
    const eventStartTime = moment(eventStartDay).format('HH:mm')
    const bool = props.event.allDay
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
    
    return(
        <>
            <ListItem style={{whiteSpace: 'nowrap', marginLeft:'-25px'}}>
               <Checkbox
                   checked={checked}
                   onChange={handleChange}
                   inputProps={{ 'aria-label': 'primary checkbox' }}
                   style={{marginRight: '10px', color:'white'}}
                   color="white"
                   />
               {
                   bool ? null : <h5 style={{color:'white'}}>({eventStartTime}) &nbsp;</h5> 
               }
               
                <h4 style={{color:'white'}}>{props.event.title}</h4>
              
           </ListItem>
            <hr color='white' style={{width:'92%', float:'right', marginTop:'-10px'}}/>
 
        </>
    )
}


export default TodayEvent