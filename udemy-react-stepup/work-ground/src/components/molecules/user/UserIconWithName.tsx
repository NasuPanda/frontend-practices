import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import DefaultLink from '../../atoms/link/DefaultLink';
import userState from '../../../store/userState';
// import { useContext } from 'react';
// import { UserContext } from '../../../providers/UserProvider';

type Props = {
  image: string;
  userName: string;
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

const UserIconWithName: React.FC<Props> = ({ image, userName }) => {
  // const userInfo = useContext(UserContext)?.userInfo;
  const userInfo = useRecoilValue(userState);

  return (
    <SContainer>
      <SCircleImage height={160} width={160} src={image} alt="プロフィール" />
      <SName>{userName}</SName>
      {userInfo?.isAdmin && <DefaultLink>編集</DefaultLink>}
    </SContainer>
  );
};

export default UserIconWithName;
