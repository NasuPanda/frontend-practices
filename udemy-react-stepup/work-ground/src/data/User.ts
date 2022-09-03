type Company = {
  name: string;
};

type User = {
  id: number;
  name: string;
  image: string;
  emailAddress: string;
  phoneNumber: string;
  company: Company;
  webSite: string;
};

export default User;
