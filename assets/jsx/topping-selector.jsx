var ToppingSelector = React.createClass({
  riceOptions: [
    "No Rice",
    "White Rice",
    "Brown Rice",
  ],
  beanOptions: [
    "No Beans",
    "Black Beans",
    "Pinto Beans",
  ],
  getInitialState: function() {
    return {
      rice: this.riceOptions[0],
      beans: this.beanOptions[0],
    };
  },
  handleRiceChange: function(event) {
    this.setState({rice: event.target.value}, function() {
      // pass
    });
  },
  handleBeanChange: function(event) {
    this.setState({beans: event.target.value}, function() {
      // pass
    });
  },
  render: function() {
    return (
      <div className="topping-selector">
	<ItemSelector title="Choice of Rice"
		      defaultValue={this.riceOptions[0]}
		      items={this.riceOptions}
		      onChange={this.handleRiceChange} />
	<ItemSelector title="Choice of Beans"
		      defaultValue={this.beanOptions[0]}
		      items={this.beanOptions}
		      onChange={this.handleBeanChange} />
      </div>
    );
  }
});
