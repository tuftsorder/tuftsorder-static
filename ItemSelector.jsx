var ItemSelector = React.createClass({
  render: function() {
    return (
      <div className="item-selector">
        <label>{this.props.title}</label>
        <select
          defaultValue={this.props.defaultValue}
          onChange={this.props.onChange}>
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
