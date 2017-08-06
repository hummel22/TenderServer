import React from 'react';
import Entry from './Entry.jsx';
import Autocomplete from '../../node_modules/react-autocomplete/build/lib/index'


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
      entries: {},
      /*
       Entires have data like
        - name
        - date
        - value
        - tags
       */
      locations: {
        apple: {
          nickname: "apple",
          location: "Mcdonalds",
          town: "NewYork"
        },
        banana: {
          nickname: "banana",
          location: "Wenyds",
          town: "Vrginia"
        },
        pear: {
          nickname: "pear",
          location: "KFC",
          town: "DC"
        },
      },
      tagList: [
        { label: "Chocolate"},
        { label: "Fast Food"},
        { label: "Groceries"}
      ],
      nicknames: [
        { label: 'apple' },
        { label: 'banana' },
        { label: 'pear' }
      ]
    };
    this.handleAddEntry = this.handleAddEntry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEntryEvent = this.handleEntryEvent.bind(this)


  }


  //TODO updateTagsAndLocations
      //TODO Populate tags
      //TODO Populate locations

  handleAddEntry()  {
    console.log("Adding Entry")
    this.setState((state,props) => {
    var entriesUpdate = state.numberOfEntries + 1;
      return {
        numberOfEntries: entriesUpdate,
        entries: Object.assign(state.entries, {[entriesUpdate]:{
          name: "",
          date: "",
          value: -0.1,
          tags: []
        }})
      }
    });
  }

  handleChange(key, ev) {
    ev.persist()
    this.setState((state,props) => {
      return {transactionData: Object.assign(state.transactionData, {[key]: ev.target.value})}
    })
  }

  handleSelect(key, val)  {
    var location = this.state.locations[val]
    this.setState((state,props) => {
      return {transactionData: Object.assign(state.transactionData, {
        nickname: location.nickname,
        location: location.location,
        town: location.town
      })}
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

  addEntryTag(id, tag){
    console.log("Add tag: " + tag + " to ID " + id);
    var key = "tags";
    this.setState((state,props) => {
      var tags = state.entries[id][key].slice();
      tags.push(tag);
      var updateEntry = Object.assign(state.entries[id], {[key]: tags})
      var entriesUpdate = { [id]: updateEntry }
      return {
        entries: entriesUpdate
      }
    })

  }

  handleSubmit() {
    console.log(this.state);
    //TODO Verify Transaction
    //TODO Verify entries
      //TODO Convert Tags to Array
    //TODO throw erroes

    //TODO Send Transaction
      //TODO Get transaction ID
    //TODO for loop
      //TODO send entries with ID
    //TODO Show succes or not
  }

  render() {
    var entries = []
    for(var i = 0; i < this.state.numberOfEntries; i++) {
      entries.push(<Entry
        key={i+1}
        entryChange={this.handleEntryEvent}
        id={i+1}
        tagList={this.state.tagList}
        newTag={this.addEntryTag.bind(this, i+1)}
        />)
    }
    return (
      <div>
      <form>
        <div className="horizontal">

          <div className="form-group" className="vertical">
            <label>Name:</label>
            <input type="text" onChange={this.handleChange.bind(this, "name")} name="Name" className="form-control"/>
          </div>

          <div className="form-group" className="vertical">
            <label>Date:</label>
            <input type="text" onChange={this.handleChange.bind(this, "date")} name="Date" className="form-control"/>
          </div>

          <div className="form-group" className="vertical">
            <label>NickName:</label>
            <Autocomplete
              getItemValue={(item) => item.label}
              items={this.state.nicknames}
              renderItem={(item, isHighlighted) =>
                <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                  {item.label}
                </div>
              }
              value={this.state.transactionData.nickname}
              onChange={this.handleChange.bind(this, "nickname")}
              onSelect={(val) => this.handleSelect("nickname", val)}
            />
          </div>

          <div className="form-group" className="vertical">
            <label>Location:</label>
            <input value={this.state.transactionData.location} type="text" onChange={this.handleChange.bind(this, "location")} name="Location" className="form-control"/>
          </div>

          <div className="form-group" className="vertical">
            <label>Town:</label>
            <input type="text" value={this.state.transactionData.town} onChange={this.handleChange.bind(this, "town")} name="Town" className="form-control"/>
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
