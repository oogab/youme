// react
import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

// ui
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
//redux
import { Provider } from 'react-redux';

// import store from './redux';
import store from './store/configureStore'

// page
import Main from './pages/Main';
import Auth from './pages/Auth'

// css
import './index.css';

/// theme
const theme = createTheme({
  typography: {
    fontFamily: ['Noto Sans KR'].join(','),
    button: {
      fontFamily: 'Noto Sans KR',
    },
    body1: {
      fontWeight: 500,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: 'black',
          color:'white'
        },
      },
    },
  },
});

// app
const App = () => {
 
  return (
    <Provider store = {store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Auth} />
            <Route exact path="/Home" component={Main} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
