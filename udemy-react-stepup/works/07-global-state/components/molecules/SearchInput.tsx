import styled from 'styled-components';
import Input from '../atoms/input/Input';
import PrimaryButton from '../atoms/button/PrimaryButton';

const SContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SButtonWrapper = styled.div`
  padding-left: 8px;
`;

const SearchInput: React.FC = () => (
  <SContainer>
    <Input placeholder="検索条件を入力" />
    <SButtonWrapper>
      <PrimaryButton>検索</PrimaryButton>
    </SButtonWrapper>
  </SContainer>
);

export default SearchInput;
