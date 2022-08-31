const StyledJsxComponent: React.FC = () => (
  <>
    <div className="container">
      <h1 className="foo">Styled JSX</h1>
      <button type="button" className="submit-button">
        This is a button
      </button>
    </div>
    {/* <style jsx>{`
      .container {
        display: flex;
        justify-content: space-around;
      }
      .foo {
        width: 80%;
        color: red;
        border-radius: 20px;
      }
      .submit-button {
        padding: 8px;
        margin: 8px;
        color: fff;
        background-color: #6ce;
        border-radius: 20px;
      }
    `}</style> */}
  </>
);

export default StyledJsxComponent;
