var OrderController = React.createClass({
  submitUrl: '/order',
  isBlank: function(field) {
    return field == "" || typeof field === "undefined";
  },
  validate: function(order) {
    if (this.isBlank(order.venmo)) {
      return false;
    }

    if (this.isBlank(order.address)) {
      return false;
    }

    if (this.isBlank(order.phone)) {
      return false;
    }

    return true;
  },
  handleSubmit: function(order, total) {
    var isValid = this.validate(order);

    if (isValid) {
      var orderObject = new Order();
      orderObject.set('totalGuess', total);
      orderObject.set('ordered', false);
      orderObject.save(order, {
        success: function(orderObject) {
          alert("Success! Please make sure to Venmo Maxwell-Bernstein "+
                "and keep an eye out for your food!");
          window.location.replace("http://tuftsorder.bernsteinbear.com/"+
                "done.html");
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
