import React from 'react';
import Entry from './Entry.jsx';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Card from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Transaction from './Transaction.jsx'
var omit = require('object.omit');



const numberWidth = 55;
const textWidth = 75;


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



const textFieldledNum = {
  maxWidth: numberWidth,
  marginLeft: 12,
  marginRight: 12
}

const listStyleNum = {
  maxWidth: numberWidth
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

export default class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionData: {
        name: "",
        date: "",
        year: "",
        month: "",
        day: "",
        nickname: "",
        location: "",
        town: ""},
      transactionID: null,
      numberOfEntries: 0,
      nextEntryID: 0,
      entries: {},
      /*
       Entires have data like
        - name
        - date
        - value
        - tags []
       */
      locations: {},
      tagList: [],
      nicknames: [],
      shiftDown: false
    };
    this.baseState= JSON.parse(JSON.stringify(this.state));
    this.handleAddEntry = this.handleAddEntry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEntryEvent = this.handleEntryEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.shiftMode = true;
    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.getTags = this.loadTags.bind(this);
    this.getLocations = this.loadLocations.bind(this);


  }

  componentDidMount() {
    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("keyup", this.keyUp);
    this.getTags();
    this.getLocations();
  }

  componentWillUnmount()  {
    window.removeEventListener("keydown", this.keyDown);
    window.removeEventListener("keyup", this.keyUp);
  }

  loadTags()  {
    var tagURL = "http://127.0.0.1:8080/api/tags"
    var saveTags = this.setStateTags.bind(this);
    fetch(tagURL)
      .then(function(data) {
        data.json().then((body) =>
        {
          var tags = []
          for(var index in body)  {
            tags.push(body[index].name)
          }
          saveTags(tags)
        })
      })
      .catch(function(error) {
        // If there is any error you will catch them here
        console.log("Error Fetching Tags: " + error)
      });
  }

  setStateTags(tags) {
    this.setState((state,props) =>  {
      return { tagList : tags };
    })
  }


  loadLocations () {
    var locationURL = "http://127.0.0.1:8080/api/locations"
    var saveLocations = this.setStateLocations.bind(this);
    fetch(locationURL)
      .then(function(data) {
        console.log(data);
        data.json().then((body) =>
        {
          console.log(body);
          var nicknames = [];
          var locations = {};
          for(var index in body)  {
            var location = body[index];
            nicknames.push(location.nickname)
            locations[location.nickname] =  {
              nickname: location.nickname,
              location: location.name,
              town: location.town
            };
          }
          saveLocations(locations, nicknames)
        })
      })
      .catch(function(error) {
        // If there is any error you will catch them here
        console.log("Error Fetching Tags: " + error)
      });
  }

  setStateLocations(locations, nicknames) {
    console.log(JSON.stringify(locations,null,2));
    console.log(JSON.stringify(nicknames,null,2));

    this.setState((state,props) =>  {
      return {
        nicknames : nicknames,
        locations : locations
      };
    })
  }




  //TODO updateTagsAndLocations
      //TODO Populate tags
      //TODO Populate locations

  handleAddEntry()  {
    this.setState((state,props) => {
    var entriesUpdate = state.numberOfEntries + 1;
    var nextEntryID = state.nextEntryID + 1;
      return {
        numberOfEntries: entriesUpdate,
        nextEntryID: nextEntryID,
        entries: Object.assign(state.entries, {[nextEntryID]:{
          name: "",
          value: -1,
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
    this.setState((state,props) => {
      return {transactionData: Object.assign(state.transactionData, {[key]: val})}
    })
  }

  handleSelect(key, val)  {
    console.log("Selected: " + val)
    var location = this.state.locations[val]
    console.log(JSON.stringify(location,null,2))
    this.setState((state,props) => {
      return {transactionData: Object.assign(state.transactionData, {
        nickname: location.nickname,
        location: location.location,
        town: location.town
      })}
    })
    if(this.state.numberOfEntries < 1)  {
      this.handleAddEntry();
    }
  }

  handleEntryEvent(id, ev) {
    ev.persist();
    var key = ev.target.name;
    this.setState((state,props) => {
      var updateKey = {[key]: ev.target.value};
      var updateEntry = Object.assign(state.entries[id], updateKey)
      var entriesUpdate = Object.assign(state.entries, { [id]: updateEntry })
      return {
        entriesUpdate
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

  verifyEntry(entry)  {
    if(entry.name === "") {
      throw("No Entry name set")
    }
    if(parseInt(entry.value) === -1)  {
      throw("No Entry value set")
    }
  }

  verifyTransaction(transaction){

    if(transaction.name === "") {
      throw("No transaction name set")
    }
    if(parseInt(transaction.year) === -1)  {
      throw("No transaction year set")
    }

    if(parseInt(transaction.month) === -1) {
      throw("No transaction month set")
    }

    if(parseInt(transaction.day) === -1) {
      throw("No transaction day set")
    }

    if(transaction.nickname === "")  {
      throw("No transaction nickname set")
    }

    if(transaction.location === "")  {
      throw("No transaction location set")
    }

    if(transaction.town === "")  {
      throw("No transaction town set")
    }
    var month = transaction.month
    if(parseInt(transaction.month) < 10)  {
      month = "0" + transaction.month;
    }
    var day = transaction.day
    if(parseInt(transaction.day) < 10)  {
      day = "0" + transaction.day;
    }
    var body = {
      name: transaction.name,
      date: "20"+transaction.year+"-"+month+"-"+day,
      location: {
        name: transaction.name,
        town:transaction.town,
        nickname: transaction.nickname
      }
    }
    return body;
  }

  sendTransaction(transaction)  {
    var data = {

    }
    return 24
  }

  sendEntry(entry)  {
    var data = {

    }
  }

  clear() {
    this.props.reset();
  }


  handleSubmit() {
    try{
      var transaction = this.verifyTransaction(this.state.transactionData);
      for(var index in this.state.entries) {
        this.verifyEntry(this.state.entries[index])
        var entry = this.state.entries[index];
        var body = {
          name: entry.name,
          value: entry.value,
          transaction_id: id,
          tags: entry.tags
        }
        console.log(JSON.stringify(body,null,2));

      }
    } catch(err)  {
      console.log(err);
      //TODO notification
      throw err;
    }

    //TODO spinny loader
    console.log(JSON.stringify(transaction,null,2));


    try{
      //Stop spinny
      var id = this.sendTransaction(transaction);
      //CheckMark Spinny
    } catch(err)  {
      console.log(err);
      //Stop spinny
      //TODO notification
      throw err;
    }

    try{
      //Stop spinny
      for(var index in this.state.entries)  {
        var entry = this.state.entries[index];
        var body = {
          name: entry.name,
          value: entry.value,
          transaction_id: id,
          tags: entry.tags,
        }
        this.sendEntry(this.state.entries[index], id);
      }
      //CheckMark Spinny
    } catch(err)  {
      console.log(err);
      //Stop spinny
      //TODO notification
      throw err;
    }

    //Success Notify
    this.clear();
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


  keyDown(ev) {
    if(this.shiftMode) {
      if(ev.key==="Shift")  {
        this.setState((state,props) => {
          return {shiftDown:true}
        })
      }
    }
  }


    keyUp(ev) {
      if(ev.key==="Shift")  {
        this.setState((state,props) => {
          return {shiftDown:false}
        })
      }
    }


    disableShift()  {
      this.shiftMode = false;
    }

    enableShift() {
      this.shiftMode = true;
    }

    removeEntry(id) {
      console.log("Remove: " +id)
      this.setState((state,props) => {
        return {
          numberOfEntries: this.state.numberOfEntries - 1,
          entries: omit(this.state.entries, id)
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
    for(var key in this.state.entries) {
      entries.push(<Entry
        key={key}
        entryChange={this.handleEntryEvent}
        id={key}
        suggestions={this.state.tagList}
        newTag={this.addEntryTag.bind(this, key)}
        deleteTag={this.deleteTag.bind(this, key)}
        addEntry={this.handleAddEntry}
        disableDeleteMode={this.disableShift.bind(this)}
        enableDeleteMode={this.enableShift.bind(this)}
        deleteMode={this.state.shiftDown}
        removeEntry={this.removeEntry.bind(this, key)}
        />)
    }
    var submitButton;
    if(this.state.shiftDown)  {
        submitButton = <RaisedButton
          onClick={this.clear.bind(this)}
          label="Reset"
          secondary={true}
          style={bottom}/>
    } else {
      submitButton = <RaisedButton
        onClick={this.handleSubmit}
        label="Submit"
        primary={true}
        style={bottom}/>
    }
    return (
      <div className="center" >
        <Card className="main-card">
          <div className="vertical">

            <Transaction
              id="transactionName"
              handleChange={this.handleChange}
              transactionData={this.state.transactionData}
              nicknames={this.state.nicknames}
              updateTransactionData={this.updateTransactionData.bind(this)}
              handleSelect={this.handleSelect.bind(this)}
              handleAddEntry={this.handleAddEntry}
              disableDeleteMode={this.disableShift.bind(this)}
              enableDeleteMode={this.enableShift.bind(this)}
              />

            {entries.map(entry => (entry))}

            {submitButton}
          </div>
        </Card>
      </div>
    );
  }
}
