import InlineStyleComponent from './inlineStyle';
import CssModulesComponent from './CssModules';
import StyledJsxComponent from './StyledJsx';
import StyledComponentsComponent from './StyledComponents';

const App: React.FC = () => (
  <div>
    <InlineStyleComponent />
    <CssModulesComponent />
    <StyledJsxComponent />
    <StyledComponentsComponent />
  </div>
);

export default App;
