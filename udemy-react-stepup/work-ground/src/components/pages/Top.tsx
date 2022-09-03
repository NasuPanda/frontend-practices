import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import SecondaryButton from '../atoms/button/SecondaryButton';
import userState from '../../store/userState';
// import { useContext } from 'react';
// import { UserContext } from '../../providers/UserProvider';

const SContainer = styled.div`
  text-align: center;
`;

const SButtonWrapper = styled.div`
  margin-top: 10px;
`;

const TopPage: React.FC = () => {
  const history = useHistory();
  // const setUserInfo = useContext(UserContext)?.setUserInfo;
  const setUserInfo = useSetRecoilState(userState);

  const onClickAdmin = () => {
    if (setUserInfo) {
      setUserInfo({ isAdmin: true });
    }
    history.push('/users');
  };
  const onClickGeneral = () => {
    if (setUserInfo) {
      setUserInfo({ isAdmin: false });
    }
    history.push('/users');
  };

  return (
    <SContainer>
      <h2>TOPページです</h2>
      <SButtonWrapper>
        <SecondaryButton onClick={onClickAdmin}>管理者ユーザ</SecondaryButton>
      </SButtonWrapper>
      <SButtonWrapper>
        <SecondaryButton onClick={onClickGeneral}>一般ユーザ</SecondaryButton>
      </SButtonWrapper>
    </SContainer>
  );
};

export default TopPage;
