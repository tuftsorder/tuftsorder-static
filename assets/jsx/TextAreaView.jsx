var TextAreaView = React.createClass({
  render: function() {
    return (
      <div className="text-input">
        <label>{this.props.title}</label>
        <textarea
          onChange={this.props.onChange}
          defaultValue={this.props.sample}></textarea>
      </div>
    );
  }
});
