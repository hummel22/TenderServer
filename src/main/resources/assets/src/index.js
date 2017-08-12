/*
    ./client/index.js
*/
import React from 'react';
import ReactDOM from 'react-dom';
import TransactionForm from './components/TransactionForm.jsx';

//Material - UI
import injectTapEventPlugin from 'react-tap-event-plugin';

//Theme provider for Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


//Wrap React Component with material-ui Theme provider

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueID: 0
    }
    this.reset = this.resetForm.bind(this);
  }
  resetForm() {
    console.log("Updateing ID")
    this.setState((state,props) => {
      return {uniqueID: this.state.uniqueID+1}
    })
  }
  render() {
    return (
      <MuiThemeProvider key={this.state.uniqueID}>
        <TransactionForm  reset={this.reset}/>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(
  <App />,
 document.getElementById('root')
 );
