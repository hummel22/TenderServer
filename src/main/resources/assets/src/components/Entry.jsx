import React from 'react';
import ReactTags from 'react-tag-autocomplete';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ChipInput from 'material-ui-chip-input';
import AutoComplete from 'material-ui/AutoComplete';


const width = 100;
const textFieldled = {
  maxWidth: width,
  marginLeft: 12,
  marginRight: 12
}

const listStyle = {
  maxWidth: width
}

const style = {
  marginLeft: 12,
  marginRight: 12
};

const buttonStyle = {
  marginLeft: 12,
  marginRight: 12,
  marginBottom: 12,
  marginTop: 12
};

export default class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [
      ]
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(ev) {
    this.props.entryChange(this.props.id, ev);
  }


  handleDelete (i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
    this.props.deleteTag(this.state.tags[i].name)
  }

  handleAddition (tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags });
    this.props.newTag(tag);
  }

  componentDidMount() {
    this.refs.nameField.focus();
  }


  render() {
    return (
      <div className="entry-container">
        <TextField
          type="text"
          hintText="Name"
          onChange={this.handleChange}
          name="name"
          menuStyle={listStyle}
          listStyle={listStyle}
          style={textFieldled}
          textFieldStyle	={textFieldled}
          ref='nameField'/>

        <TextField
          type="number"
          hintText="Value"
          onChange={this.handleChange}
          name="value"
          menuStyle={listStyle}
          listStyle={listStyle}
          style={textFieldled}
          textFieldStyle	={textFieldled}/>

        <ChipInput
          newChipKeyCodes={[13, 188, 32]}
          openOnFocus={true}
          maxSearchResults={6}
          filter={AutoComplete.caseInsensitiveFilter}
          id={"TagInput" + this.props.id}
          hintText="Tags"
          dataSource={this.props.suggestions}
          value={this.state.tags}
          onRequestAdd={this.handleAddition.bind(this)}
          onRequestDelete={(chip, index) => this.handleDelete(index)}/>

        <FloatingActionButton mini={true} style={buttonStyle} onClick={this.props.addEntry}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}
