var OrderController = React.createClass({
  submitUrl: '/order',
  validate: function(order) {
    if (typeof order.venmo === "undefined") {
      return false;
    }

    if (typeof order.address === "undefined") {
      return false;
    }

    if (typeof order.phone === "undefined") {
      return false;
    }

    return true;
  },
  handleSubmit: function(order, total) {
    var isValid = this.validate(order);

    if (isValid) {
      var orderObject = new Order();
      orderObject.save(order, {
        success: function(orderObject) {
          alert("Success! Please make sure to Venmo Maxwell-Bernstein "+
                "and keep an eye out for your food!")
        },
        error: function(orderObject, error) {
          alert("Something bad happened :( Try again later.");
        }
      });
    }
    else {
      alert("Please fix form.");
    }
  },
  render: function() {
    return (
      <div className="order-form">
        <BurritoController onSubmit={this.handleSubmit} />
      </div>
    );
  }
});
