import styled from 'styled-components';

import { UserProfile } from '../types/userProfile';

type Props = {
  user: UserProfile;
};

const SCardContainer = styled.div`
  border: solid 1px #ccc;
  border-radius: 8px;
  padding: 0 16px;
  margin: 8px;
`;

const UserCard: React.VFC<Props> = ({ user }) => (
  <SCardContainer>
    <dl>
      <dt>名前</dt>
      <dd>{user.name}</dd>
      <dt>メール</dt>
      <dd>{user.email}</dd>
      <dt>住所</dt>
      <dd>{user.address}</dd>
    </dl>
  </SCardContainer>
);

export default UserCard;
