import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SearchInput from './components/molecules/SearchInput';
import UserCard from './components/organisms/user/UserCard';
// import HeaderOnly from './components/templates/HeaderOnly';
import DefaultLayout from './components/templates/DefaultLayout';
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
  <BrowserRouter>
    <DefaultLayout>
      <br />
      <h2>Molecules</h2>
      <SearchInput />
      <br />
      <h2>Organisms</h2>
      <UserCard user={user} />
    </DefaultLayout>
  </BrowserRouter>
);

export default App;
