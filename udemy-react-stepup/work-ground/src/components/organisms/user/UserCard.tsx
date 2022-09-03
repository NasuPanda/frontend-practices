import styled from 'styled-components';
import Card from '../../atoms/card/Card';
import UserIconWithName from '../../molecules/user/UserIconWithName';
import User from '../../../data/User';

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

const UserCard: React.FC<{ user: User; isAdmin: boolean }> = ({
  user,
  isAdmin,
}) => (
  <Card>
    <UserIconWithName
      userName={user.name}
      image={user.image}
      isAdmin={isAdmin}
    />
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
