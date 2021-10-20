import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import myStyle from './styles.json'
const useStyles = makeStyles(() => (myStyle));
function App(props){
    const classes = useStyles();
    return(
        <div style={!props.clicked?{backgroundColor:'white'}:{backgroundColor:'#B5E3D8'}} onClick={props.onClick} className={classes.dayDiv+' btn'}>
            {props.dayName}
        </div>
    );
}
export default App;