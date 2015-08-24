var BaseSelector = React.createClass({
  fillingOptions: [
    "Chicken",
    "Steak",
    "Veggie",
  ],
  prices: {
    fillings: {
      "Chicken": {price: 6.80},
      "Steak": {price: 7.80},
      "Veggie": {price: 6.80},
    },
    extra: {price: 2.25},
  },
  getInitialState: function() {
    return {filling: "Chicken", extra: false};
  },
  handleFillingChange: function(event) {
    this.setState({filling: event.target.value}, function() {
      // pass
    });
  },
  handleExtraChange: function(event) {
    this.setState({extra: event.target.checked}, function() {
      // pass
    });
  },
  calculatePrice: function() {
    var hasExtra = this.state.extra;
    var extraCost = hasExtra ? this.prices.extra.price : 0;
    return this.prices.fillings[this.state.filling].price + extraCost;
  },
  render: function() {
    var this_ = this;
    var fillings = this.prices.fillings;
    return (
      <div className="item-selector">
	<ItemSelector title="Choice of Filling"
		      defaultValue={this.fillingOptions[0]}
		      items={this.fillingOptions}
		      onChange={this.handleFillingChange} />
	<CheckOption title="Extra filling?"
		     price={this.prices.extra.price}
		     parent={this_} />
      </div>
    );
  }
});
