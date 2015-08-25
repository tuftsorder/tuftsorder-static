var TextAreaView = React.createClass({
  render: function() {
    return (
      <div className="text-input">
        <label>{this.props.title}</label>
        <textarea
          rows="3"
          cols="40"
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}></textarea>
      </div>
    );
  }
});
