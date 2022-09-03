import styled from 'styled-components';
import Card from '../../atoms/card/Card';
import UserIconWithName from '../../molecules/user/UserIconWithName';

type Company = {
  name: string;
};

type User = {
  name: string;
  image: string;
  emailAddress: string;
  phoneNumber: string;
  company: Company;
  webSite: string;
};

// text-align : 文字の左寄せ
// float : 要素の左寄せ
const SDl = styled.dl`
  text-align: left;
  margin-bottom: 0px;
  dt {
    float: left;
  }
  dd {
    padding-left: 32px;
    padding-bottom: 8px;
    overflow-wrap: break-word;
  }
`;

const UserCard: React.FC<{ user: User }> = ({ user }) => (
  <Card>
    <UserIconWithName userName={user.name} image={user.image} />
    <SDl>
      <dt>メール</dt>
      <dd>{user.emailAddress}</dd>
      <dt>電話番号</dt>
      <dd>{user.phoneNumber}</dd>
      <dt>会社名</dt>
      <dd>{user.company.name}</dd>
      <dt>Web</dt>
      <dd>{user.webSite}</dd>
    </SDl>
  </Card>
);

export default UserCard;
