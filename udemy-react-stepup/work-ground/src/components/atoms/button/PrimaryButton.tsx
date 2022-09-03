import styled from 'styled-components';
import BaseButton from './BaseButton';

const SButton = styled(BaseButton)`
  background-color: #40514e;
`;

// NOTE : props は外から受け取るべき
const PrimaryButton: React.FC = ({ children }) => (
  <SButton type="button">{children}</SButton>
);

export default PrimaryButton;
