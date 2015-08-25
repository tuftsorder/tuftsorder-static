var TextFieldView = React.createClass({
  render: function() {
    return (
      <div className="text-input">
        <label>{this.props.title}</label>
        <input type="text" onChange={this.props.onChange} />
      </div>
    );
  }
});
