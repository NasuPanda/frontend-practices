import classes from './CssModules.module.scss';

const CssModulesComponent: React.VFC = () => (
  <div className={classes.container}>
    <h1 className={classes.title}>CSS Modules</h1>
    <button type="button" className={classes.button}>
      This is a button
    </button>
  </div>
);

export default CssModulesComponent;
