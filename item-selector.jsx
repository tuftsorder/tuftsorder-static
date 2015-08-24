var ItemSelector = React.createClass({
  render: function() {
    return (
      <div className="item-selector">
	<label>{this.props.title}</label>
	<select
	  defaultValue={this.props.defaultValue}
	  onChange={this.props.onChange}>
	  <ul>
	    {this.props.items.map(function(item) {
	return (
	  <li key={item}>
	    <option value={item}>{item}</option>
	  </li>
	);
      })}
	  </ul>
	</select>
      </div>
    );
  }
});
