var CheckBox = React.createClass({
  render: function() {
    return (
      <div className="check-box">
        <label>
          {this.props.title} <PriceIndicator price={this.props.item.price}/>
        </label>
        <input type="checkbox" onChange={this.props.onChange} />
      </div>
    );
  }
});
