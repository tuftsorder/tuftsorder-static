var BurritoController = React.createClass({
  fillingOptions: [
    {name: "Chicken", price: 6.80},
    {name: "Steak", price: 7.80},
    {name: "Veggie", price: 6.80},
  ],
  extraOption:
    {name: "Extra filling", price: 2.25},
  riceOptions: [
    {name: "No Rice", price: 0.0},
    {name: "White Rice", price: 0.0},
    {name: "Brown Rice", price: 0.0},
  ],
  beanOptions: [
    {name: "No Beans", price: 0.0},
    {name: "Black Beans", price: 0.0},
    {name: "Pinto Beans", price: 0.0},
  ],
  toppingOptions: [
    {name: "Fajita Veggies", price: 0.0},
    {name: "Fresh Tomato Salsa", price: 0.0},
    {name: "Roasted Chili-Corn Salsa (mild)", price: 0.0},
    {name: "Tomatillo-Green Chili Salsa (medium)", price: 0.0},
    {name: "Tomatillo-Red Chili Salsa (hot)", price: 0.0},
    {name: "Sour Cream", price: 0.0},
    {name: "Cheese", price: 0.0},
    {name: "Guacamole", price: 2.05},
    {name: "Lettuce", price: 0.0},
  ],
  getInitialState: function() {
    return {
      filling: this.fillingOptions[0].name,
      extra: false,
      rice: this.riceOptions[1].name,
      beans: this.beanOptions[1].name,
      toppings: [],
    };
  },
  lookupPrice: function(list, name) {
    for (var idx in list) {
      var item = list[idx];
      if (item.name == name) {
        return item.price;
      }
    }
    return null;
  },
  calculateToppingPrice: function() {
    var this_ = this;
    var prices = this.state.toppings.map(function (topping) {
      return this_.lookupPrice(this_.toppingOptions, topping);
    });
    return prices.reduce(function(pv, cv) { return pv + cv; }, 0); // sum
  },
  calculatePrice: function() {
    var fillingPrice = this.lookupPrice(this.fillingOptions,
                                        this.state.filling);
    var extraPrice = this.state.extra ?
                       this.extraOption.price :
                       0.0;
    var toppingPrice = this.calculateToppingPrice();
    var deliveryCharge = this.calculateDeliveryCharge();
    return fillingPrice + extraPrice + toppingPrice + deliveryCharge;
  },
  calculateDeliveryCharge: function() {
    return 2;
  },
  handleFillingChange: function(event) {
    this.setState({filling: event.target.value});
  },
  handleExtraChange: function(event) {
    this.setState({extra: event.target.checked});
  },
  handleToppingChange: function(event) {
    var toppingList = $(event.target).val();
    this.setState({toppings: toppingList});
  },
  handleVenmoChange: function(event) {
    this.setState({venmo: event.target.value});
  },
  handleSubmit: function() {
    var total = this.calculatePrice();
    this.props.onSubmit.bind(null, this.state, total)();
  },
  render: function() {
    return (
      <div className="burrito-creator">
        <ItemSelector
          title="Pick your Filling"
          items={this.fillingOptions}
          defaultValue={this.state.filling}
          onChange={this.handleFillingChange} />
        <CheckBox
          title="Extra filling?"
          item={this.extraOption}
          onChange={this.handleExtraChange} />
        <ItemSelector
          title="Pick your Rice"
          items={this.riceOptions}
          defaultValue={this.state.rice} />
        <ItemSelector
          title="Pick your Beans"
          items={this.beanOptions}
          defaultValue={this.state.beans} />
        <MultipleItemSelector
          title="Pick your Toppings"
          items={this.toppingOptions}
          onChange={this.handleToppingChange} />
        <PriceIndicator
          title="Delivery Charge"
          price={this.calculateDeliveryCharge()} />
        <PriceIndicator
          title="Final Price"
          price={this.calculatePrice()} />
        <TextFieldView
          title="Venmo Username"
          onChange={this.handleVenmoChange} />
        <ButtonView
          onClick={this.handleSubmit}
          value="Submit" />
      </div>
    );
  }
});
