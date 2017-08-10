/*
    ./client/index.js
*/
import React from 'react';
import ReactDOM from 'react-dom';
import Transaction from './components/Transaction.jsx';

//Material - UI
import injectTapEventPlugin from 'react-tap-event-plugin';

//Theme provider for Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


//Wrap React Component with material-ui Theme provider
const App = () => (
  <MuiThemeProvider>
    <Transaction />
  </MuiThemeProvider>
);


ReactDOM.render(
  <App />,
 document.getElementById('root')
 );
