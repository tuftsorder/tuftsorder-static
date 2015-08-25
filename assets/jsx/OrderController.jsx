var OrderController = React.createClass({
  submitUrl: '/order',
  validate: function(order) {
    if (typeof order.venmo === "undefined") {
      return false;
    }

    return true;
  },
  handleSubmit: function(order, total) {
    var isValid = this.validate(order);

    if (isValid) {
      $.ajax({
        url: this.submitUrl,
        dataType: 'json',
        type: 'POST',
        data: order,
        success: function() {
          console.log("Success!");
        },
        error: function() {
          console.log("Error!");
        },
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
