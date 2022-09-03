import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import SecondaryButton from '../atoms/button/SecondaryButton';

const SContainer = styled.div`
  text-align: center;
`;

const SButtonWrapper = styled.div`
  margin-top: 10px;
`;

const TopPage: React.FC = () => {
  const history = useHistory();
  const onClickAdmin = () =>
    history.push({ pathname: '/users', state: { isAdmin: true } });
  const onClickGeneral = () =>
    history.push({ pathname: '/users', state: { isAdmin: false } });

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
