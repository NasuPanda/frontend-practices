import styled from 'styled-components';
import SearchInput from '../molecules/SearchInput';
import UserCard from '../organisms/user/UserCard';
import users from '../../data/testData';

const SContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const SUserArea = styled.div`
  padding-top: 40px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
`;

const UsersPage: React.FC = () => (
  <SContainer>
    <h2>User一覧です</h2>
    <SearchInput />
    <SUserArea>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </SUserArea>
  </SContainer>
);

export default UsersPage;
