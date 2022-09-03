import User from './User';

const users: User[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => ({
  id: i,
  name: `Westen_${i}`,
  image: 'https://source.unsplash.com/q3I54kLmepw',
  emailAddress: 'example-user.email.com',
  phoneNumber: '090-1212-333',
  company: { name: 'TestCompany' },
  webSite: 'example.com',
}));

export default users;
