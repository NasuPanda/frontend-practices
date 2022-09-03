import { RecoilRoot } from 'recoil';
import Router from './router/Router';
import { UserProvider } from './providers/UserProvider';
import './App.css';

const App: React.FC = () => (
  <RecoilRoot>
    <UserProvider>
      <Router />
    </UserProvider>
  </RecoilRoot>
);

export default App;
