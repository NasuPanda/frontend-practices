const InlineStyleComponent: React.VFC = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
  };
  const titleStyle = {
    width: '80%',
    color: 'red',
    borderRadius: '20px',
  };
  const buttonStyle = {
    color: 'fff',
    backgroundColor: '#6ce',
    padding: '8px',
    margin: '8px',
    borderRadius: '20px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>inline style test</h1>
      <button type="button" style={buttonStyle}>
        This is a button
      </button>
    </div>
  );
};

export default InlineStyleComponent;
