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
    this.baseState= JSON.parse(JSON.stringify(this.state));
    this.handleAddEntry = this.handleAddEntry.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEntryEvent = this.handleEntryEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  //TODO updateTagsAndLocations
      //TODO Populate tags
      //TODO Populate locations

  handleAddEntry()  {
    this.setState((state,props) => {
    var entriesUpdate = state.numberOfEntries + 1;
      return {
        numberOfEntries: entriesUpdate,
        entries: Object.assign(state.entries, {[entriesUpdate]:{
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
    var location = this.state.locations[val]
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
    return Object.assign(transaction, {date: "20"+transaction.year+"-"+month+"-"+day})
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
        console.log(JSON.stringify(this.state.entries[index],null,2));

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

            <Transaction
              id="transactionName"
              handleChange={this.handleChange}
              transactionData={this.state.transactionData}
              nicknames={this.state.nicknames}
              updateTransactionData={this.updateTransactionData.bind(this)}
              handleSelect={this.handleSelect.bind(this)}
              handleAddEntry={this.handleAddEntry}/>

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
