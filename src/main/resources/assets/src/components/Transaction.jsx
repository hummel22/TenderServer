import React from 'react';
import Entry from './Entry.jsx';


export default class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionData: {
        name: "",
        date: "",
        nickname: "",
        location: "",
        town: ""},
      transactionID: null,
      numberOfEntries: 0,
      entries: {}
    };
    this.handleAddEntry = this.handleAddEntry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEntryEvent = this.handleEntryEvent.bind(this)
  }

  handleAddEntry()  {
    console.log("Adding Entry")
    this.setState((state,props) => {
    var entriesUpdate = state.numberOfEntries + 1;
      return {
        numberOfEntries: entriesUpdate,
        entries: Object.assign(state.entries, {[entriesUpdate]:{}})
      }
    });
  }

  handleChange(key, ev) {
    ev.persist()
    this.setState((state,props) => {
      return {transactionData: Object.assign(state.transactionData, {[key]: ev.target.value})}
    })
  }

  handleEntryEvent(id, ev) {
    ev.persist();
    var key = ev.target.name;
    this.setState((state,props) => {
      var updateKey = {[key]: ev.target.value};
      var updateEntry = Object.assign(state.entries[id], updateKey)
      var entriesUpdate = { [id]: updateEntry }
      return {
        entries: entriesUpdate
      }
    })
  }

  handleSubmit() {
    console.log(this.state);
    //Verify Transaction
    //Verify entries
      //Convert Tags to Array
    //throw erroes

    //Send Transaction
      //Get transaction ID
    //for loop
      //send entries with ID
    //Show succes or not
  }

  render() {
    var entries = []
    for(var i = 0; i < this.state.numberOfEntries; i++) {
      entries.push(<Entry key={i+1} entryChange={this.handleEntryEvent} id={i+1}/>)
    }
    return (
      <div>
      <form>
        <div className="horizontal">

          <div className="form-group">
            <label>Name:</label>
            <input type="text" onChange={this.handleChange.bind(this, "name")} name="Name" className="form-control"/>
          </div>

          <div className="form-group">
            <label>Date:</label>
            <input type="text" onChange={this.handleChange.bind(this, "date")} name="Date" className="form-control"/>
          </div>

          <div className="form-group">
            <label>NickName:</label>
            <input type="text" onChange={this.handleChange.bind(this, "nickname")} name="NickName" className="form-control"/>
          </div>

          <div className="form-group">
            <label>Location:</label>
            <input type="text" onChange={this.handleChange.bind(this, "location")} name="Location" className="form-control"/>
          </div>

          <div className="form-group">
            <label>Town:</label>
            <input type="text" onChange={this.handleChange.bind(this, "town")} name="Town" className="form-control"/>
          </div>




          <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
          <button type="button" onClick={this.handleAddEntry} className="btn btn-primary">Add Entry</button>
        </div>
        </form>

        {entries.map(entry => (entry))}

      </div>
    );
  }
}