import { withStyles, TextField} from '@material-ui/core/';

const CssTextField = withStyles({
    root: {
      backgroundColor:'white',
      '& label.Mui-focused': {
        color: '#776D61',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#776D61',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: 'rgb(181,227,216)',
        },
      },
    },
  })(TextField);

  export default CssTextField;