import React from 'react';
import Autocomplete from '../../node_modules/react-autocomplete/build/lib/index'
import ReactTags from '../../node_modules/react-tag-autocomplete/'



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
    this.props.newTag(tag.name);
  }


    render() {
        var suggestions = []
        var index = 1
        for(var sug in this.props.suggestions) {
          suggestions.push({id: index++, name: this.props.suggestions[sug]})
        }
        return (
          <div>
            <div className="horizontal">

              <p>{this.props.id}</p>

              <div className="form-group" className="vertical">
                <label>Name:</label>
                <input type="text" onChange={this.handleChange} name="name"  className="form-control react-tags"/>
              </div>

              <div className="form-group" className="vertical">
                <label>Date:</label>
                <input type="text" onChange={this.handleChange} name="date"  className="form-control react-tags"/>
              </div>

              <div className="form-group" className="vertical">
                <label>Value:</label>
                <input type="text" onChange={this.handleChange} name="value"  className="form-control react-tags"/>
              </div>

              <div className="form-group" className="vertical">
                <label>Add Tag:</label>
                <ReactTags
                  tags={this.state.tags}
                  suggestions={suggestions}
                  handleDelete={this.handleDelete.bind(this)}
                  handleAddition={this.handleAddition.bind(this)}
                  allowNew={true}
                  minQueryLength={0}
                />
              </div>

            </div>
          </div>
        )
    }
  }
