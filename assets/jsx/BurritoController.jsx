var BurritoController = React.createClass({
  fillingOptions: [
    {name: "Chicken", price: 6.80},
    {name: "Steak", price: 7.80},
    {name: "Barbacoa", price: 7.80},
    {name: "Carnitas", price: 7.25},
    {name: "Sofritas", price: 6.80},
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
  chipOptions: [
    {name: "Chips & Guacamole", price: 3.40},
    {name: "Chips", price: 1.35},
    {name: "Chips & Fresh Tomato Salsa (mild)", price: 2.10},
    {name: "Chips & Roasted Chili-Corn Salsa (medium)", price: 2.10},
    {name: "Chips & Tomatillo-Green Chili Salsa (medium-hot)", price: 2.10},
    {name: "Chips & Tomatillo-Red Chili Salsa (hot)", price: 2.10},
  ],
  getInitialState: function() {
    return {
      filling: this.fillingOptions[0].name,
      extra: false,
      rice: this.riceOptions[1].name,
      beans: this.beanOptions[1].name,
      toppings: [],
      chips: [],
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
  calculateListPrice: function(priceList, options) {
    var this_ = this;
    var prices = priceList.map(function (item) {
      return this_.lookupPrice(options, item);
    });
    return prices.reduce(function(pv, cv) { return pv + cv; }, 0); // sum
  },
  calculateToppingPrice: function() {
    var this_ = this;
    var prices = this.state.toppings.map(function (topping) {
      return this_.lookupPrice(this_.toppingOptions, topping);
    });
    return prices.reduce(function(pv, cv) { return pv + cv; }, 0); // sum
  },
  salesTax: 0.0625,
  deliveryFee: 2.00,
  calculateSubTotal: function() {
    var fillingPrice = this.lookupPrice(this.fillingOptions,
                                        this.state.filling);
    var extraPrice = this.state.extra ?
                       this.extraOption.price :
                       0.0;
    var toppingPrice = this.calculateListPrice(this.state.toppings,
                                               this.toppingOptions);
    var chipPrice = this.calculateListPrice(this.state.chips,
                                            this.chipOptions);
    return fillingPrice + extraPrice + toppingPrice + chipPrice;
  },
  calculateSalesTax: function() {
    return this.calculateSubTotal() * this.salesTax;
  },
  calculatePrice: function() {
    return this.calculateSubTotal() + this.calculateSalesTax()  + this.deliveryFee;
  },
  handleFillingChange: function(event) {
    this.setState({filling: event.target.value});
    ga('send', 'event', 'dropdown', 'filling_change', 'food change');
  },
  handleExtraChange: function(event) {
    this.setState({extra: event.target.checked});
    ga('send', 'event', 'checkbox', 'extra_change', 'food change');
  },
  handleRiceChange: function(event) {
    this.setState({rice: event.target.value});
    ga('send', 'event', 'dropdown', 'rice_change', 'food change');
  },
  handleBeansChange: function(event) {
    this.setState({beans: event.target.value});
    ga('send', 'event', 'dropdown', 'beans_change', 'food change');
  },
  processArr: function(arr) {
    if (arr == null) {
      return [];
    }

    return arr;
  },
  handleToppingChange: function(event) {
    var toppingList = this.processArr($(event.target).val());
    this.setState({toppings: toppingList});
    ga('send', 'event', 'multiselect', 'topping_change', 'food change');
  },
  handleChipChange: function(event) {
    var chipList = this.processArr($(event.target).val());
    this.setState({chips: chipList});
    ga('send', 'event', 'multiselect', 'chip_change', 'food change');
  },
  handleSpecialInstructionChange: function(event) {
    this.setState({instructions: event.target.value})
    ga('send', 'event', 'textarea', 'instructions_change', 'special instructions change');
  },
  handleAddressChange: function(event) {
    this.setState({address: event.target.value});
    ga('send', 'event', 'textarea', 'address_change', 'address change');
  },
  handlePhoneChange: function(event) {
    this.setState({phone: event.target.value});
    ga('send', 'event', 'textfield', 'phone_change', 'phone change')
  },
  handleVenmoChange: function(event) {
    this.setState({venmo: event.target.value});
    ga('send', 'event', 'textfield', 'venmo_change', 'venmo change');
  },
  handleSubmit: function() {
    var total = this.calculatePrice();
    ga('send', 'event', 'button', 'submit', 'form submit');
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
          defaultValue={this.state.rice}
          onChange={this.handleRiceChange} />
        <ItemSelector
          title="Pick your Beans"
          items={this.beanOptions}
          defaultValue={this.state.beans}
          onChange={this.handleBeansChange} />
        <MultipleItemSelector
          title="Pick your Toppings"
          items={this.toppingOptions}
          onChange={this.handleToppingChange} />
        <MultipleItemSelector
          title="Pick your Extras"
          items={this.chipOptions}
          onChange={this.handleChipChange} />
        <TextAreaView
          title="Special Instructions"
          placeholder="Do you have any special instructions? If they incur extra cost, they will not be honored."
          onChange={this.handleSpecialInstructionChange} />
        <PriceIndicator
          title="Subtotal"
          price={this.calculateSubTotal()} />
        <br />
        <PriceIndicator
          title="Sales tax"
          price={this.calculateSalesTax()} />
        <br />
        <PriceIndicator
          title="Delivery Fee"
          price={this.deliveryFee} />
        <br />
        <PriceIndicator
          title="Final Price"
          price={this.calculatePrice()} />
        <TextAreaView
          title="Address"
          placeholder="Please provide specific info, like 'Houston 331'"
          onChange={this.handleAddressChange} />
        <TextFieldView
          title="Phone number"
          onChange={this.handlePhoneChange} />
        <TextFieldView
          title="Venmo Username"
          info="Please pay Maxwell-Bernstein"
          onChange={this.handleVenmoChange} />
        <ButtonView
          onClick={this.handleSubmit}
          value="Submit" />
      </div>
    );
  }
});
