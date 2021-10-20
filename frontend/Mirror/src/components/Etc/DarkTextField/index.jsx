import { withStyles, TextField} from '@material-ui/core/';

const DarkTextField = withStyles({
    root: {
      backgroundColor:'#626970',
      borderRadius:'5px',
      color:'white',
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: 'white',
        },
      },
    },
  })(TextField);

  export default DarkTextField;