import React from 'react';

export default class Entry extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(ev) {
    this.props.entryChange(this.props.id, ev);
  }

  render() {
      return (
        <div>
          <div className="horizontal">

            <p>{this.props.id}</p>

            <div className="form-group">
              <label>Name:</label>
              <input type="text" onChange={this.handleChange} name="name"  className="form-control"/>
            </div>

            <div className="form-group">
              <label>Date:</label>
              <input type="text" onChange={this.handleChange} name="value"  className="form-control"/>
            </div>

            <div className="form-group">
              <label>Tags:</label>
              <input type="text" onChange={this.handleChange} name="tags" className="form-control"/>
            </div>

          </div>
        </div>
      )
  }
}