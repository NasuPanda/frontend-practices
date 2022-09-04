import Home from '../components/pages/Home';
import UserManagement from '../components/pages/UserManagement';
import Setting from '../components/pages/Setting';
import Page404 from '../components/pages/Page404';

const HomeRoutes = [
  {
    path: '/',
    exact: true,
    children: <Home />,
  },
  {
    path: '/user_management',
    exact: false,
    children: <UserManagement />,
  },
  {
    path: '/setting',
    exact: true,
    children: <Setting />,
  },
  {
    path: '*',
    exact: false,
    children: <Page404 />,
  },
];

export default HomeRoutes;
