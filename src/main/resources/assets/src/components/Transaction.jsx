import React from 'react';
import Entry from './Entry.jsx';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Card from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


const numberWidth = 55;
const textWidth = 75;
const autoWidth = 125;


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

const autoListStyle = {
  maxWidth: autoWidth,
  marginRight: 12
}

const autoTextFieldled = {
  maxWidth: autoWidth,
  marginLeft: 12,
  marginRight: 12
}


const locationTextFieldled = {
  maxWidth: 125,
  marginLeft: 32,
  marginRight: 12
}

const autoCompleteStyle = {
  maxWidth: autoWidth
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
  }

  render() {
    return (
      <div className="horizontal">

        <TextField
          id="NameTextField"
          type="text"
          hintText="Name"
          onChange={(ev) => {this.props.handleChange("name", ev)}}
          name="Name"
          value={this.props.transactionData.name}
          style={locationTextFieldled}
          onFocus={this.props.disableDeleteMode}
          onBlur={this.props.enableDeleteMode} />

        <TextField
          id="YearTextField"
          type="number"
          hintText="Year"
          onChange={(ev) => {this.props.handleChange("year", ev)}}
          name="Year"
          value={this.props.transactionData.year}
          style={textFieldledNum}
          onFocus={this.props.disableDeleteMode}
          onBlur={this.props.enableDeleteMode} />

        <TextField
          id="MonthTextField"
          type="number"
          hintText="Month"
          onChange={(ev) => {this.props.handleChange("month", ev)}}
          name="Month"
          value={this.props.transactionData.month}
          style={textFieldledNum}
          onFocus={this.props.disableDeleteMode}
          onBlur={this.props.enableDeleteMode} />

        <TextField
          id="DayTextField"
          type="number"
          hintText="Day"
          onChange={(ev) =>{this.props.handleChange("day", ev)}}
          name="Day"
          value={this.props.transactionData.day}
          style={textFieldledNum}
          onFocus={this.props.disableDeleteMode}
          onBlur={this.props.enableDeleteMode} />


        <AutoComplete
          id="NickNameTextField"
          hintText="NickName"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.props.nicknames}
          maxSearchResults={6}
          menuStyle={autoListStyle}
          listStyle={autoListStyle}
          style={autoCompleteStyle}
          textFieldStyle={autoTextFieldled}
          openOnFocus={true}
          searchText={this.props.transactionData.nickname}
          onUpdateInput={(val) => {this.props.updateTransactionData("nickname", val)} }
          onNewRequest={(val, index) => {if(index > -1) {this.props.handleSelect("nickname", val)}}}
          onFocus={this.props.disableDeleteMode}
          onBlur={this.props.enableDeleteMode}/>

        <TextField
          id="LocationTextField"
          value={this.props.transactionData.location}
          type="text"
          hintText="Location"
          onChange={(ev) => this.props.handleChange("location", ev)}
          name="Location"
          style={locationTextFieldled}
          onFocus={this.props.disableDeleteMode}
          onBlur={this.props.enableDeleteMode}/>

        <TextField
          id="TownTextField"
          type="text"
          hintText="Town"
          value={this.props.transactionData.town}
          onChange={(ev) => this.props.handleChange("town", ev)}
          name="Town"
          style={textFieldled}
          onFocus={this.props.disableDeleteMode}
          onBlur={this.props.enableDeleteMode}/>

        <FloatingActionButton
          mini={true}
          style={buttonStyle}
          onClick={this.props.handleAddEntry}>
            <ContentAdd />
        </FloatingActionButton>

      </div>
    );
  }
}
