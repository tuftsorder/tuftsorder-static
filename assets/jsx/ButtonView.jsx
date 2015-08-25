var ButtonView = React.createClass({
  render: function() {
    return (
      <div className="button-view">
        <button onClick={this.props.onClick}>{this.props.value}</button>
      </div>
    );
  }
});
