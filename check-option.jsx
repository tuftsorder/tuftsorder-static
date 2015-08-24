var CheckOption = React.createClass({
  render: function() {
    var priceFormatted = "";
    if (this.props.price > 0) {
      priceFormatted = "($" + this.props.price.toFixed(2) + ")";
    }

    return (
      <label>
	<input type="checkbox"
	       name={this.props.name}
	       onChange={this.props.parent.handleExtraChange} />
	<span className="price">{this.props.title} {priceFormatted}</span>
      </label>
    );
  }
});
