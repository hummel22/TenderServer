import React from 'react';
import Autocomplete from '../../node_modules/react-autocomplete/build/lib/index'


export default class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myTags: "",   //Internal String list of tags to display
      //TODO convert to array and create string list on fly - easier to delete later
      tag: "" //Current value in the tag field
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.addTag = this.addTag.bind(this);
    this.selectTag = this.selectTag.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  handleChange(ev) {
    this.props.entryChange(this.props.id, ev);
  }

  handleAddTag(ev){
    console.log("PRESSED")
    ev.persist()
    if (ev.key === 'Enter') {
     console.log('do validate');
     console.log(ev.target.value);
     addTag(ev.target.value)
   }
  }

  addTag(val){
    this.setState((state,props) => {
      return {
        myTags: this.state.myTags + ", " + val,
        tag: ""
      }
    })
    this.props.newTag(val);
  }

  selectTag(val) {
    this.addTag(val)
  }

  handleTagChange(ev)  {
    ev.persist();
    this.setState((state,props) => {
      return {
        tag: ev.target.value
      }
    })
  }

  onKeyPress(ev) {
    if(ev.key == 'Enter'){
      this.addTag(ev.target.value)
    }
  }


  render() {
      return (
        <div>
          <div className="horizontal">

            <p>{this.props.id}</p>

            <div className="form-group" className="vertical">
              <label>Name:</label>
              <input type="text" onChange={this.handleChange} name="name"  className="form-control"/>
            </div>


            <div className="form-group" className="vertical">
              <label>Date:</label>
              <input type="text" onChange={this.handleChange} name="date"  className="form-control"/>
            </div>

            <div className="form-group" className="vertical">
              <label>Value:</label>
              <input type="text" onChange={this.handleChange} name="value"  className="form-control"/>
            </div>

            <div className="form-group" className="vertical">
              <label>Add Tag:</label>
              <Autocomplete
                name="tag"
                getItemValue={(item) => item.label}
                items={this.props.tagList}
                renderItem={(item, isHighlighted) =>
                  <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item.label}
                  </div>
                }
                value={this.state.tag}
                onChange={this.handleTagChange}
                onSelect={this.addTag}
                inputProps={{onKeyPress: this.onKeyPress}}
              />
            </div>

            <div className="form-group" className="vertical">
              <label>Tags:</label>
              <p>{this.state.myTags}</p>
            </div>

          </div>
        </div>
      )
  }
}
