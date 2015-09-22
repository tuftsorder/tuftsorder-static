var MultipleItemSelector = React.createClass({
  render: function() {
    return (
      <div className="item-selector">
        <label>{this.props.title}</label>
        <div>{this.props.helpText}</div>
        <select
          multiple="multiple"
          defaultValue={this.props.defaultValue}
          onChange={this.props.onChange}
          size={this.props.items.length}>
          {this.props.items.map(function(item) {
            return (
              <option key={item.name} value={item.name}>
                {item.name} <PriceIndicator price={item.price} />
              </option>
            );
          })}
        </select>
      </div>
    );
  }
});
