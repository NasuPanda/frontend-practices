import Page2 from '../Page2';
import UrlParameter from '../UrlParameter';
import Route from './Route';

const page2Routes: Route[] = [
  {
    path: '/',
    exact: true,
    children: <Page2 />,
  },
  {
    path: '/:id',
    exact: false,
    children: <UrlParameter />,
  },
];

export default page2Routes;
