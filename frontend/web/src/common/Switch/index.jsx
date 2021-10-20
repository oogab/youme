import {Switch} from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
const styles ={
    switchBase:{
        color: '#B5E3D8',
        '&$checked': {
        color: '#B5E3D8',
        },
        '&$checked + $track': {
        backgroundColor: 'rgb(137,221,191)',
        },
    },
    checked: {},
    track: {},
}
export default withStyles(styles)(Switch)