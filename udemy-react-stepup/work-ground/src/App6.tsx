import Router from './router/Router';
import { UserProvider } from './providers/UserProvider';
import './App.css';

const App: React.FC = () => (
  <UserProvider>
    <Router />
  </UserProvider>
);

export default App;
