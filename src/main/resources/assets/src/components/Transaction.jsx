import React from 'react';
import Entry from './Entry.jsx';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Card from 'material-ui/Card';


const textFieldled = {
  maxWidth: 75,
  marginLeft: 12,
  marginRight: 12
}
const style = {
  marginLeft: 12,
  marginRight: 12
};

const listStyle = {
  maxWidth: 75
}

const buttonStyle = {
  marginLeft: 12,
  marginRight: 12,
  marginBottom: 12
}

const bottom = {
  marginTop: 55,
  marginLeft: 12,
  marginRight: 12
};

export default class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      transactionData: {
        name: "",
        date: "",
        year: 17,
        month: 1,
        day: 23,
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
        - tags []
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
        "Chocolate",
        "Fast Food",
        "Groceries"
      ],
      nicknames: [
        'apple',
        'banana',
        'pear'
      ]
    };
    this.handleAddEntry = this.handleAddEntry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEntryEvent = this.handleEntryEvent.bind(this);
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
    this.updateTransactionData(key, ev.target.value);
  }

  updateTransactionData(key, val) {
    console.log("Update: " + key + " : " + val);
    this.setState((state,props) => {
      return {transactionData: Object.assign(state.transactionData, {[key]: val})}
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
    if(this.refs.entryButton) {
      this.refs.entryButton.select();
    } else {
      console.log("Cant dfind ref")
    }
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
    this.setState((state,props) => {
      var entries = state.entries
      entries[id].tags.push(tag);
      return {
        entries: entries
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

  deleteTag(id, tag){
    this.setState((state,props) => {
      var entries = state.entries
      var index = entries[id].tags.findIndex(function(el){return el === tag})
      entries[id].tags.splice(index,1);
      return {
        entries: entries
      }
    })
  }

  // <TextField
  //   id="DateTextField"
  //   type="text"
  //   hintText="Date"
  //   onChange={this.handleChange.bind(this, "date")}
  //   name="Date"
  //   style={style}/>

  // <DatePicker
  //    hintText="Portrait Dialog"
  //    style={style}
  //    onChange={(val, date) => this.handleChange("date", date)}/>

  render() {
    var entries = []
    for(var i = 0; i < this.state.numberOfEntries; i++) {
      entries.push(<Entry
        key={i+1}
        entryChange={this.handleEntryEvent}
        id={i+1}
        suggestions={this.state.tagList}
        newTag={this.addEntryTag.bind(this, i+1)}
        deleteTag={this.deleteTag.bind(this, i+1)}
        addEntry={this.handleAddEntry}
        />)
    }
    return (
      <div className="center">
      <Card className="main-card">
      <div className="vertical">

        <div className="horizontal">

          <TextField
            id="NameTextField"
            type="text"
            hintText="Name"
            onChange={this.handleChange.bind(this, "name")}
            name="Name"
            style={textFieldled} />

          <AutoComplete
            id="YearTextField"
            hintText="Year"
            dataSource={[15,16,17]}
            maxSearchResults={3}
            menuStyle={listStyle}
            listStyle={listStyle}
            style={textFieldled}
            textFieldStyle	={textFieldled}
            openOnFocus={true}
            onUpdateInput={this.updateTransactionData.bind(this, "year")}
            onNewRequest={(val, index) => {if(index > -1) {this.handleSelect("year", val)}}}/>

          <AutoComplete
            id="MonthTextField"
            hintText="Month"
            dataSource={[1,2,3,4,5,6,7,8,9,10,11,12]}
            maxSearchResults={12}
            menuStyle={listStyle}
            listStyle={listStyle}
            style={textFieldled}
            textFieldStyle	={textFieldled}
            openOnFocus={true}
            onUpdateInput={this.updateTransactionData.bind(this, "month")}
            onNewRequest={(val, index) => {if(index > -1) {this.handleSelect("month", val)}}}/>

          <AutoComplete
            id="DayTextField"
            hintText="Day"
            dataSource={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]}
            maxSearchResults={6}
            menuStyle={listStyle}
            listStyle={listStyle}
            style={textFieldled}
            textFieldStyle	={textFieldled}
            openOnFocus={true}
            onUpdateInput={this.updateTransactionData.bind(this, "day")}
            onNewRequest={(val, index) => {if(index > -1) {this.handleSelect("day", val)}}}/>


          <AutoComplete
              id="NickNameTextField"
              hintText="NickName"
              filter={AutoComplete.caseInsensitiveFilter}
              dataSource={this.state.nicknames}
              maxSearchResults={6}
              menuStyle={listStyle}
              listStyle={listStyle}
              style={textFieldled}
              textFieldStyle	={textFieldled}
              openOnFocus={true}
              onUpdateInput={this.updateTransactionData.bind(this, "nickname")}
              onNewRequest={(val, index) => {if(index > -1) {this.handleSelect("nickname", val)}}}
            />

          <TextField
            id="LocationTextField"
            value={this.state.transactionData.location}
            type="text"
            hintText="Location"
            onChange={this.handleChange.bind(this, "location")}
            name="Location"
            style={textFieldled}/>

          <TextField
            id="TownTextField"
            type="text"
            hintText="Town"
            value={this.state.transactionData.town}
            onChange={this.handleChange.bind(this, "town")}
            name="Town"
            style={textFieldled}/>

            <RaisedButton
              id="NewEntryButton"
              onClick={this.handleAddEntry}
              label="Entry"
              primary={true}
              style={buttonStyle}
              ref='entryButton'/>

        </div>

        {entries.map(entry => (entry))}

        <RaisedButton
          onClick={this.handleSubmit}
          label="Submit"
          primary={true}
          style={bottom}/>
      </div>
      </Card>
      </div>
    );
  }
}
