import React from 'react';

var TransactionForm = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <form className="ContactForm">
        <input type="text" placeholder='Name (required)' value: this.props.value.name />
        <input type="text" placeholder='Email' value: this.props.value.email />
        <input type="text" placeholder='Desctiption' value: this.props.value.description />
        <button type='submit'>Add</button>
      </form>
    )
  },
});