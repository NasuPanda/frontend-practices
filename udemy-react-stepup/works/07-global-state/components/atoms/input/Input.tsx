import styled from 'styled-components';

const SInput = styled.input`
  padding: 8px 16px;
  border: solid #ddd 1px;
  border-radius: 100px;
  outline: none;
`;

const Input: React.VFC<{ placeholder: string }> = ({ placeholder = '' }) => (
  <SInput type="text" placeholder={placeholder} />
);

export default Input;
