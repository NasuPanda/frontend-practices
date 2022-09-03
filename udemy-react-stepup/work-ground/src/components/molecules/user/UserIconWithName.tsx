import styled from 'styled-components';
import DefaultLink from '../../atoms/link/DefaultLink';

type Props = {
  image: string;
  userName: string;
  isAdmin: boolean;
};

const SContainer = styled.div`
  text-align: center;
`;

const SCircleImage = styled.img`
  border-radius: 50%;
`;

const SName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #40514e;
`;

const UserIconWithName: React.FC<Props> = ({ image, userName, isAdmin }) => (
  <SContainer>
    <SCircleImage height={160} width={160} src={image} alt="プロフィール" />
    <SName>{userName}</SName>
    {isAdmin && <DefaultLink>編集</DefaultLink>}
  </SContainer>
);

export default UserIconWithName;
