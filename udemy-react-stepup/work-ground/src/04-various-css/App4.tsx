import InlineStyleComponent from './inlineStyle';
import CssModulesComponent from './CssModules';
import StyledJsxComponent from './StyledJsx';
import StyledComponentsComponent from './StyledComponents';
import EmotionComponent from './Emotion';

const App: React.FC = () => (
  <div>
    <InlineStyleComponent />
    <CssModulesComponent />
    <StyledJsxComponent />
    <StyledComponentsComponent />
    <EmotionComponent />
  </div>
);

export default App;
