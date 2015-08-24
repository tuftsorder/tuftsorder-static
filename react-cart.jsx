var BurritoCreator = React.createClass({
  render: function() {
    return (
      <div className="burrito-creator">
	<BaseSelector />
	<ToppingSelector />
	<PriceIndicator />
      </div>
    );
  }
});

React.render(
  <BurritoCreator />,
  document.getElementById('content')
);
