import Page1 from '../Page1';
import Page1DetailA from '../Page1DetailA';
import Page1DetailB from '../Page1DetailB';
import Route from './Route';

const page1Routes: Route[] = [
  {
    path: '/',
    exact: true,
    children: <Page1 />,
  },
  {
    path: '/detailA',
    exact: false,
    children: <Page1DetailA />,
  },
  {
    path: '/detailB',
    exact: false,
    children: <Page1DetailB />,
  },
];

export default page1Routes;
