import { FC } from 'react';
import SearchInput from './components/molecules/SearchInput';
import UserCard from './components/organisms/user/UserCard';
import './App.css';

const user = {
  name: 'Westen',
  image: 'https://source.unsplash.com/q3I54kLmepw',
  emailAddress: 'example.email.com',
  phoneNumber: '000-0000-000',
  company: { name: 'MyCompany' },
  webSite: 'google.com',
};

const App: FC = () => (
  <div className="App">
    <br />
    <h2>Molecules</h2>
    <SearchInput />
    <br />
    <h2>Organisms</h2>
    <UserCard user={user} />
  </div>
);

export default App;
