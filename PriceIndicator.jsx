var PriceIndicator = React.createClass({
  render: function() {
    if (this.props.price > 0.0) {
      var displayFloat = this.props.price.toFixed(2);
      return (
        <div className="price-indicator">
          {this.props.title} (${displayFloat})
        </div>
      );
    }

    return <div></div>;
  }
});
